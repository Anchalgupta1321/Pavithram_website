"use client";

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BsCheckCircleFill, BsShieldCheck, BsPlus, BsDash } from 'react-icons/bs';
import { products } from '../../../data/productData';
import './product-detail.css';

export default function ProductClient({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [selectedPack, setSelectedPack] = useState('');

  useEffect(() => {
    const foundProduct = products.find(p => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.images[0]);
      if(foundProduct.packSizes && foundProduct.packSizes.length > 0) {
        setSelectedPack(foundProduct.packSizes[0]);
      }
    } else {
      notFound();
    }
  }, [slug]);

  if (!product) return <div className="loading-state">Loading...</div>;

  return (
    <main className="product-detail-page">
      {/* Breadcrumbs */}
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <Link href="/products">Products</Link>
        <span className="separator">/</span>
        <span className="current">{product.name}</span>
      </div>

      <div className="product-layout">
        {/* Left: Image Gallery */}
        <div className="product-gallery">
          <div className="main-image-container">
            <img src={mainImage} alt={product.name} className="main-image" />
          </div>
          <div className="thumbnail-list">
            {product.images.map((img, index) => (
              <div 
                key={index} 
                className={`thumbnail-btn ${mainImage === img ? 'active' : ''}`}
                onClick={() => setMainImage(img)}
              >
                <img src={img} alt={`${product.name} view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="product-info-sidebar">
          {product.badge && <span className="product-badge">{product.badge}</span>}
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-pricing">
            {product.isBulkOnly ? (
              <span className="bulk-price-label">Wholesale / Export Only</span>
            ) : (
              <span className="retail-price">{product.price}</span>
            )}
          </div>

          {/* Quick Value Props */}
          <ul className="quick-props">
            <li><BsShieldCheck className="prop-icon" /> Guaranteed Purity & Quality</li>
            <li><BsCheckCircleFill className="prop-icon" /> Sourced from Traditional Farms</li>
          </ul>

          {/* Pack Size Selector */}
          {product.packSizes && product.packSizes.length > 0 && (
            <div className="variant-selector">
              <label>Select Pack Size:</label>
              <div className="pack-options">
                {product.packSizes.map((size, idx) => (
                  <button 
                    key={idx}
                    className={`pack-btn ${selectedPack === size ? 'active' : ''}`}
                    onClick={() => setSelectedPack(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA Actions */}
          <div className="product-actions">
            {!product.isBulkOnly && (
              <div className="quantity-selector">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><BsDash /></button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => setQuantity(q => q + 1)}><BsPlus /></button>
              </div>
            )}
            
            {product.isBulkOnly ? (
              <Link href="/bulk-enquiry" className="btn-primary w-100 text-center">
                Request Bulk Quote
              </Link>
            ) : (
              <button className="btn-primary w-100">Add to Cart</button>
            )}
          </div>
          
          {!product.isBulkOnly && (
            <div className="bulk-link-wrapper">
              <p>Looking for larger quantities? <Link href="/bulk-enquiry">Request a wholesale quote</Link></p>
            </div>
          )}

          {/* Tabs for Details */}
          <div className="product-tabs">
            <div className="tab-headers">
              <button className={activeTab === 'description' ? 'active' : ''} onClick={() => setActiveTab('description')}>Description</button>
              <button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</button>
              <button className={activeTab === 'certifications' ? 'active' : ''} onClick={() => setActiveTab('certifications')}>Certifications</button>
            </div>
            <div className="tab-content">
              {activeTab === 'description' && <p>{product.description}</p>}
              {activeTab === 'ingredients' && <p>{product.ingredients}</p>}
              {activeTab === 'certifications' && (
                <ul className="cert-list">
                  {product.certifications.map((cert, i) => (
                    <li key={i}><BsCheckCircleFill className="text-gold" /> {cert}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
