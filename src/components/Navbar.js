"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";
import { useRouter, useSearchParams } from 'next/navigation';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { products } from '../data/productData';

const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

export function NavbarContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentSearch = searchParams.get('search');
    if (currentSearch !== null) {
      setSearchQuery(currentSearch);
    } else {
      setSearchQuery('');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchParams]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (name, e) => {
    if (window.innerWidth <= 992) {
      if (openDropdown === name) {
        setOpenDropdown(null);
      } else {
        setOpenDropdown(name);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/products');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', position: 'relative' }}>
        
        {/* Logo */}
        <div className="navbar-logo">
          <Link href="/">
            <Image src="/logo_cropped.png" alt="Pavithram Logo" width={140} height={45} priority />
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="mobile-menu-icon" onClick={toggleMenu} style={{ position: 'absolute', right: '0' }}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Search + Nav Links */}
        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          
          <form className="navbar-search" onSubmit={handleSearch}>
            <FaSearch className="search-icon" onClick={handleSearch} style={{ cursor: 'pointer' }} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search-input"
            />
          </form>
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
            <span className="nav-link">Products ▾</span>
            <div className="dropdown-menu">
              <Link href="/products" className="dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>All Products</Link>
              {categories.map(cat => (
                <Link key={cat} href={`/products?category=${encodeURIComponent(cat)}`} className="dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>{cat}</Link>
              ))}
            </div>
          </div>

          <div className="nav-item">
            <Link href="/blogs" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Blogs</Link>
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

export default function Navbar() {
  return (
    <Suspense fallback={<nav className="navbar"><div className="navbar-container"></div></nav>}>
      <NavbarContent />
    </Suspense>
  );
}
