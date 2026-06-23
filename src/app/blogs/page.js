"use client";

import { useState } from 'react';
import Link from 'next/link';
import { blogPosts } from '../../data/blogData';
import './blogs.css';

export default function BlogsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Extract unique categories
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  // Filter posts
  const filteredPosts = activeFilter === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter);

  // Separate featured post (the first one)
  const featuredPost = blogPosts[0];
  
  // The rest of the posts for the grid (if 'All' is selected, skip the first to avoid duplication)
  const gridPosts = activeFilter === 'All' ? filteredPosts.slice(1) : filteredPosts;

  return (
    <main className="blogs-page">
      
      {/* Featured Hero Section */}
      {activeFilter === 'All' && (
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
