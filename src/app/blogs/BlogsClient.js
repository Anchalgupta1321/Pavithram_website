"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from "next/legacy/image";
import './blogs.css';

export default function BlogsClient({ posts }) {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

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
        <motion.section 
          className="blog-hero"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="blog-hero-container">
            <div className="hero-img-wrapper">
              <Link href={`/blogs/${featuredPost.slug}`}>
                <Image src={featuredPost.image} alt={featuredPost.title} width={800} height={500} style={{ width: '100%', height: '100%', objectFit: 'cover' }} priority />
              </Link>
            </div>
            <div className="blog-hero-content">
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
        </motion.section>
      )}

      {/* Modern Filter Bar Removed */}

      {/* Blog Grid */}
      <section className="blog-grid-section">
        <motion.div 
          className="blog-grid"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={activeFilter}
        >
          {gridPosts.map((post) => (
            <motion.div 
              className="blog-card" 
              key={post.id}
              variants={fadeInUp}
              whileHover={{ y: -8, boxShadow: "0 15px 35px rgba(0,0,0,0.08)" }}
            >
              <div className="card-img">
                <Link href={`/blogs/${post.slug}`}>
                  <Image src={post.image} alt={post.title} width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
            </motion.div>
          ))}
        </motion.div>
      </section>

    </main>
  );
}
