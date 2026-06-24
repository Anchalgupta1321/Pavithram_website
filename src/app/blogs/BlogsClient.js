"use client";

import { useState } from 'react';
import Link from 'next/link';
import './blogs.css';

export default function BlogsClient({ posts }) {
  const [activeFilter, setActiveFilter] = useState('Blogs');
  
  if (!posts || posts.length === 0) {
    return (
      <main className="blogs-page">
        <section style={{ textAlign: 'center', padding: '10rem 2rem' }}>
          <h2>No blogs available at the moment.</h2>
        </section>
      </main>
    );
  }

  // Hardcode the categories as requested
  const categories = ['Blogs', 'Recipes'];

  // Filter posts
  const filteredPosts = activeFilter === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeFilter);

  // Separate featured post (the first one of the active category)
  const featuredPost = filteredPosts[0];
  
  // The rest of the posts for the grid
  const gridPosts = filteredPosts.slice(1);

  return (
    <main className="blogs-page">
      
      {/* Featured Hero Section */}
      {featuredPost && (
        <section className="blog-hero">
          <div className="blog-hero-container">
            <div className="hero-img-wrapper">
              <Link href={`/blogs/${featuredPost.slug}`}>
                <img src={featuredPost.image} alt={featuredPost.title} />
              </Link>
            </div>
            <div className="hero-content">
              <span className="badge">Featured</span>
              <h1><Link href={`/blogs/${featuredPost.slug}`}>{featuredPost.title}</Link></h1>
              <div className="hero-meta">
                <span>{featuredPost.date}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <p className="hero-excerpt">{featuredPost.excerpt}</p>
              <Link href={`/blogs/${featuredPost.slug}`} className="read-more-btn">Read Article</Link>
            </div>
          </div>
        </section>
      )}

      {/* Modern Filter Bar */}
      <section className="filter-bar">
        {categories.map((cat, index) => (
          <button 
            key={index} 
            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Blog Grid */}
      <section className="blog-grid-section">
        <div className="blog-grid">
          {gridPosts.map((post) => (
            <div className="blog-card" key={post.id}>
              <div className="card-img">
                <Link href={`/blogs/${post.slug}`}>
                  <img src={post.image} alt={post.title} />
                </Link>
              </div>
              <div className="card-content">
                <span className="card-badge">{post.category}</span>
                <h3><Link href={`/blogs/${post.slug}`}>{post.title}</Link></h3>
                <p className="card-excerpt">{post.excerpt}</p>
                <div className="card-meta">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
