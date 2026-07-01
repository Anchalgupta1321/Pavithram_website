import Link from 'next/link';
import Image from 'next/image';
import { getWordPressPosts } from '../../../utils/wp';
import './blog-details.css';

// Revalidate this page every 60 seconds
export const revalidate = 60;

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;

  // Fetch all posts to find the current one and related ones
  const allPosts = await getWordPressPosts();
  
  const post = allPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem 2rem' }}>
        <h1>Article Not Found</h1>
        <p>Sorry, the article you are looking for does not exist.</p>
        <Link href="/blogs" style={{ color: 'var(--color-primary-red)', marginTop: '2rem', display: 'inline-block' }}>← Back to Blogs</Link>
      </div>
    );
  }

  // Get 3 related posts (excluding the current one)
  const relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <main className="blog-details-page">
      
      {/* Hero Banner */}
      <section className="blog-details-hero">
        <Image src={post.image} alt={post.title} width={1200} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover' }} priority />
        <div className="hero-overlay-content">
          <span className="badge">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="details-meta">
            <span>{post.date}</span> &nbsp;&nbsp;•&nbsp;&nbsp; <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="article-container">
        <Link href="/blogs" className="back-btn">
          ← Back to all articles
        </Link>
        <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

      {/* Related Posts */}
      <section className="related-posts-section">
        <h2>You Might Also Like</h2>
        <div className="blog-grid">
          {relatedPosts.map((relatedPost) => (
            <div className="blog-card" key={relatedPost.id}>
              <div className="card-img">
                <Link href={`/blogs/${relatedPost.slug}`}>
                  <Image src={relatedPost.image} alt={relatedPost.title} width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Link>
              </div>
              <div className="card-content">
                <span className="card-badge">{relatedPost.category}</span>
                <h3><Link href={`/blogs/${relatedPost.slug}`}>{relatedPost.title}</Link></h3>
                <p className="card-excerpt">{relatedPost.excerpt}</p>
                <div className="card-meta">
                  <span>{relatedPost.date}</span>
                  <span>{relatedPost.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
