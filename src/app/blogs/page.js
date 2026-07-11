import BlogsClient from './BlogsClient';
import { getWordPressPosts } from '../../utils/wp';

export default async function BlogsPage() {
  const posts = await getWordPressPosts();

  return <BlogsClient posts={posts} />;
}
