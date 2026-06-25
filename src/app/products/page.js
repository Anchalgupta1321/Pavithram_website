"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../../data/productData';
import './products.css';

const categories = ["All", ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(categoryParam || "All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
      setCurrentPage(1);
    }
  }, [categoryParam]);
  const ITEMS_PER_PAGE = 9;

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                  }}
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
            <AnimatePresence mode="popLayout">
              {paginatedProducts.map((product) => (
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
                      <img src={product.images ? product.images[0] : ''} alt={product.name} />
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
          
          {totalPages > 1 && (
            <motion.div 
              className="pagination"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button 
                className="page-btn"
                disabled={currentPage === 1} 
                onClick={() => {
                  setCurrentPage(prev => Math.max(prev - 1, 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Prev
              </button>
              
              <div className="page-numbers">
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i} 
                    className={`page-num ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentPage(i + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              
              <button 
                className="page-btn"
                disabled={currentPage === totalPages} 
                onClick={() => {
                  setCurrentPage(prev => Math.min(prev + 1, totalPages));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Next
              </button>
            </motion.div>
          )}

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

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ padding: '10rem 5%', textAlign: 'center' }}>Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
