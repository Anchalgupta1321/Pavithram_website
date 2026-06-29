"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import { products } from '../data/productData';

const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (name, e) => {
    // Only toggle on mobile; desktop relies on hover. 
    if (window.innerWidth <= 992) {
      if (openDropdown === name) {
        setOpenDropdown(null);
      } else {
        setOpenDropdown(name);
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link href="/">
            <img src="/logo_cropped.png" alt="Pavithram Logo" />
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="mobile-menu-icon" onClick={toggleMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Nav Links */}
        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="nav-item">
            <Link href="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          </div>
          
          <div className={`nav-item has-dropdown ${openDropdown === 'story' ? 'open' : ''}`} onClick={(e) => toggleDropdown('story', e)}>
            <span className="nav-link">Our Story ▾</span>
            <div className="dropdown-menu">
              <Link href="/heritage" className="dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Heritage</Link>
              <Link href="/certifications" className="dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Certifications</Link>
            </div>
          </div>

          <div className={`nav-item has-dropdown ${openDropdown === 'shop' ? 'open' : ''}`} onClick={(e) => toggleDropdown('shop', e)}>
            <span className="nav-link">Shop ▾</span>
            <div className="dropdown-menu">
              <Link href="/products" className="dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>All Products</Link>
              {categories.map(cat => (
                <Link key={cat} href={`/products?category=${encodeURIComponent(cat)}`} className="dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>{cat}</Link>
              ))}
            </div>
          </div>

          <div className="nav-item">
            <Link href="/blogs" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Recipes & Blogs</Link>
          </div>

          <div className="nav-item">
            <Link href="/gallery" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
          </div>

          <div className={`nav-item has-dropdown ${openDropdown === 'contact' ? 'open' : ''}`} onClick={(e) => toggleDropdown('contact', e)}>
            <span className="nav-link">Contact Us ▾</span>
            <div className="dropdown-menu">
              <Link href="/contact" className="dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              <Link href="/faq" className="dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
            </div>
          </div>
          <Link href="/bulk-enquiry" className="btn-secondary nav-action-btn" onClick={() => setIsMobileMenuOpen(false)}>Export Enquiry</Link>
        </div>
      </div>
    </nav>
  );
}
