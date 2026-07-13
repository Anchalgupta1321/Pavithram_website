"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobeAsia, FaIndustry } from 'react-icons/fa';
import './products.css';

const getCategoryColor = (category) => {
  return '#FFF0CC'; // Uniform warm golden oil background for all products
};

// `products` is fetched from WordPress at build time in the server page and
// passed down as a prop. This component no longer fetches WordPress in the
// browser, so there is no hardcoded-then-swap flicker: the grid renders the
// live WordPress list straight from the static HTML.
function ProductsContent({ products }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category');
  const searchQueryParam = searchParams.get('search');

  const [activeCategory, setActiveCategory] = useState(categoryParam || "All");
  const [currentPage, setCurrentPage] = useState(1);

  const productsData = products;
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory("All");
    }
    setCurrentPage(1);

    // Robust scroll to top: scroll the header into view to guarantee visibility
    const header = document.getElementById('shop-header');
    if (header) {
      // Use a small timeout to let Next.js finish its DOM updates
      setTimeout(() => {
        header.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [categoryParam, searchQueryParam]);
  const ITEMS_PER_PAGE = 9;

  const filteredProducts = productsData.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = searchQueryParam
      ? product.name.toLowerCase().includes(searchQueryParam.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

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
    <main className="products-page" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="global-watermark wm-wheat" style={{ top: '5%', right: '-5%', transform: 'rotate(10deg)', backgroundPosition: 'top right' }}></div>
      <div className="global-watermark wm-snacks" style={{ top: '40%', left: '-10%', transform: 'rotate(-15deg)', backgroundPosition: 'center left' }}></div>
      <div className="global-watermark wm-coconut" style={{ bottom: '5%', right: '-5%', transform: 'rotate(5deg)', backgroundPosition: 'bottom right' }}></div>

      {/* Header */}
      <motion.section
        id="shop-header"
        className="shop-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Explore Our Products</h1>
        <p>Discover our range of 100% pure edible oils, traditional Kerala spices, authentic breakfast essentials, and crunchy snacks.</p>

        <motion.div
          className="global-product-info"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{
            scale: 1.03,
            boxShadow: '0 15px 35px rgba(218,37,29,0.2)',
            y: -5
          }}
          whileTap={{ scale: 0.98 }}
          style={{
            marginTop: '2rem',
            padding: '1.2rem 2.5rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
            border: '1px solid rgba(218,37,29,0.1)',
            borderRadius: '50px',
            display: 'inline-flex',
            gap: '3rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle background glow */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--color-primary-red), #ff7b00)', opacity: 0.8 }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(218,37,29,0.1)', color: 'var(--color-primary-red)'
            }}>
              <FaGlobeAsia size={18} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', margin: 0, fontWeight: 600 }}>Product Origin</p>
              <p style={{ fontSize: '1rem', color: '#333', margin: 0, fontWeight: 700 }}>India</p>
            </div>
          </div>

          <div style={{ width: '1px', background: '#e0e0e0', margin: '0.5rem 0' }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(218,37,29,0.1)', color: 'var(--color-primary-red)'
            }}>
              <FaIndustry size={18} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', margin: 0, fontWeight: 600 }}>Manufacturer</p>
              <p style={{ fontSize: '1rem', color: '#333', margin: 0, fontWeight: 700 }}>Pavithram Foods Pvt. Ltd.</p>
            </div>
          </div>
        </motion.div>
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
                    // Always navigate to clear the search query and update the URL properly
                    if (cat === "All") {
                      router.push('/products');
                    } else {
                      router.push(`/products?category=${encodeURIComponent(cat)}`);
                    }
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

                    <div className="product-img-wrapper" style={{ backgroundColor: getCategoryColor(product.category) }}>
                      <Image src={product.images ? product.images[0] : ''} alt={product.name} width={400} height={400} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                    </div>

                    <div className="product-details">
                      <span className="product-category">{product.category}</span>
                      <h4 className="product-name">{product.name}</h4>

                      <button className="add-to-cart-btn">View Details</button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {activeCategory === "Cochin Snacks" && (
            <motion.div
              style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '1rem', width: '100%' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <a
                href="https://www.cochinsnacks.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '1rem 2.5rem',
                  backgroundColor: 'var(--color-primary-red, #da251d)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  boxShadow: '0 5px 15px rgba(218,37,29,0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                Check More on Cochin Snacks
              </a>
            </motion.div>
          )}

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

export default function ProductsClient({ products }) {
  return (
    <Suspense fallback={<div style={{ padding: '10rem 5%', textAlign: 'center' }}>Loading products...</div>}>
      <ProductsContent products={products} />
    </Suspense>
  );
}
