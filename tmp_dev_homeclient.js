"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BsArrowRight, BsPlayFill, BsAwardFill, BsShieldCheck, BsGlobe, BsCheckCircleFill, BsLeaf, BsChevronLeft, BsChevronRight, BsInstagram, BsFacebook, BsYoutube } from 'react-icons/bs';
import './home.css';

function AnimatedCounter({ from = 0, to, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const p = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        const easeOut = 1 - (1 - p) * (1 - p);
        setCount(Math.floor(easeOut * (to - from) + from));
        if (p < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HomeClient({ testimonials, galleryPreview = [], promoBannerUrl }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeEditorialTab, setActiveEditorialTab] = useState('Breakfast');

  const heroSlides = [
    {
      id: 1,
      image: promoBannerUrl || 'https://www.pavithram.online/wp-content/uploads/2025/10/Edible-Oils.png',
      title: "Kerala's Purest\nFor Your Kitchen",
      subtitle: "From a humble oil mill in 1950 to a global brand exported to 28+ countries. We deliver trusted quality, uncompromised purity, and the authentic taste of tradition.",
      buttonText: "Explore Products",
      buttonLink: "/products"
    },
    {
      id: 2,
      image: "https://www.pavithram.online/wp-content/uploads/2025/10/Millets_.png",
      title: "Healthy Millets\n& Pulses",
      subtitle: "Nourish your family with our premium quality grains, sourced directly from trusted farmers.",
      buttonText: "Shop Millets",
      buttonLink: "/products?category=Millets"
    }
  ];

  const countries = [
    { name: "UK", code: "gb" },
    { name: "Norway", code: "no" },
    { name: "Netherlands", code: "nl" },
    { name: "Bahrain", code: "bh" },
    { name: "Qatar", code: "qa" },
    { name: "UAE", code: "ae" },
    { name: "Sweden", code: "se" },
    { name: "Kuwait", code: "kw" },
    { name: "Australia", code: "au" },
    { name: "Oman", code: "om" },
    { name: "Saudi Arabia", code: "sa" },
    { name: "USA", code: "us" },
    { name: "Canada", code: "ca" },
    { name: "Malta", code: "mt" },
    { name: "New Zealand", code: "nz" }
  ];

  const socialFeed = [
    'https://www.youtube.com/embed/5aLh6yC72OQ?controls=0',
    'https://www.youtube.com/embed/tgbNymZ7vqY?controls=0',
    'https://www.youtube.com/embed/K1-O9_M-U9w?controls=0',
    'https://www.youtube.com/embed/7xG432iTjR0?controls=0'
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const bestSellers = [
    { name: 'Pure Sesame Oil', slug: 'pavithram-sesame-oil', image: '/images/products/Pavithram%20Mockups/Oils/sesame%20oil_500ml-Photoroom.png', category: 'Oils' },
    { name: 'Chicken Masala', slug: 'chicken-masala', image: 'https://www.pavithram.online/wp-content/uploads/2025/09/Chicken-Masala-160g.jpg', category: 'Spices' },
    { name: 'Broken Wheat', slug: 'broken-wheat', image: '/images/products/Pavithram%20Mockups/Breakfast%20Mockups/Broken%20Wheat%20Mockup.jpg', category: 'Breakfast' },
    { name: 'Kerala Mixture', slug: 'kerala-mixture', image: '/images/products/Pavithram%20Mockups/Snacks/Kerala%20Mixture%20Mockup.jpg', category: 'Snacks' },
    { name: 'Pure Coconut Oil', slug: 'pavithram-roasted-coconut-oil', image: '/images/products/Pavithram%20Mockups/Oils/coconut%20oil.jpg', category: 'Oils' },
    { name: 'Biriyani Masala', slug: 'biriyani-masala', image: 'https://www.pavithram.online/wp-content/uploads/2025/09/Biriyani-Masala-100g.jpg', category: 'Masalas' },
    { name: 'Chemba Puttupodi', slug: 'chemba-puttu-podi', image: '/images/products/Pavithram%20Mockups/Breakfast%20Mockups/Chemba%20Puttupodi%20Mockup.jpg', category: 'Breakfast' },
    { name: 'Banana Chilli Chips', slug: 'banana-chips', image: '/images/products/Pavithram%20Mockups/Snacks/Banana%20Lemon%20Chilli%20Chips%20Mockup.jpg', category: 'Snacks' }
  ];

  const editorialData = [
    {
      id: 'Breakfast',
      title: 'Morning Rituals',
      story: 'The perfect start to your morning. Soft appams, wholesome puttu, and the authentic taste of a traditional Kerala breakfast, ready in minutes.',
      image: '/images/hero_breakfast_appam.png',
      link: '/products?category=Breakfast',
      products: [
        { name: 'Palappam Podi', img: '/images/products/Pavithram%20Mockups/Breakfast%20Mockups/Palappam%20Mix%20Mockup.jpg' },
        { name: 'Chemba Puttu', img: '/images/products/Pavithram%20Mockups/Breakfast%20Mockups/Chemba%20Puttupodi%20Mockup.jpg' },
        { name: 'Broken Wheat', img: '/images/products/Pavithram%20Mockups/Breakfast%20Mockups/Broken%20Wheat%20Mockup.jpg' }
      ]
    },
    {
      id: 'Oils',
      title: 'Liquid Gold',
      story: 'Extracted using traditional methods to preserve every ounce of nutrition and aroma. Our pure oils are the heart of every great meal.',
      image: '/images/hero_kerala_kitchen_v2.png',
      link: '/products?category=Edible%20Oils',
      products: [
        { name: 'Roasted Coconut Oil', img: '/images/products/Pavithram%20Mockups/Oils/coconut%20oil.jpg' },
        { name: 'Pure Sesame Oil', img: '/images/products/Pavithram%20Mockups/Oils/sesame%20oil_500ml-Photoroom.png' },
        { name: 'Mustard Oil', img: '/images/products/Pavithram%20Mockups/Oils/coconut%20oil.jpg' }
      ]
    },
    {
      id: 'Spices',
      title: 'Aromatic Spices',
      story: 'Handpicked from the finest farms in Kerala, our spices bring warmth, depth, and vibrant color to your everyday cooking.',
      image: '/images/spices_bg.png',
      link: '/products?category=Spices',
      products: [
        { name: 'Chicken Masala', img: 'https://www.pavithram.online/wp-content/uploads/2025/09/Chicken-Masala-160g.jpg' },
        { name: 'Biriyani Masala', img: 'https://www.pavithram.online/wp-content/uploads/2025/09/Biriyani-Masala-100g.jpg' },
        { name: 'Sambar Powder', img: 'https://www.pavithram.online/wp-content/uploads/2025/09/Chicken-Masala-160g.jpg' }
      ]
    }
  ];

  const collections = [
    { title: 'Breakfast Essentials', image: '/images/products/Pavithram%20Mockups/Breakfast%20Mockups/Palappam%20Mix%20Mockup.jpg', link: '/products?category=Breakfast' },
    { title: 'Beverages', image: '/images/products/Pavithram%20Mockups/Tea%20Coffee%20Mockups/Tea%20Powder%20Mockup.jpg', link: '/products?category=Beverages' },
    { title: 'Condiments', image: '/images/products/Pavithram%20Mockups/Ginger%20Garlic%20Mockups/Ginger%20Garlic%20Paste%20Mockup.jpg', link: '/products?category=Condiments' },
    { title: 'Premium Pulses', image: '/images/products/Pavithram%20Mockups/Pulses%20Mockups/Black%20Channa%20Mockup.jpg', link: '/products?category=Pulses' },
    { title: 'Everyday Grocery', image: '/images/products/Pavithram%20Mockups/Ginger%20Garlic%20Mockups/Jaggery%20Ball.jpg', link: '/products?category=Grocery' }
  ];

  const mapPins = [
    { left: '20%', top: '35%', label: 'USA' },
    { left: '25%', top: '30%', label: 'Canada' },
    { left: '48%', top: '28%', label: 'UK' },
    { left: '65%', top: '45%', label: 'Dubai' },
    { left: '78%', top: '55%', label: 'Singapore' },
    { left: '85%', top: '75%', label: 'Australia' }
  ];

  return (
    <main className="premium-home">
      
      {/* Floating Interactive Background Elements */}
      <div className="floating-bg-elements">
        <div className="floating-element el-1"><BsLeaf /></div>
        <div className="floating-element el-2"><div className="blob"></div></div>
        <div className="floating-element el-3"><BsLeaf /></div>
        <div className="floating-element el-4"><div className="blob-alt"></div></div>
        <div className="floating-element el-5"><BsLeaf /></div>
      </div>

      {/* Hero Carousel Section */}
      <section className="hero-carousel-section">
        <div className="carousel-track">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              className="carousel-slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <div className="carousel-bg">
                <Image src={heroSlides[currentSlide].image} alt="Pavithram Carousel Background" fill style={{ objectFit: 'cover' }} priority={true} sizes="100vw" />
                <div className="carousel-overlay"></div>
              </div>
              <div className="carousel-content">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="carousel-text"
                >
                  <h1 style={{ color: 'var(--color-primary-red)' }} dangerouslySetInnerHTML={{ __html: heroSlides[currentSlide].title.replace('\n', '<br/>') }} />
                  <p>{heroSlides[currentSlide].subtitle}</p>
                  <Link href={heroSlides[currentSlide].buttonLink} className="hero-btn">
                    {heroSlides[currentSlide].buttonText}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button className="carousel-arrow left" onClick={prevSlide}>
          <BsChevronLeft />
        </button>
        <button className="carousel-arrow right" onClick={nextSlide}>
          <BsChevronRight />
        </button>

        {/* Navigation Dots */}
        <div className="carousel-dots">
          {heroSlides.map((_, index) => (
            <button 
              key={index} 
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        {/* Wavy Section Divider */}
        <div className="hero-wave-divider">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f9f9f9"></path>
          </svg>
        </div>
      </section>

      {/* 2. Promotional Banner */}
      <section className="promo-banner-stats">
        <div className="stats-container">
          <div className="stat-item interactive">
            <div className="stat-icon-wrapper"><BsAwardFill className="stat-icon" /></div>
            <h3>100+</h3>
            <p>Premium Products</p>
          </div>
          <div className="stat-item interactive">
            <div className="stat-icon-wrapper"><BsLeaf className="stat-icon" /></div>
            <h3>Made in</h3>
            <p>Kerala</p>
          </div>
          <div className="stat-item interactive">
            <div className="stat-icon-wrapper"><BsGlobe className="stat-icon" /></div>
            <h3>Exported to</h3>
            <p>28+ Countries</p>
          </div>
        </div>
      </section>

      {/* 3. Magazine-Style Categories */}
      <section className="magazine-categories">
        <motion.div 
          className="section-header center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="subtitle">Shop by Category</span>
          <h2>Explore Our Range</h2>
        </motion.div>
        
        <div className="editorial-category-layout">
          <div className="editorial-tabs">
            {editorialData.map(tab => (
              <button 
                key={tab.id}
                className={`editorial-tab-btn ${activeEditorialTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveEditorialTab(tab.id)}
              >
                {tab.id}
              </button>
            ))}
          </div>

          <div className="editorial-content-wrapper">
            <AnimatePresence mode="wait">
              {editorialData.filter(tab => tab.id === activeEditorialTab).map(tab => (
                <motion.div 
                  key={tab.id}
                  className="editorial-active-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                >
                  <div className="editorial-main-image-container">
                    <Image src={tab.image} alt={tab.title} layout="fill" objectFit="cover" className="editorial-main-image" />
                    <div className="editorial-image-overlay"></div>
                  </div>
                  
                  <div className="editorial-details">
                    <h3 className="editorial-title">{tab.title}</h3>
                    <p className="editorial-story">{tab.story}</p>
                    
                    <div className="editorial-mini-products">
                      {tab.products.map((prod, idx) => (
                        <div className="editorial-mini-card" key={idx}>
                          <div className="mini-card-img-wrapper">
                            <Image src={prod.img} alt={prod.name} layout="fill" objectFit="contain" />
                          </div>
                          <span className="mini-card-name">{prod.name}</span>
                        </div>
                      ))}
                    </div>

                    <Link href={tab.link} className="premium-btn" style={{ marginTop: '2rem' }}>
                      Explore {tab.id}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. Featured Collections */}
      <section className="featured-collections-fmcg">
        <motion.div 
          className="section-header center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="subtitle">Curated for you</span>
          <h2>Featured Collections</h2>
        </motion.div>
        
        <div className="fmcg-category-grid">
          {collections.map((category, idx) => (
            <motion.div 
              className="fmcg-category-card" 
              key={idx}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link href={category.link} className="category-link-wrapper">
                <div className="category-image-container">
                  <Image 
                    src={category.image} 
                    alt={category.title} 
                    layout="fill" 
                    objectFit="cover" 
                    className="category-image"
                  />
                  <div className="category-overlay"></div>
                </div>
                <div className="category-content">
                  <h3>{category.title}</h3>
                  <span className="explore-btn-slide">Explore <BsArrowRight /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Mid-Page Promotional Banner */}
      <section className="mid-promo-banner" style={{
        position: 'relative',
        backgroundImage: 'url("https://www.pavithram.online/wp-content/uploads/2025/10/Spices_.png")',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        padding: '6rem 5%',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4))',
          zIndex: 1
        }}></div>
        <motion.div 
          className="promo-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          style={{ color: '#fff', position: 'relative', zIndex: 2 }}
        >
          <motion.span variants={fadeInUp} style={{ color: 'var(--color-gold)', letterSpacing: '4px', textTransform: 'uppercase', display: 'block', marginBottom: '1rem', fontWeight: 600 }}>Since 1950</motion.span>
          <motion.h2 variants={fadeInUp} style={{ color: '#fff', fontSize: '3.5rem', marginBottom: '2.5rem', textShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>AUTHENTIC TASTE<br/>OF KERALA</motion.h2>
          <motion.div variants={fadeInUp}>
            <Link href="/products" className="premium-btn light" style={{ background: '#fff', color: 'var(--color-primary-red)', padding: '1rem 3rem', fontSize: '1.1rem' }}>Explore Collection</Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 6. Best Sellers */}
      <section className="best-sellers">
        <motion.div 
          className="section-header center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="subtitle">Customer Favorites</span>
          <h2>Best Sellers</h2>
        </motion.div>
        
        <motion.div 
          className="products-grid-premium"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {bestSellers.map((item, idx) => (
            <motion.div className="product-card-premium" key={idx} variants={fadeInUp}>
              <Link href={`/products/${item.slug}`} className="product-link-wrapper">
                <div className="product-img-wrapper">
                  <Image src={item.image} alt={item.name} layout="fill" objectFit="contain" className="product-image-zoom" />
                </div>
                <div className="product-info-premium">
                  <span className="product-cat">{item.category}</span>
                  <h4>{item.name}</h4>
                  <span className="view-details-link">View Details <BsArrowRight /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 7. Why Pavithram */}
      <section className="why-pavithram">
        <motion.div 
          className="why-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="why-item" variants={fadeInUp}>
            <BsLeaf className="why-icon" />
            <h3>Farm Fresh</h3>
          </motion.div>
          <motion.div className="why-item" variants={fadeInUp}>
            <BsAwardFill className="why-icon" />
            <h3>Authentic</h3>
          </motion.div>
          <motion.div className="why-item" variants={fadeInUp}>
            <BsShieldCheck className="why-icon" />
            <h3>Quality Tested</h3>
          </motion.div>
          <motion.div className="why-item" variants={fadeInUp}>
            <BsGlobe className="why-icon" />
            <h3>Export Quality</h3>
          </motion.div>
        </motion.div>
      </section>

      {/* Global Reach Section */}
      <section className="global-reach-section">
        <div className="reach-wave-divider-top">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
        </div>
        <div className="global-reach-content">
          <motion.div 
            className="section-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span>Our Global Footprint</span>
            <h2>Exported to <span className="highlight-count"><AnimatedCounter to={28} suffix="+" /></span> Countries</h2>
          </motion.div>
          <div className="marquee-container">
            <div className="marquee">
              {countries.concat(countries).map((country, idx) => (
                <div className="country-tag" key={idx}>
                  <Image src={`https://flagcdn.com/w40/${country.code}.png`} alt={`${country.name} flag`} width={40} height={30} className="country-flag" /> {country.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Summary Section */}
      <section className="heritage-summary-section">
        <div className="heritage-summary-content">
          <motion.h1 
            style={{ color: 'var(--color-primary-red)', fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            From a humble mill in Aluva to millions of kitchens worldwide.
          </motion.h1>
          <motion.p
            style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Founded in the 1950s as Pazhangadi Oil Industries, the Pavithram Group of Companies has grown from a trusted edible oil manufacturer into a complete food brand loved in Kerala and abroad. We ensure purity, nutrition, and freshness in every product, continuing a legacy of health and tradition for over 75 years.
          </motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Link href="/heritage" className="premium-btn">Discover Our Story</Link>
          </motion.div>
        </div>
        <motion.div 
          className="heritage-summary-image"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Image src="https://www.pavithram.online/wp-content/uploads/2025/10/Edible-Oils.png" alt="Pavithram Edible Oils" width={600} height={600} style={{ objectFit: 'contain', width: '100%', height: 'auto' }} />
        </motion.div>
      </section>

      {/* 9. Join Community */}
      <section className="community-section">
        <motion.div 
          className="section-header center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="subtitle">Join Our Community</span>
          <h2>Stories from the Kitchen</h2>
          <div className="social-icons-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '1rem auto 0 auto', gap: '20px' }}>
            <a href="#" className="header-social-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#E1306C', fontSize: '2rem', transition: 'transform 0.3s', margin: 0, padding: 0 }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}><BsInstagram /></a>
            <a href="#" className="header-social-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#1877F2', fontSize: '2rem', transition: 'transform 0.3s', margin: 0, padding: 0 }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}><BsFacebook /></a>
            <a href="#" className="header-social-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#FF0000', fontSize: '2rem', transition: 'transform 0.3s', margin: 0, padding: 0 }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}><BsYoutube /></a>
          </div>
        </motion.div>

        <div className="reels-container">
          {socialFeed.map((videoUrl, idx) => (
            <motion.div 
              className="reel-card" 
              key={idx} 
              variants={fadeInUp}
              onMouseEnter={(e) => {
                const iframe = e.currentTarget.querySelector('iframe');
                if (iframe && !iframe.src.includes('autoplay=1')) {
                  iframe.src += (iframe.src.includes('?') ? '&' : '?') + 'autoplay=1&mute=1';
                }
              }}
              onMouseLeave={(e) => {
                const iframe = e.currentTarget.querySelector('iframe');
                if (iframe) {
                  iframe.src = iframe.src.replace('&autoplay=1&mute=1', '').replace('?autoplay=1&mute=1', '');
                }
              }}
            >
              <iframe 
                src={videoUrl}
                className="reel-video"
                style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', border: 'none' }}
                allow="autoplay; encrypted-media"
                title="Social Media Reel"
              />
              <div className="reel-overlay">
                <BsPlayFill className="play-icon" />
                <div className="reel-stats">
                  <span><BsInstagram /></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>



    </main>
  );
}
