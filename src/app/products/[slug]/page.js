import { notFound } from 'next/navigation';
import { products as fallbackProducts } from '../../../data/productData';
import { fetchProductBySlug, fetchProducts } from '../../../services/wordpress';
import ProductClient from './ProductClient';

// Only pages listed by generateStaticParams are built; unknown slugs 404.
export const dynamicParams = false;

// Enumerate every product page at build time (required for `output: 'export'`).
// Pulls slugs from WordPress; falls back to the static product data if WP is
// unreachable during the build so the build never fails on a backend hiccup.
export async function generateStaticParams() {
  const wpProducts = await fetchProducts();
  const source = wpProducts && wpProducts.length > 0 ? wpProducts : fallbackProducts;

  const slugs = new Set(
    source.map((product) => product.slug).filter(Boolean)
  );
  // Always include the static fallback slugs too, so nothing 404s if WP is
  // missing a product the static data still covers.
  for (const product of fallbackProducts) {
    if (product.slug) slugs.add(product.slug);
  }

  return Array.from(slugs).map((slug) => ({ slug }));
}

// Generate Dynamic Meta Tags
export async function generateMetadata({ params }) {
  // Wait for the params promise
  const unwrappedParams = await params;
  const slug = unwrappedParams.slug;
  
  let product = await fetchProductBySlug(slug);
  if (!product) {
    product = fallbackProducts.find(p => p.slug === slug);
  }

  if (!product) {
    return {
      title: 'Product Not Found - Pavithram',
    };
  }

  return {
    title: `${product.name} | Pavithram Pure Food Products`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Pavithram`,
      description: product.description,
      images: [
        {
          url: product.images && product.images.length > 0 ? product.images[0] : '',
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const unwrappedParams = await params;
  const slug = unwrappedParams.slug;
  
  let product = await fetchProductBySlug(slug);
  if (!product) {
    product = fallbackProducts.find(p => p.slug === slug);
  }

  if (!product) {
    notFound();
  }

  // Normalize image field: WP returns `images` (array); some static fallback
  // rows only have a single `image` string. Handle both without crashing.
  const productImages = product.images || (product.image ? [product.image] : []);

  // Product Schema Markup for Rich Search Results
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": productImages,
    "description": product.description,
    "sku": (product.id ?? product.slug ?? '').toString(),
    "brand": {
      "@type": "Brand",
      "name": "Pavithram"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.pavithramfoods.com/products/${slug}`,
      "priceCurrency": "INR",
      "price": product.price ? product.price.replace(/[^0-9.]/g, '') : "0",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductClient params={params} />
    </>
  );
}
