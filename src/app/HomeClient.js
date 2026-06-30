"use client";

import './home.css';
import Link from 'next/link';
import { BsShieldCheck, BsGlobe, BsAward, BsClockHistory, BsCheckCircleFill, BsTree, BsDroplet, BsBoxSeam, BsInstagram, BsFacebook, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

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

  const heroSlides = [
    {
      id: 1,
      image: promoBannerUrl || 'https://www.pavithram.online/wp-content/uploads/2025/10/Edible-Oils.png',
      title: "Kerala’s Purest\nFor Your Kitchen",
      subtitle: "From a humble oil mill in 1950 to a global brand exported to 28+ countries. We deliver trusted quality, uncompromised purity, and the authentic taste of tradition.",
      buttonText: "Explore Products",
      buttonLink: "/products"
    },
    {
      id: 2,
      image: "https://www.pavithram.online/wp-content/uploads/2025/09/Chicken-Masala-160g.jpg",
      title: "Authentic Spices\n& Masalas",
      subtitle: "Experience the true taste of tradition with our handpicked spices and perfectly blended masalas.",
      buttonText: "Shop Spices",
      buttonLink: "/products"
    },
    {
      id: 3,
      image: "https://www.pavithram.online/wp-content/uploads/2025/10/Millets_.png",
      title: "Healthy Millets\n& Pulses",
      subtitle: "Nourish your family with our premium quality grains, sourced directly from trusted farmers.",
      buttonText: "Shop Millets",
      buttonLink: "/products"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  const categories = [
    { name: 'Edible Oils & Ghee', image: 'https://www.pavithram.online/wp-content/uploads/2025/10/Edible-Oils.png' },
    { name: 'Cochin Snacks', image: 'https://www.pavithram.online/wp-content/uploads/2025/10/Cochin-Snacks.png' },
    { name: 'Millets', image: 'https://www.pavithram.online/wp-content/uploads/2025/10/Millets_.png' },
    { name: 'Jams & Pickles', image: 'https://www.pavithram.online/wp-content/uploads/2025/10/Jams-Pickles_.png' },
    { name: 'Spices & Masalas', image: 'https://www.pavithram.online/wp-content/uploads/2025/09/Chicken-Masala-160g.jpg' },
    { name: 'Ready to Cook', image: 'https://www.pavithram.online/wp-content/uploads/2025/09/Biriyani-Masala-100g.jpg' }
  ];

  const products = [
    { name: 'Pure Sesame Oil', image: '/images/products/Pavithram%20Mockups/Oils/sesame%20oil_500ml-Photoroom.png', bg: 'linear-gradient(to bottom, #fdf6e3 50%, #f3c442 50%)' },
    { name: 'Biriyani Masala 100g', image: 'https://www.pavithram.online/wp-content/uploads/2025/09/Biriyani-Masala-100g.jpg', bg: 'linear-gradient(to bottom, #f3ebfa 50%, #9c63d6 50%)' },
    { name: 'Chicken Masala 160g', image: 'https://www.pavithram.online/wp-content/uploads/2025/09/Chicken-Masala-160g.jpg', bg: 'linear-gradient(to bottom, #fae6e6 50%, #e33b3b 50%)' },
    { name: 'Mutton Masala 160g', image: 'https://www.pavithram.online/wp-content/uploads/2025/09/Mutton-Masala-160g.jpg', bg: 'linear-gradient(to bottom, #f3ebfa 50%, #9c63d6 50%)' },
    { name: 'Pure Coconut Oil', image: 'https://www.pavithram.online/wp-content/uploads/2025/10/Edible-Oils.png', bg: 'linear-gradient(to bottom, #fffceb 50%, #ffda59 50%)' }
  ];

  const socialFeed = [
    'https://www.pavithram.online/wp-content/uploads/2025/10/Jams-Pickles_.png',
    'https://www.pavithram.online/wp-content/uploads/2025/09/Chicken-Masala-160g.jpg',
    'https://www.pavithram.online/wp-content/uploads/2025/10/Millets_.png',
    'https://www.pavithram.online/wp-content/uploads/2025/10/Cochin-Snacks.png'
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  return (
    <main className="home-page">
      
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
                <img src={heroSlides[currentSlide].image} alt="Hero Banner" />
                <div className="carousel-overlay"></div>
              </div>
              <div className="carousel-content">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="carousel-text"
                >
                  <h1 dangerouslySetInnerHTML={{ __html: heroSlides[currentSlide].title.replace('\n', '<br/>') }} />
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
      </section>

      {/* Trust Bar */}
      <motion.div 
        className="trust-bar"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div className="trust-item" variants={fadeInUp}>
          <BsClockHistory className="trust-icon" />
          <div className="trust-text">
            <h4>75+ Years Legacy</h4>
            <p>Trusted since 1950</p>
          </div>
        </motion.div>
        <motion.div className="trust-item" variants={fadeInUp}>
          <BsShieldCheck className="trust-icon" />
          <div className="trust-text">
            <h4>100% Pure & Natural</h4>
            <p>Farm to kitchen quality</p>
          </div>
        </motion.div>
        <motion.div className="trust-item" variants={fadeInUp}>
          <BsAward className="trust-icon" />
          <div className="trust-text">
            <h4>One Star Export House</h4>
            <p>DGFT Government Certified</p>
          </div>
        </motion.div>
        <motion.div className="trust-item" variants={fadeInUp}>
          <BsGlobe className="trust-icon" />
          <div className="trust-text">
            <h4>Global Reach</h4>
            <p>Exported to 28+ Countries</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Farm to Kitchen Process */}
      <section className="process-section">
        <motion.div 
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span>Our Process</span>
          <h2>Purity in Every Drop</h2>
        </motion.div>
        <motion.div 
          className="process-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div className="process-step" variants={fadeInUp}>
            <BsTree className="process-icon" />
            <h3>1. Sourced with Care</h3>
            <p>We handpick the finest sesame seeds and coconuts directly from trusted local farmers across India.</p>
          </motion.div>
          <motion.div className="process-step" variants={fadeInUp}>
            <BsDroplet className="process-icon" />
            <h3>2. Traditional Extraction</h3>
            <p>Our oils are extracted using traditional, temperature-controlled methods to retain maximum nutrients and aroma.</p>
          </motion.div>
          <motion.div className="process-step" variants={fadeInUp}>
            <BsBoxSeam className="process-icon" />
            <h3>3. Hygienic Packaging</h3>
            <p>Processed and bottled in our state-of-the-art, fully automatic facility ensuring zero human touch.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Global Reach Section */}
      <section className="global-reach-section">
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
                  <img src={`https://flagcdn.com/w40/${country.code}.png`} alt={`${country.name} flag`} className="country-flag" /> {country.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="categories-section">
        <motion.div 
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span>Shop by Category</span>
          <h2>Explore Our Range</h2>
        </motion.div>
        <motion.div 
          className="categories-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {categories.map((cat, i) => (
            <motion.div 
              className="cat-card" 
              key={i} 
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={cat.image} alt={cat.name} />
              <h3>{cat.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* Hero Product Spotlight */}
      <section className="spotlight-section">
        <div className="spotlight-split">
          <motion.div 
            className="spotlight-img"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img 
              src="/images/products/Pavithram%20Mockups/Oils/sesame%20oil_500ml-Photoroom.png" 
              alt="Pavithram Pure Sesame Oil" 
              initial={{ x: -150, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            />
          </motion.div>
          <motion.div 
            className="spotlight-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="section-heading" style={{ textAlign: 'left', marginBottom: '1rem' }} variants={fadeInUp}>
              <span>Signature Product</span>
            </motion.div>
            <motion.h2 variants={fadeInUp}>Pavithram Pure Sesame Oil</motion.h2>
            <motion.ul className="spotlight-list" variants={staggerContainer}>
              <motion.li variants={fadeInUp}><BsCheckCircleFill /> 100% Pure & Unadulterated</motion.li>
              <motion.li variants={fadeInUp}><BsCheckCircleFill /> Rich in natural antioxidants</motion.li>
              <motion.li variants={fadeInUp}><BsCheckCircleFill /> Perfect for cooking and Ayurveda</motion.li>
              <motion.li variants={fadeInUp}><BsCheckCircleFill /> Trusted by generations since 1950</motion.li>
            </motion.ul>
            <motion.div variants={fadeInUp}>
              <Link href="/products" className="hero-btn">Buy Now</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* Testimonials */}
      <section className="testimonials-section">
        <motion.div 
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span>Testimonials</span>
          <h2>What Our Consumers Say About Us</h2>
        </motion.div>
        <motion.div 
          className="testimonials-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {testimonials && testimonials.length > 0 ? (
            testimonials.map((test, i) => (
              <motion.div className="testimonial-card" key={i} variants={fadeInUp}>
                <p>"{test.content}"</p>
                <div className="testimonial-author-block">
                  {test.image && (
                    <img src={test.image} alt={test.name} className="testimonial-author-img" />
                  )}
                  <div className="author-info">
                    <strong>{test.name}</strong>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p>Loading testimonials...</p>
          )}
        </motion.div>
      </section>

      {/* Embedded Social Feed */}
      <section className="social-feed-section">
        <motion.div 
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span>Follow Us</span>
          <h2>Join Our Community <BsInstagram style={{ color: '#E1306C', marginLeft: '10px' }} /> <BsFacebook style={{ color: '#1877F2' }} /></h2>
          <p style={{ marginTop: '1rem', color: '#666' }}>Follow @pavithram_foods for the latest recipes, offers, and heritage stories.</p>
        </motion.div>
        <motion.div 
          className="social-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {socialFeed.map((img, i) => (
            <motion.a 
              href="https://www.instagram.com/pavithram_foods/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-card" 
              key={i} 
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
            >
              <img src={img} alt="Social Feed Post" />
              <div className="social-overlay">
                <BsInstagram className="overlay-icon" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* Heritage Teaser */}
      <section className="heritage-teaser">
        <motion.div 
          className="heritage-teaser-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp}>From a humble mill in Aluva to <span>millions of kitchens</span> worldwide.</motion.h2>
          <motion.p variants={fadeInUp}>Founded in the 1950s as Pazhangadi Oil Industries, the Pavithram Group of Companies has grown from a trusted edible oil manufacturer into a complete food brand loved in Kerala and abroad. We ensure purity, nutrition, and freshness in every product, continuing a legacy of health and tradition for over 75 years.</motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/heritage" className="hero-btn">Discover Our Story</Link>
          </motion.div>
        </motion.div>
        <motion.div 
          className="heritage-teaser-img"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img src="https://www.pavithram.online/wp-content/uploads/2025/09/about-img-1.png" alt="Pavithram Heritage" />
        </motion.div>
      </section>

    </main>
  );
}
