"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BsArrowRight, BsPlayFill, BsAwardFill, BsAward, BsShieldCheck, BsGlobe, BsCheckCircleFill, BsLeaf, BsChevronLeft, BsChevronRight, BsInstagram, BsFacebook, BsYoutube, BsClockHistory } from 'react-icons/bs';
import { GiChiliPepper, GiWheat, GiCoconuts, GiGarlic, GiSaltShaker, GiBowlOfRice, GiCookingPot, GiTeapot } from 'react-icons/gi';
import './home.css';

const getCategoryColor = (category) => {
  return '#FFF0CC'; // Uniform warm golden oil background for all products
};


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

export default function HomeClient({ testimonials, galleryPreview = [], promoBannerUrl = null }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeEditorialTab, setActiveEditorialTab] = useState('Oils');

  const editorialData = [
    {
      id: 'Oils',
      title: 'Liquid Gold',
      story: 'Extracted using traditional methods to preserve every ounce of nutrition and aroma. Our pure oils are the heart of every great meal.',
      image: '/images/oils_home_page.jpg',
      link: '/products?category=Edible Oils',
      products: [
        { name: 'Pure Sesame Oil', img: '/images/Sesame_oil.jpg' },
        { name: 'Coconut Oil', img: '/images/products/Pavithram%20Mockups/Oils/coconut%20oil.jpg' },
        { name: 'Mustard Oil', img: '/images/products/Pavithram%20Mockups/Oils/mustard%20400ml%20side%201.jpg' }
      ]
    },
    {
      id: 'Breakfast',
      title: 'Traditional Breakfast',
      story: 'Start your day right with our authentic Kerala breakfast mixes. Quick to prepare and packed with traditional nutrition for the whole family.',
      image: '/images/brkfst1.jpg',
      link: '/products?category=Breakfast',
      products: [
        { name: 'Palappam Mix', img: '/images/products/Pavithram%20Mockups/Breakfast%20Mockups/Palappam%20Mix%20Mockup.jpg' },
        { name: 'Chemba Puttupodi', img: '/images/products/Pavithram%20Mockups/Breakfast%20Mockups/Chemba%20Puttupodi%20Mockup.jpg' },
        { name: 'Wheat Puttupodi', img: '/images/products/Pavithram%20Mockups/Breakfast%20Mockups/Wheat%20Puttupodi%20Mockup.jpg' }
      ]
    },
    {
      id: 'Snacks',
      title: 'Authentic Kerala Snacks',
      story: 'Enjoy the crispy, savory, and authentic taste of Kerala with our traditional snacks. Perfect for your tea time cravings.',
      image: '/images/snack_home.jpg',
      link: 'https://cochinsnacks.com/',
      products: [
        { name: 'Kerala Mixture', img: '/images/products/Pavithram%20Mockups/Snacks/Kerala%20Mixture%20Mockup.jpg' },
        { name: 'Butter Murukku', img: '/images/products/Pavithram%20Mockups/Snacks/Butter%20Murukku%20Mockup.jpg' },
        { name: 'Tapioca Chilli Garlic', img: '/images/products/Pavithram%20Mockups/Snacks/Tapioca%20Chilli%20Garlic%20%20Mockup.jpg' }
      ]
    }
  ];

  const heroSlides = [
    {
      id: 1,
      image: '/images/Hero_banner1.jpg',
      title: "Kerala’s Purest\nFor Your Kitchen",
      subtitle: "From a humble oil mill in 1950 to a global brand exported to 28+ countries. We deliver trusted quality, uncompromised purity, and the authentic taste of tradition.",
      buttonText: "Explore Products",
      buttonLink: "/products"
    },
    {
      id: 2,
      image: '/images/Banner2.png',
      title: "The Goodness of\nPure Sesame Oil",
      subtitle: "Crafted to preserve the natural aroma and nutritional value of premium sesame seeds.",
      buttonText: "Shop All Products",
      buttonLink: "/products"
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
    '/videos/VID-20260706-WA0014.mp4',
    '/videos/Video2.mp4',
    '/videos/Video1.mp4',
    '/videos/VID-20260706-WA0014.mp4'
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const bestSellers = [
    { name: 'Pure Sesame Oil', slug: 'pavithram-sesame-oil', image: '/images/Sesame_oil.jpg', category: 'Oils' },
    { name: 'Kerala Mixture', slug: 'kerala-mixture', image: '/images/products/Pavithram%20Mockups/Snacks/Kerala%20Mixture%20Mockup.jpg', category: 'Snacks' },
    { name: 'Rice Bran Oil', slug: 'rice-bran-oil', image: '/images/products/Pavithram%20Mockups/Oils/rice%20bran%20oil.jpg', category: 'Oils' },
    { name: 'Ginger Garlic Paste', slug: 'ginger-garlic-paste', image: '/images/products/Pavithram%20Mockups/Ginger%20Garlic%20Mockups/Ginger%20Garlic%20Paste%20Mockup.jpg', category: 'Condiments' },
    { name: 'Kerala Murukku', slug: 'kerala-murukku', image: '/images/products/Pavithram%20Mockups/Snacks/Star%20Murukku%20Mockup.jpg', category: 'Snacks' },
    { name: 'Pure Coconut Oil', slug: 'pavithram-roasted-coconut-oil', image: '/images/products/Pavithram%20Mockups/Oils/coconut%20oil.jpg', category: 'Oils' },
    { name: 'Chemba Puttupodi', slug: 'chemba-puttu-podi', image: '/images/products/Pavithram%20Mockups/Breakfast%20Mockups/Chemba%20Puttupodi%20Mockup.jpg', category: 'Breakfast' },
    { name: 'Banana Chilli Chips', slug: 'banana-chips', image: '/images/products/Pavithram%20Mockups/Snacks/Banana%20Lemon%20Chilli%20Chips%20Mockup.jpg', category: 'Snacks' }
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
      
      {/* Scrollable Page Watermarks */}
      <div className="page-watermarks">
        <div className="watermark-img wm-1"></div>
        <div className="watermark-img wm-4"></div>
        <div className="watermark-img wm-5"></div>
      </div>
      
      {/* Floating Interactive Background Elements */}
      <div className="floating-bg-elements">
        <div className="floating-element el-1"><GiChiliPepper /></div>
        <div className="floating-element el-2"><GiWheat /></div>
        <div className="floating-element el-3"><GiCoconuts /></div>
        <div className="floating-element el-4"><GiGarlic /></div>
        <div className="floating-element el-5"><GiBowlOfRice /></div>
        <div className="floating-element el-6"><GiSaltShaker /></div>
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
                <Image src={heroSlides[currentSlide].image} alt="Pavithram Carousel Background" layout="fill" objectFit="cover" priority={true} sizes="100vw" />
                <div className="carousel-overlay"></div>
              </div>
              <div className="carousel-content">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="carousel-text"
                >
                  {heroSlides[currentSlide].title && (
                    <h1 style={{ color: '#ffffff' }} dangerouslySetInnerHTML={{ __html: heroSlides[currentSlide].title.replace('\n', '<br/>') }} />
                  )}
                  {heroSlides[currentSlide].subtitle && (
                    <p>{heroSlides[currentSlide].subtitle}</p>
                  )}
                  {heroSlides[currentSlide].buttonText && (
                    <Link href={heroSlides[currentSlide].buttonLink} className="hero-btn">
                      {heroSlides[currentSlide].buttonText}
                    </Link>
                  )}
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

      {/* 2. Trust Banner */}
      <section className="trust-banner-section" style={{ background: '#FFFDF8' }}>
        <div className="trust-banner-container">
          <div className="trust-item">
            <BsClockHistory className="trust-icon" />
            <div className="trust-text">
              <h4><span style={{ fontSize: '1.3em' }}>75</span>+ Years Legacy</h4>
              <p>Trusted since 1950</p>
            </div>
          </div>
          <div className="trust-item">
            <BsShieldCheck className="trust-icon" />
            <div className="trust-text">
              <h4><span style={{ fontSize: '1.3em' }}>100</span>% Pure &amp; Natural</h4>
              <p>Farm to kitchen quality</p>
            </div>
          </div>
          <div className="trust-item">
            <BsAward className="trust-icon" />
            <div className="trust-text">
              <h4>One Star Export House</h4>
              <p>DGFT Government Certified</p>
            </div>
          </div>
          <div className="trust-item">
            <BsGlobe className="trust-icon" />
            <div className="trust-text">
              <h4>Global Reach</h4>
              <p>Exported to 28+ Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 Explore Every Meal */}
      <section className="explore-every-meal" style={{ position: 'relative', overflow: 'hidden', padding: '6rem 5%', background: '#F9F5EB' }}>
        {/* Photographic Watermarks */}
        <div className="watermark-img wm-2"></div>
        <div className="watermark-img wm-3"></div>
        <div className="watermark-img wm-6"></div>

        {/* Animated Floating Food Icons */}
        <div className="floating-element el-7" style={{ zIndex: 1 }}><GiCookingPot /></div>
        <div className="floating-element el-8" style={{ zIndex: 1 }}><GiTeapot /></div>

        {/* Background Decorative Icons */}
        <div style={{ position: 'absolute', top: '10%', left: '2%', opacity: 0.01, transform: 'rotate(-25deg)', pointerEvents: 'none', color: '#000', zIndex: 0 }}>
          <BsLeaf size={280} />
        </div>
        <div style={{ position: 'absolute', top: '35%', right: '-2%', opacity: 0.01, transform: 'rotate(15deg)', pointerEvents: 'none', color: '#000', zIndex: 0 }}>
          <GiChiliPepper size={300} />
        </div>
        <div style={{ position: 'absolute', bottom: '15%', left: '-5%', opacity: 0.01, transform: 'rotate(10deg)', pointerEvents: 'none', color: '#000', zIndex: 0 }}>
          <GiWheat size={350} />
        </div>
        <div style={{ position: 'absolute', bottom: '5%', right: '15%', opacity: 0.01, transform: 'rotate(-15deg)', pointerEvents: 'none', color: '#000', zIndex: 0 }}>
          <BsLeaf size={200} />
        </div>
        <div style={{ position: 'absolute', top: '55%', left: '15%', opacity: 0.008, transform: 'rotate(45deg)', pointerEvents: 'none', color: '#000', zIndex: 0 }}>
          <GiWheat size={250} />
        </div>
        <div style={{ position: 'absolute', top: '80%', right: '2%', opacity: 0.008, transform: 'rotate(-35deg)', pointerEvents: 'none', color: '#000', zIndex: 0 }}>
          <GiChiliPepper size={220} />
        </div>
        <motion.div 
          className="section-header center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          style={{ position: 'relative', zIndex: 10 }}
        >
          <span className="subtitle">Authentic Kerala flavours for every moment</span>
          <h2>Inspired by Every Meal</h2>
        </motion.div>

        <div className="editorial-category-layout" style={{ position: 'relative', zIndex: 10 }}>
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
                    <Image src={tab.image} alt={tab.title} layout="fill" objectFit="cover" sizes="(max-width: 768px) 100vw, 50vw" className="editorial-main-image" unoptimized={true} />
                    <div className="editorial-image-overlay"></div>
                  </div>
                  
                  <div className="editorial-details">
                    <h3 className="editorial-title">{tab.title}</h3>
                    <p className="editorial-story">{tab.story}</p>
                    
                    <div className="editorial-mini-products">
                      {tab.products.map((prod, idx) => (
                        <div className="editorial-mini-card" key={idx}>
                          <div className="mini-card-img-wrapper">
                            <Image src={prod.img} alt={prod.name} layout="fill" objectFit="contain" sizes="130px" unoptimized={true} />
                          </div>
                          <span className="mini-card-name">{prod.name}</span>
                        </div>
                      ))}
                    </div>

                    <Link 
                      href={tab.link} 
                      className="premium-btn" 
                      style={{ marginTop: '2rem' }}
                      {...(tab.link.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      EXPLORE {tab.id.toUpperCase()}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. Explore Our Range (Category Grid) */}
      <section className="magazine-categories" style={{ position: 'relative', overflow: 'hidden', background: '#FCF8EE' }}>
        <div className="watermark-img wm-explore-range"></div>
        <div className="watermark-img wm-explore-range-top"></div>
        
        {/* Decorative Icons */}
        <div style={{ position: 'absolute', top: '8%', right: '5%', opacity: 0.015, transform: 'rotate(25deg)', pointerEvents: 'none', color: '#000', zIndex: 0 }}>
          <BsLeaf size={250} />
        </div>
        <div style={{ position: 'absolute', top: '40%', left: '-2%', opacity: 0.01, transform: 'rotate(-15deg)', pointerEvents: 'none', color: '#000', zIndex: 0 }}>
          <GiWheat size={300} />
        </div>

        <div className="container">
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
          
          <div className="bento-grid">
            {/* Large Item (Rice/Breakfast) */}
            <motion.div className="bento-item tall" whileHover="hover" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Link href="/products?category=Rice">
                <div className="bento-img">
                  <Image src="/images/products/Pavithram%20Mockups/Rice%20Mockups/Rice/Sona%20Masoori%20Rice%20Mockup.jpg" alt="Premium Rice" layout="fill" objectFit="cover" />
                  <div className="bento-overlay"></div>
                </div>
                <div className="bento-content">
                  <h3>Rice</h3>
                  <span className="bento-link">Discover <BsArrowRight /></span>
                </div>
              </Link>
            </motion.div>

            {/* Tall Item (Spices) */}
            <motion.div className="bento-item tall" whileHover="hover" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Link href="/products?category=Spices">
                <div className="bento-img">
                  <Image src="https://www.pavithram.online/wp-content/uploads/2025/09/Chicken-Masala-160g.jpg" alt="Spices" layout="fill" objectFit="cover" />
                  <div className="bento-overlay"></div>
                </div>
                <div className="bento-content">
                  <h3>Authentic Spices</h3>
                  <span className="bento-link">Discover <BsArrowRight /></span>
                </div>
              </Link>
            </motion.div>

            {/* Large Item (Millets) */}
            <motion.div className="bento-item large-alt" whileHover="hover" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Link href="/products?category=Millets">
                <div className="bento-img">
                  <Image src="https://www.pavithram.online/wp-content/uploads/2025/10/Millets_.png" alt="Millets" layout="fill" objectFit="cover" />
                  <div className="bento-overlay"></div>
                </div>
                <div className="bento-content">
                  <h3>Millets & Pulses</h3>
                  <span className="bento-link">Discover <BsArrowRight /></span>
                </div>
              </Link>
            </motion.div>

            {/* Small Item (Pickles) - Fills the blank space! */}
            <motion.div className="bento-item wide" whileHover="hover" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Link href="/products?category=Pickles">
                <div className="bento-img">
                  <Image src="https://www.pavithram.online/wp-content/uploads/2025/10/Jams-Pickles_.png" alt="Jams and Pickles" layout="fill" objectFit="cover" />
                  <div className="bento-overlay"></div>
                </div>
                <div className="bento-content">
                  <h3>Jams & Pickles</h3>
                  <span className="bento-link">Discover <BsArrowRight /></span>
                </div>
              </Link>
            </motion.div>

            {/* Wide Item (Snacks) */}
            <motion.div className="bento-item wide" whileHover="hover" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Link href="/products?category=Cochin%20Snacks">
                <div className="bento-img">
                  <Image src="https://www.pavithram.online/wp-content/uploads/2025/10/Cochin-Snacks.png" alt="Snacks" layout="fill" objectFit="cover" />
                  <div className="bento-overlay"></div>
                </div>
                <div className="bento-content">
                  <h3>Cochin Snacks</h3>
                  <span className="bento-link">Discover <BsArrowRight /></span>
                </div>
              </Link>
            </motion.div>

            {/* Small Item (Oils) */}
            <motion.div className="bento-item wide" whileHover="hover" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Link href="/products?category=Edible%20Oils">
                <div className="bento-img">
                  <Image src="/images/Pure_oil.jpg" alt="Oils" layout="fill" objectFit="cover" unoptimized={true} priority />
                  <div className="bento-overlay"></div>
                </div>
                <div className="bento-content">
                  <h3>Pure Oils</h3>
                  <span className="bento-link">Discover <BsArrowRight /></span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Mid-Page Promotional Banner */}
      <section className="mid-promo-banner" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <a href="/products" style={{ display: 'block', width: '100%' }}>
          <img 
            src={promoBannerUrl || 'https://www.pavithram.online/wp-content/uploads/2025/10/Spices_.png'} 
            alt="Promotional Banner" 
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
          />
        </a>
      </section>

      {/* 6. Best Sellers */}
      <section className="best-sellers" style={{ position: 'relative', overflow: 'hidden', background: '#FFFDF8' }}>
        {/* Photographic Watermark */}
        <div className="watermark-img wm-best-seller"></div>

        {/* Background Decorative Icons */}
        <div style={{ position: 'absolute', top: '5%', left: '-2%', opacity: 0.01, transform: 'rotate(20deg)', pointerEvents: 'none', color: '#000', zIndex: 0 }}>
          <BsLeaf size={300} />
        </div>
        <div style={{ position: 'absolute', top: '25%', right: '-5%', opacity: 0.008, transform: 'rotate(-15deg)', pointerEvents: 'none', color: '#000', zIndex: 0 }}>
          <GiWheat size={400} />
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '-4%', opacity: 0.01, transform: 'rotate(45deg)', pointerEvents: 'none', color: '#000', zIndex: 0 }}>
          <GiChiliPepper size={350} />
        </div>
        <div style={{ position: 'absolute', top: '50%', right: '2%', opacity: 0.008, transform: 'rotate(-25deg)', pointerEvents: 'none', color: '#000', zIndex: 0 }}>
          <BsLeaf size={280} />
        </div>
        <div style={{ position: 'absolute', bottom: '10%', left: '10%', opacity: 0.008, transform: 'rotate(30deg)', pointerEvents: 'none', color: '#000', zIndex: 0 }}>
          <GiWheat size={300} />
        </div>
        <div style={{ position: 'absolute', bottom: '2%', right: '5%', opacity: 0.01, transform: 'rotate(-40deg)', pointerEvents: 'none', color: '#000', zIndex: 0 }}>
          <GiChiliPepper size={220} />
        </div>
        
        <motion.div 
          className="section-header center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          style={{ position: 'relative', zIndex: 10 }}
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
          style={{ position: 'relative', zIndex: 10 }}
        >
          {bestSellers.map((item, idx) => (
            <motion.div className="product-card-premium" key={idx} variants={fadeInUp} style={{ backgroundColor: getCategoryColor(item.category) }}>
              <div className="product-img-wrapper">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  layout="fill" 
                  objectFit="contain" 
                  style={{ transform: ['Chemba Puttupodi', 'Ginger Garlic Paste'].includes(item.name) ? 'scale(0.75)' : 'none' }}
                />
                <div className="product-hover-overlay">
                  <Link 
                    href={item.category === 'Snacks' ? 'https://cochinsnacks.com/' : `/products/${item.slug}`} 
                    className="quick-view-btn"
                    {...(item.category === 'Snacks' ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    View Product
                  </Link>
                </div>
              </div>
              <div className="product-info-premium">
                <span className="product-cat">{item.category}</span>
                <h4>{item.name}</h4>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 7. Why Pavithram */}
      <section className="why-pavithram" style={{ background: '#F9F5EB' }}>
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


      {/* 9. Join Community */}
      <section className="community-section" style={{ background: '#FFFDF8' }}>
        <motion.div 
          className="section-header center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="subtitle">Join Our Community</span>
          <h2>Stories from the Kitchen</h2>
          <div className="social-icons-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '1.5rem auto 0 auto', gap: '30px' }}>
            <a href="https://www.instagram.com/pavithram_foods/?hl=en" target="_blank" rel="noopener noreferrer" className="header-social-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#E1306C', fontSize: '3rem', transition: 'transform 0.3s', margin: 0, padding: 0 }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}><BsInstagram /></a>
            <a href="https://www.facebook.com/pavithramfoodskerala" target="_blank" rel="noopener noreferrer" className="header-social-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#1877F2', fontSize: '3rem', transition: 'transform 0.3s', margin: 0, padding: 0 }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}><BsFacebook /></a>
            <a href="https://www.youtube.com/@pavithram.online" target="_blank" rel="noopener noreferrer" className="header-social-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#FF0000', fontSize: '3rem', transition: 'transform 0.3s', margin: 0, padding: 0 }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}><BsYoutube /></a>
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
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  const playPromise = video.play();
                  if (playPromise !== undefined) {
                    playPromise.catch(error => {
                      console.warn("Browser blocked audio playback. Muting to allow video to play.", error);
                      video.muted = true;
                      video.play();
                    });
                  }
                }
              }}
              onMouseLeave={(e) => {
                const iframe = e.currentTarget.querySelector('iframe');
                if (iframe) {
                  iframe.src = iframe.src.replace('&autoplay=1&mute=1', '').replace('?autoplay=1&mute=1', '');
                }
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  video.pause();
                  video.currentTime = 0;
                }
              }}
            >
              {videoUrl.endsWith('.mp4') ? (
                <video 
                  src={videoUrl}
                  className="reel-video"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
                  loop
                  playsInline
                  onError={(e) => console.warn('Video failed to load:', e.target.error)}
                />
              ) : (
                <iframe 
                  src={videoUrl}
                  className="reel-video"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', border: 'none' }}
                  allow="autoplay; encrypted-media"
                  title="Social Media Reel"
                />
              )}
              <div className="reel-overlay">
                <BsPlayFill className="play-icon" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>


    </main>
  );
}
