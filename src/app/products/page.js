"use client";

import { useState } from 'react';
import Link from 'next/link';
import { categories, products } from '../../data/productData';
import './products.css';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <main className="products-page">
      
      {/* Header */}
      <section className="shop-header">
        <h1>Shop Our Products</h1>
        <p>Discover our range of 100% pure edible oils, traditional Kerala spices, authentic breakfast essentials, and crunchy snacks.</p>
      </section>

      {/* Main Layout */}
      <section className="shop-container">
        
        {/* Sticky Sidebar */}
        <aside className="shop-sidebar">
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
        </aside>

        {/* Product Grid */}
        <div className="shop-content">
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <Link href={`/products/${product.slug}`} className="product-card" key={product.id} style={{ textDecoration: 'none' }}>
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
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
              <h3>No products found in this category.</h3>
            </div>
          )}
        </div>

      </section>
    </main>
  );
}
