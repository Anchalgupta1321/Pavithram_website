import { notFound } from 'next/navigation';
import { getAllProducts, getProductBySlug } from '../../../services/wordpress';
import ProductClient from './ProductClient';

export const runtime = 'edge';

// Only pages listed by generateStaticParams are built; unknown slugs 404.
export const dynamicParams = false;

// Enumerate every product page at build time (required for `output: 'export'`).
// Resolves from the same cached product list the pages use, so the slug set and
// the rendered data always agree (live WP when reachable, static fallback else).
export async function generateStaticParams() {
  const products = await getAllProducts();
  const slugs = new Set(products.map((product) => product.slug).filter(Boolean));
  return Array.from(slugs).map((slug) => ({ slug }));
}

// Generate Dynamic Meta Tags
export async function generateMetadata({ params }) {
  // Wait for the params promise
  const unwrappedParams = await params;
  const slug = unwrappedParams.slug;
  
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found - Pavithram',
    };
  }

  return {
    title: product.seo?.title || `${product.name} | Pavithram Pure Food Products`,
    description: product.seo?.description || product.description,
    openGraph: {
      title: product.seo?.og_title || `${product.name} | Pavithram`,
      description: product.seo?.og_description || product.description,
      url: product.seo?.og_url || `https://www.pavithramfoods.com/products/${slug}`,
      siteName: product.seo?.og_site_name || 'Pavithram Foods',
      images: [
        {
          url: product.images && product.images.length > 0 ? product.images[0] : '',
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: product.seo?.canonical || `https://www.pavithramfoods.com/products/${slug}`,
    }
  };
}

export default async function ProductDetailPage({ params }) {
  const unwrappedParams = await params;
  const slug = unwrappedParams.slug;
  
  const product = await getProductBySlug(slug);

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
      <ProductClient product={product} />
    </>
  );
}
