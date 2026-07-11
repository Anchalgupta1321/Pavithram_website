import { products } from '../data/productData';

// Render the sitemap statically at build time (required for `output: 'export'`).
export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://www.pavithramfoods.com'; // Canonical frontend domain

  // Core pages
  const coreRoutes = [
    '',
    '/heritage',
    '/products',
    '/certifications',
    '/bulk-enquiry',
    '/blogs',
    '/contact',
    '/faq',
    '/privacy',
    '/terms'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic product pages
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...coreRoutes, ...productRoutes];
}
