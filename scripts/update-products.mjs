import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WP_API_BASE = 'https://www.pavithram.online/wp-json/wp/v2';

async function fetchProducts() {
  try {
    const perPage = 100;
    let page = 1;
    let posts = [];
    while (true) {
      console.log(`Fetching page ${page}...`);
      const res = await fetch(`${WP_API_BASE}/product?_embed=1&per_page=${perPage}&page=${page}`);
      
      if (!res.ok) {
        console.log(`Stopped fetching at page ${page}: HTTP ${res.status}`);
        break;
      }
      
      const batch = await res.json();
      if (!Array.isArray(batch) || batch.length === 0) break;
      posts = posts.concat(batch);
      if (batch.length < perPage) break;
      page += 1;
    }

    if (posts.length === 0) {
      console.error('Failed to fetch any products.');
      return null;
    }

    const mapWpProduct = async (post) => {
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
            const mediaData = await mediaRes.json();
            return mediaData.source_url;
          } catch(e) { return null; }
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
        category: decodeHtml(categoryName) || acf.category || "Products",
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

    console.log(`Processing ${posts.length} products...`);
    const resolvedProducts = await Promise.all(posts.map(mapWpProduct));

    const finalProducts = [];
    const productGroups = {};

    for (const p of resolvedProducts) {
      const name = p.name;
      const sizeMatch = name.match(/[\-\s]*(\d+\s*(?:ml|ltr|l|kg|g))/i);
      let size = '';
      let baseName = name;

      if (sizeMatch) {
        size = sizeMatch[1].trim();
        baseName = name.replace(sizeMatch[0], '').trim();
      } else {
        size = (p.packSizes && p.packSizes.length > 0) ? p.packSizes[0] : 'Standard';
      }

      if (baseName.toLowerCase() === 'pavithram sesame oil') {
        baseName = 'Sesame Oil';
      }

      const groupKey = p.category + '::' + baseName.trim().toLowerCase();

      if (!productGroups[groupKey]) {
        const displayName = baseName.toLowerCase() === 'sesame oil' ? 'Pavithram Sesame Oil' : baseName;
        const master = {
          ...p,
          name: displayName, 
          packSizes: [size],
          images: p.images.length > 0 ? [p.images[0]] : [],
          allSlugs: [p.slug]
        };
        productGroups[groupKey] = master;
        finalProducts.push(master);
      } else {
        const master = productGroups[groupKey];
        if (!master.packSizes.includes(size)) {
          master.packSizes.push(size);
          if (p.images.length > 0) {
            master.images.push(p.images[0]);
          }
          master.allSlugs.push(p.slug);
        }
      }
    }

    console.log(`Grouped into ${finalProducts.length} final products.`);
    return finalProducts;
  } catch (error) {
    console.error('Error fetching WP products:', error);
    return null;
  }
}

async function main() {
  const products = await fetchProducts();
  if (products) {
    const dataFile = path.join(__dirname, '../src/data/productData.js');
    const content = `// AUTO-GENERATED snapshot of live WordPress products
// Generated manually to bypass WAF blocks on Cloudflare

export const products = ${JSON.stringify(products, null, 2)};
`;
    fs.writeFileSync(dataFile, content, 'utf8');
    console.log("Successfully updated " + dataFile);
  }
}

main();
