const WP_API_BASE = 'https://www.pavithram.online/wp-json/wp/v2';

/**
 * Fetches gallery items from WordPress.
 * Extracts the featured image URL from the embedded data.
 */
export async function fetchGalleryImages() {
  try {
    // 1. Fetch all Gallery "Albums"
    const res = await fetch(`${WP_API_BASE}/gallery?_embed=1&per_page=100`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds (Incremental Static Regeneration)
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch galleries: ${res.status}`);
    }

    const galleries = await res.json();
    let allImages = [];

    // 2. For each Gallery album, fetch all the photos uploaded inside it
    for (const gallery of galleries) {
      const mediaRes = await fetch(`${WP_API_BASE}/media?parent=${gallery.id}&per_page=100`, {
        next: { revalidate: 60 }
      });
      
      if (mediaRes.ok) {
        const mediaItems = await mediaRes.json();
        
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
    const res = await fetch(`${WP_API_BASE}/testimonial?_embed=1&per_page=10`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch testimonials: ${res.status}`);
    }

    const data = await res.json();
    
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
 * @param {string|number} formId - The ID of the Contact Form 7 form.
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
    const res = await fetch(`${WP_API_BASE}/pages?slug=promo-banner&_embed=1`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      return null;
    }

    const pages = await res.json();
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
    const res = await fetch(`${WP_API_BASE}/product?_embed=1&per_page=100`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      console.warn(`Failed to fetch WP products: ${res.status}`);
      return null;
    }

    const posts = await res.json();
    
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
            const mediaRes = await fetch(`${WP_API_BASE}/media/${img}`);
            if (mediaRes.ok) {
              const mediaData = await mediaRes.json();
              return mediaData.source_url;
            }
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
        category: acf.category || "Products", // Use ACF category
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
    
    console.log("FETCHED WP PRODUCTS:", JSON.stringify(resolvedProducts, null, 2));
    return resolvedProducts;
  } catch (error) {
    console.error('Error fetching WP products:', error);
    return null; // Return null so we can fallback to static productData.js if WP fails
  }
}

/**
 * Fetches a single product by slug
 */
export async function fetchProductBySlug(slug) {
  try {
    const res = await fetch(`${WP_API_BASE}/product?slug=${slug}&_embed=1`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      return null;
    }

    const posts = await res.json();
    if (posts.length > 0) {
      // Create a temporary inline map function for the single product to avoid duplicate code
      // We can use the same logic here.
      const post = posts[0];
      const rawContent = post.content?.rendered || '';
      
      let imageUrl = null;
      if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
        imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
      }
      
      if (!imageUrl && rawContent.includes('<img')) {
        const match = rawContent.match(/src="([^"]+)"/);
        if (match) {
          imageUrl = match[1];
        }
      }

      const cleanContent = rawContent.replace(/<[^>]+>/g, '').trim();
      const acf = post.acf || {};
      
      const packSizesRaw = acf.pack_sizes || '';
      const packSizes = packSizesRaw.split(',').map(s => s.trim()).filter(Boolean);
      
      const benefitsRaw = acf.benefits || '';
      const benefits = benefitsRaw.split('\n').map(s => s.trim()).filter(Boolean);
      
      const certsRaw = acf.certifications || '';
      const certifications = certsRaw.split('\n').map(s => s.trim()).filter(Boolean);
      
      const resolveImage = async (img) => {
        if (!img) return null;
        if (typeof img === 'string') return img;
        if (typeof img === 'number') {
          try {
            const mediaRes = await fetch(`${WP_API_BASE}/media/${img}`);
            if (mediaRes.ok) {
              const mediaData = await mediaRes.json();
              return mediaData.source_url;
            }
          } catch(e) { console.error('Failed to resolve image ID:', img); }
        }
        return null;
      };

      const img2 = await resolveImage(acf.image_2);
      const img3 = await resolveImage(acf.image_3);

      const images = [];
      if (imageUrl && typeof imageUrl === 'string') images.push(imageUrl);
      if (img2) images.push(img2);
      if (img3) images.push(img3);
      
      if (images.length === 0) {
        images.push('/images/products/placeholder.png');
      }

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
        category: acf.category || "Products",
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
    }
    return null;
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    return null;
  }
}
