import { notFound } from 'next/navigation';
import { products as fallbackProducts } from '../../../data/productData';
import { fetchProductBySlug } from '../../../services/wordpress';
import ProductClient from './ProductClient';

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

  // Product Schema Markup for Rich Search Results
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.description,
    "sku": product.id.toString(),
    "brand": {
      "@type": "Brand",
      "name": "Pavithram"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.pavithram.online/products/${slug}`,
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
