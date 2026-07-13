import { wpFetchJson } from '@/utils/wpFetch';
import { products as fallbackProducts } from '@/data/productData';

const WP_API_BASE = 'https://www.pavithram.online/wp-json/wp/v2';

// Module-level cache for the full product list. The product response is ~2.4MB,
// which is over Next.js's 2MB data-cache limit, so Next re-fetches it on every
// call — during a static export that means ~150 identical requests, which trips
// the WordPress WAF rate-limiter and starts timing out. Memoizing the promise
// here collapses that to one request per build worker.
let _allProductsPromise = null;

/**
 * Returns the full product list, fetched once per process. Uses live WordPress
 * data when reachable, otherwise the committed static fallback so the build
 * never fails on a backend hiccup. Both generateStaticParams and the product
 * pages resolve from this same list, keeping slugs and rendering consistent.
 */
export async function getAllProducts() {
  if (!_allProductsPromise) {
    _allProductsPromise = (async () => {
      const wp = await fetchProducts();
      return wp && wp.length > 0 ? wp : fallbackProducts;
    })();
  }
  return _allProductsPromise;
}

/**
 * Resolves a single product by slug from the cached list, falling back to the
 * static data if the live list is missing it.
 */
export async function getProductBySlug(slug) {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug) || fallbackProducts.find((p) => p.slug === slug) || null;
}

/**
 * Fetches gallery items from WordPress.
 * Extracts the featured image URL from the embedded data.
 */
export async function fetchGalleryImages() {
  try {
    // 1. Fetch all Gallery "Albums"
    const galleries = await wpFetchJson(`${WP_API_BASE}/gallery?_embed=1&per_page=100`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds (Incremental Static Regeneration)
    });

    let allImages = [];

    // 2. For each Gallery album, fetch all the photos uploaded inside it
    for (const gallery of galleries) {
      try {
        const mediaItems = await wpFetchJson(`${WP_API_BASE}/media?parent=${gallery.id}&per_page=100`, {
          next: { revalidate: 60 }
        });

        // Extract the clean image URLs from the media attachments
        const photos = mediaItems.map(media => {
          return {
            id: media.id,
            title: media.title?.rendered || gallery.title.rendered,
            url: media.source_url,
            album: gallery.title.rendered // Keep track of which album it belongs to
          };
        }).filter(img => img.url); // Remove any broken items
        
        allImages = [...allImages, ...photos];
      } catch (mediaError) {
        // Skip this album if its media fetch fails; keep the rest.
        console.error(`Error fetching media for gallery ${gallery.id}:`, mediaError);
      }
    }

    return allImages;
  } catch (error) {
    console.error('Error fetching WordPress gallery:', error);
    return [];
  }
}

/**
 * Fetches testimonials from WordPress.
 */
export async function fetchTestimonials() {
  try {
    const data = await wpFetchJson(`${WP_API_BASE}/testimonial?_embed=1&per_page=10`, {
      next: { revalidate: 60 }
    });

    return data.map(post => {
      let imageUrl = null;
      if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
        imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
      }

      // Strip HTML tags from content since WP returns <p> tags
      const rawContent = post.content.rendered;
      const cleanContent = rawContent.replace(/<[^>]+>/g, '').trim();

      return {
        id: post.id,
        name: post.title.rendered,
        content: cleanContent,
        image: imageUrl
      };
    });
  } catch (error) {
    console.error('Error fetching WordPress testimonials:', error);
    return [];
  }
}

/**
 * Submits form data to WordPress Contact Form 7 REST API.
 *
 * IMPORTANT: The CF7 REST feedback route is `/contact-forms/(\d+)/feedback` — it
 * only matches the form's *numeric post ID*, NOT the shortcode hash (e.g. the
 * `d652723` in `[contact-form-7 id="d652723" ...]` returns a 404 `rest_no_route`).
 * CF7 also rejects the request with `wpcf7_unit_tag_not_found` unless the special
 * `_wpcf7*` control fields are present, so we append them here for every caller.
 *
 * @param {string|number} formId - The NUMERIC post ID of the Contact Form 7 form.
 * @param {FormData} formData - The FormData object containing the form fields.
 */
