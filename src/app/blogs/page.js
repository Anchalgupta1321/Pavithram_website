import BlogsClient from './BlogsClient';
import { getWordPressPosts } from '../../utils/wp';

// Revalidate this page every 60 seconds
export const revalidate = 60;

export default async function BlogsPage() {
  const posts = await getWordPressPosts();

  return <BlogsClient posts={posts} />;
}
