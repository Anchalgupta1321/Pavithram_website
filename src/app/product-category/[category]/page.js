import { redirect } from 'next/navigation';

export const runtime = 'edge';

export default async function ProductCategoryRedirect({ params }) {
  const resolvedParams = await params;
  const category = resolvedParams.category || '';
  redirect(`/products?category=${category}`);
}
