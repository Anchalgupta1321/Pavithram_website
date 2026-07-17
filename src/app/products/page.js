import { getAllProducts } from '../../services/wordpress';
import ProductsClient from './ProductsClient';

export const dynamic = 'force-static';

// Fetch the full product list once at build time (live WordPress when reachable,
// static fallback otherwise) and hand it to the client grid as a prop. This
// bakes the real product list into the static HTML, so the page no longer shows
// the hardcoded list first and swaps it out — and no WordPress fetch happens in
// the visitor's browser.
export default async function ProductsPage() {
  const products = await getAllProducts();
  return <ProductsClient products={products} />;
}
