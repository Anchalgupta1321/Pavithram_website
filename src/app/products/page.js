"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, products } from '../../data/productData';
import './products.css';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <main className="products-page">
      
      {/* Header */}
      <motion.section 
        className="shop-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Shop Our Products</h1>
        <p>Discover our range of 100% pure edible oils, traditional Kerala spices, authentic breakfast essentials, and crunchy snacks.</p>
      </motion.section>

      {/* Main Layout */}
      <section className="shop-container">
        
        {/* Sticky Sidebar */}
        <motion.aside 
          className="shop-sidebar"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3>Categories</h3>
          <ul className="category-list">
            {categories.map((cat, index) => (
              <li key={index}>
                <button 
                  className={activeCategory === cat ? 'active' : ''}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </motion.aside>

        {/* Product Grid */}
        <div className="shop-content">
          <motion.div 
            className="products-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            key={activeCategory} // forces re-animation on category change
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/products/${product.slug}`} className="product-card" style={{ textDecoration: 'none', height: '100%', display: 'block' }}>
                    {product.badge && <span className="product-badge">{product.badge}</span>}
                    
                    <div className="product-img-wrapper">
                      <img src={product.image} alt={product.name} />
                    </div>
                    
                    <div className="product-details">
                      <span className="product-category">{product.category}</span>
                      <h4 className="product-name">{product.name}</h4>
                      <div className="product-price">
                        {product.isBulkOnly ? <span style={{fontSize: '0.9rem', color: '#666'}}>Wholesale / Export Only</span> : product.price}
                      </div>
                      <button className="add-to-cart-btn">View Details</button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredProducts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              style={{ textAlign: 'center', padding: '4rem', color: '#666' }}
            >
              <h3>No products found in this category.</h3>
            </motion.div>
          )}
        </div>

      </section>
    </main>
  );
}
