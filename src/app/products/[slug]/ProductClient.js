"use client";

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from "next/legacy/image";
import { BsPatchCheckFill, BsLeaf, BsCheck2Circle, BsAwardFill, BsPlus, BsDash } from 'react-icons/bs';
import { products } from '../../../data/productData';
import './product-detail.css';

export default function ProductClient({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [selectedPack, setSelectedPack] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const foundProduct = products.find(p => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.images[0]);
      if(foundProduct.packSizes && foundProduct.packSizes.length > 0) {
        setSelectedPack(foundProduct.packSizes[0]);
      }
      
      // Force scroll to top when product is loaded
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      notFound();
    }
  }, [slug]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsImageModalOpen(false);
    };
    if (isImageModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isImageModalOpen]);

  if (!product) return <div className="loading-state">Loading...</div>;

  return (
    <main className="product-detail-page" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="global-watermark wm-herbs" style={{ top: '10%', right: '-10%', transform: 'rotate(15deg)', backgroundPosition: 'top right' }}></div>
      <div className="global-watermark wm-coconut" style={{ bottom: '10%', left: '-10%', transform: 'rotate(-10deg)', backgroundPosition: 'bottom left' }}></div>
      
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
          <div className="main-image-container" onClick={() => setIsImageModalOpen(true)}>
            <Image src={mainImage} alt={product.name} className="main-image" width={600} height={600} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} priority />
          </div>
          <div className="thumbnail-list">
            {product.images.map((img, index) => (
              <div 
                key={index} 
                className={`thumbnail-btn ${mainImage === img ? 'active' : ''}`}
                onClick={() => setMainImage(img)}
              >
                <Image src={img} alt={`${product.name} view ${index + 1}`} width={100} height={100} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="product-info-sidebar">
          {product.badge && <span className="product-badge">{product.badge}</span>}
          <h1 className="product-title">{product.name}</h1>
          
          {product.isBulkOnly && (
            <div className="product-pricing">
              <span className="bulk-price-label">Wholesale / Export Only</span>
            </div>
          )}

          {/* Quick Value Props */}
          <ul className="quick-props">
            <li><BsPatchCheckFill className="prop-icon" /> Guaranteed Purity & Quality</li>
            <li><BsLeaf className="prop-icon" /> Sourced from Traditional Farms</li>
          </ul>

          {/* Pack Size Selector */}
          {product.packSizes && product.packSizes.length > 0 && (
            <div className="variant-selector">
              <label>Available Pack Size:</label>
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
            {product.isBulkOnly ? (
              <Link href="/bulk-enquiry" className="btn-primary w-100 text-center">
                Request Bulk Quote
              </Link>
            ) : (
              <div className="ecommerce-buttons" style={{ width: '100%' }}>
                {/* <a href={product.buyLink || "#"} target="_blank" rel="noopener noreferrer" className="btn-primary w-100 text-center" style={{ display: 'block' }}>
                  Buy NOW
                </a> */}
              </div>
            )}
          </div>
          
          {!product.isBulkOnly && (
            <div className="bulk-link-wrapper">
              <p>Looking for larger quantities? <Link href="/bulk-enquiry">Request a wholesale quote</Link></p>
            </div>
          )}

          {/* Vertical Details Sections */}
          <div className="product-details-vertical" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
            <div className="detail-section">
              <h3 style={{ borderBottom: '2px solid var(--color-primary-red)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--color-text-dark)' }}>Description</h3>
              <div className="product-description">
                <p>{product.description || 'Premium quality product from Pavithram.'}</p>
                <div className="additional-info" style={{ marginTop: '1.5rem' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {product.storage && <li><strong>Storage Instructions:</strong> {product.storage}</li>}
                    {product.fssai && <li><strong>FSSAI Number:</strong> {product.fssai}</li>}
                    {product.sku && <li><strong>SKU Code:</strong> {product.sku}</li>}
                  </ul>
                </div>
              </div>
            </div>

            {product.ingredients && (
              <div className="detail-section">
                <h3 style={{ borderBottom: '2px solid var(--color-primary-red)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--color-text-dark)' }}>Ingredients</h3>
                <p>{product.ingredients}</p>
              </div>
            )}

            {product.nutritionalInfo && (
              <div className="detail-section">
                <h3 style={{ borderBottom: '2px solid var(--color-primary-red)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--color-text-dark)' }}>Nutrition</h3>
                <p style={{ fontStyle: 'italic', color: '#555', marginBottom: '1rem', fontSize: '0.95rem' }}>
                  Approximate Nutritional Values (per {['Oils', 'Edible Oils', 'Beverages'].includes(product.category) ? '100 ml' : '100 g'}):
                </p>
                <div className="nutrition-table-container">
                  <table className="nutrition-table">
                    <tbody>
                      {product.nutritionalInfo.split(',').map((item, index) => {
                        const parts = item.split(':');
                        if (parts.length === 2) {
                          return (
                            <tr key={index}>
                              <td><strong>{parts[0].trim()}</strong></td>
                              <td>{parts[1].trim()}</td>
                            </tr>
                          );
                        }
                        return (
                          <tr key={index}>
                            <td colSpan="2">{item.trim()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {product.benefits && product.benefits.length > 0 && (
              <div className="detail-section">
                <h3 style={{ borderBottom: '2px solid var(--color-primary-red)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--color-text-dark)' }}>Benefits</h3>
                <ul className="cert-list">
                  {product.benefits.map((benefit, i) => (
                    <li key={i}><BsCheck2Circle className="text-gold" style={{ flexShrink: 0, fontSize: '1.2em' }} /> {benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="detail-section">
              <h3 style={{ borderBottom: '2px solid var(--color-primary-red)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--color-text-dark)' }}>Quality & Care</h3>
              <div>
                {product.shelfLife && <p><strong>Shelf Life:</strong> {product.shelfLife}</p>}
                <ul className="cert-list" style={{marginTop: '1rem'}}>
                  {product.certifications && product.certifications.map((cert, i) => (
                    <li key={i}><BsAwardFill className="text-gold" style={{ flexShrink: 0 }} /> {cert}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="image-modal-overlay" onClick={() => setIsImageModalOpen(false)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={() => setIsImageModalOpen(false)}>&times;</button>
            <Image src={mainImage} alt={product.name} width={800} height={800} style={{ width: '100%', height: 'auto', maxHeight: '90vh', objectFit: 'contain' }} />
          </div>
        </div>
      )}
    </main>
  );
}