export async function submitForm(formId, formData) {
  // Mock success if no form ID is provided yet (graceful fallback)
  if (!formId || String(formId).startsWith('MOCK')) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ status: 'mail_sent', message: 'Thank you for your message. It has been sent.' }), 1500);
    });
  }

  try {
    // CF7 control fields required by the REST feedback endpoint.
    formData.append('_wpcf7', String(formId));
    formData.append('_wpcf7_version', '5.9');
    formData.append('_wpcf7_locale', 'en_US');
    formData.append('_wpcf7_unit_tag', `wpcf7-f${formId}-o1`);
    formData.append('_wpcf7_container_post', '0');

    const res = await fetch(`https://www.pavithram.online/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, {
      method: 'POST',
      body: formData,
    });

    return await res.json();
  } catch (error) {
    console.error('Error submitting form to CF7:', error);
    return { status: 'mail_failed', message: 'There was an error trying to send your message. Please try again later.' };
  }
}

/**
 * Fetches the latest promotional banner from a specific WordPress category "Homepage Banner" (or fallback).
 */
export async function fetchPromoBanner() {
  try {
    // We fetch a specific Page to avoid affecting the live website's blog feed
    const pages = await wpFetchJson(`${WP_API_BASE}/pages?slug=promo-banner&_embed=1`, {
      next: { revalidate: 60 }
    });

    if (pages.length > 0) {
      const page = pages[0];
      if (page._embedded && page._embedded['wp:featuredmedia'] && page._embedded['wp:featuredmedia'][0]) {
        return page._embedded['wp:featuredmedia'][0].source_url;
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching promo banner:', error);
    return null;
  }
}

/**
 * Fetches products from WordPress Custom Post Type (product) and ACF.
 */
export async function fetchProducts() {
  try {
    // WordPress caps `per_page` at 100, so page through the `product` CPT until
    // every item is collected (the store has 200+ products). Requesting a page
    // past the last one returns HTTP 400, which wpFetchJson throws on — so we
    // stop the loop on any page error and keep whatever was gathered. A failure
    // on page 1 leaves `posts` empty and we return null → static fallback.
    const perPage = 100;
    let page = 1;
    let posts = [];
    while (true) {
      let batch;
      try {
        // The product response is ~2.4MB (over Next's 2MB fetch-cache limit), so
        // it is NOT cached and every build worker re-fetches it independently.
        // A single WAF 503 on any worker would otherwise drop that whole page to
        // the static fallback and mix stale categories into the output — so we
        // retry hard here to make each worker reliably land the live WP data.
        batch = await wpFetchJson(`${WP_API_BASE}/product?_embed=1&per_page=${perPage}&page=${page}`, {
          next: { revalidate: 60 },
          retries: 6,
          timeoutMs: 30000
        });
      } catch (pageError) {
        console.error(`Stopped product pagination at page ${page}:`, pageError?.message || pageError);
        break;
      }
      if (!Array.isArray(batch) || batch.length === 0) break;
      posts = posts.concat(batch);
      if (batch.length < perPage) break; // reached the last page
      page += 1;
    }

    if (posts.length === 0) {
      return null; // Nothing fetched — let getAllProducts fall back to static data.
    }

    // Extract mapping logic to a standalone function so it can be reused
    const mapWpProduct = async (post) => {
      const rawContent = post.content?.rendered || '';
      
      // Extract main image
      let imageUrl = null;
      if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
        imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
      }
      
      // Fallback: Check if they inserted an image into the main content editor
      if (!imageUrl && rawContent.includes('<img')) {
        const match = rawContent.match(/src="([^"]+)"/);
        if (match) {
          imageUrl = match[1];
        }
      }

      // Strip HTML tags from content for description
      const cleanContent = rawContent.replace(/<[^>]+>/g, '').trim();
      
      const acf = post.acf || {};

      // Category comes from the product's `product-cat` taxonomy (the "Categories"
      // column in WP admin), embedded via `_embed`. There is no ACF category field,
      // so we read the first embedded term and decode its name below.
      let categoryName = '';
      const termGroups = post._embedded?.['wp:term'];
      if (Array.isArray(termGroups)) {
        for (const group of termGroups) {
          if (Array.isArray(group) && group[0]?.name) {
            categoryName = group[0].name;
            break;
          }
        }
      }

      // Parse pack sizes
      const packSizesRaw = acf.pack_sizes || '';
      const packSizes = packSizesRaw.split(',').map(s => s.trim()).filter(Boolean);
      
      // Parse benefits & certs (newline separated)
      const benefitsRaw = acf.benefits || '';
      const benefits = benefitsRaw.split('\n').map(s => s.trim()).filter(Boolean);
      
      const certsRaw = acf.certifications || '';
      const certifications = certsRaw.split('\n').map(s => s.trim()).filter(Boolean);
      
      // Helper to resolve ACF Image IDs to actual URLs if needed
      const resolveImage = async (img) => {
        if (!img) return null;
        if (typeof img === 'string') return img;
        if (typeof img === 'number') {
          try {
            const mediaData = await wpFetchJson(`${WP_API_BASE}/media/${img}`);
            return mediaData.source_url;
          } catch(e) { console.error('Failed to resolve image ID:', img); }
        }
        return null;
      };

      // Resolve secondary images
      const img2 = await resolveImage(acf.image_2);
      const img3 = await resolveImage(acf.image_3);

      // Images array
      const images = [];
      if (imageUrl && typeof imageUrl === 'string') images.push(imageUrl);
      if (img2) images.push(img2);
      if (img3) images.push(img3);
      
      // We will fallback to a placeholder if absolutely no valid string image is found.
      if (images.length === 0) {
        images.push('/images/products/placeholder.png'); // Fallback to prevent crash
      }

      // Decode HTML entities in title
      const decodeHtml = (html) => {
        return (html || '')
          .replace(/&#8211;/g, '-')
          .replace(/&amp;/g, '&')
          .replace(/&#038;/g, '&')
          .replace(/&#8217;/g, "'")
          .replace(/&#8220;/g, '"')
          .replace(/&#8221;/g, '"');
      };

      return {
        id: post.id,
        name: decodeHtml(post.title.rendered),
        slug: post.slug,
        category: decodeHtml(categoryName) || acf.category || "Products", // Taxonomy term, then ACF, then default
        price: acf.price || '₹0.00',
        isBulkOnly: !!acf.is_bulk_only,
        images: images,
        packSizes: packSizes,
        description: cleanContent || acf.description,
        ingredients: acf.ingredients || '',
        nutritionalInfo: acf.nutritional_info || '',
        benefits: benefits,
        storage: acf.storage || '',
        manufacturer: acf.manufacturer || 'Pavithram Foods Pvt. Ltd., Kerala, India',
        certifications: certifications,
        fssai: '',
        sku: ''
      };
    };

    // We use Promise.all because we might need to fetch media URLs if ACF returns IDs
    const resolvedProducts = await Promise.all(posts.map(mapWpProduct));

    console.log(`Fetched ${resolvedProducts.length} products from WordPress across ${page} page(s).`);
    return resolvedProducts;
  } catch (error) {
    console.error('Error fetching WP products:', error);
    return null; // Return null so we can fallback to static productData.js if WP fails
  }
}

// Single-product resolution now goes through getProductBySlug() → getAllProducts(),
// which shares one cached, paginated fetch and the mapWpProduct mapping (including
// the taxonomy-based category). The old standalone fetchProductBySlug() has been
// removed to avoid a second, divergent copy of that mapping.
