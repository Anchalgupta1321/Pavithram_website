import BlogsClient from './BlogsClient';
import { getWordPressPosts } from '../../utils/wp';

export const runtime = 'edge';

export default async function BlogsPage() {
  const posts = await getWordPressPosts();

  return <BlogsClient posts={posts} />;
}
