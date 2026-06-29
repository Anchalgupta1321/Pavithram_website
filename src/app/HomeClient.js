"use client";

import './home.css';
import Link from 'next/link';
import { BsShieldCheck, BsGlobe, BsAward, BsClockHistory, BsCheckCircleFill, BsTree, BsDroplet, BsBoxSeam, BsInstagram, BsFacebook } from 'react-icons/bs';
import { motion } from 'framer-motion';

export default function HomeClient({ testimonials, galleryPreview = [] }) {
  const categories = [
    { name: 'Edible Oils & Ghee', image: 'https://www.pavithram.online/wp-content/uploads/2025/10/Edible-Oils.png' },
    { name: 'Cochin Snacks', image: 'https://www.pavithram.online/wp-content/uploads/2025/10/Cochin-Snacks.png' },
    { name: 'Millets', image: 'https://www.pavithram.online/wp-content/uploads/2025/10/Millets_.png' },
    { name: 'Jams & Pickles', image: 'https://www.pavithram.online/wp-content/uploads/2025/10/Jams-Pickles_.png' }
  ];

  const products = [
    { name: 'Pure Sesame Oil', image: '/images/products/Pavithram%20Mockups/Oils/sesame%20oil_500ml-Photoroom.png', bg: 'linear-gradient(to bottom, #fdf6e3 50%, #f3c442 50%)' },
    { name: 'Biriyani Masala 100g', image: 'https://www.pavithram.online/wp-content/uploads/2025/09/Biriyani-Masala-100g.jpg', bg: 'linear-gradient(to bottom, #f3ebfa 50%, #9c63d6 50%)' },
    { name: 'Chicken Masala 160g', image: 'https://www.pavithram.online/wp-content/uploads/2025/09/Chicken-Masala-160g.jpg', bg: 'linear-gradient(to bottom, #fae6e6 50%, #e33b3b 50%)' },
    { name: 'Mutton Masala 160g', image: 'https://www.pavithram.online/wp-content/uploads/2025/09/Mutton-Masala-160g.jpg', bg: 'linear-gradient(to bottom, #f3ebfa 50%, #9c63d6 50%)' },
    { name: 'Pure Coconut Oil', image: 'https://www.pavithram.online/wp-content/uploads/2025/10/Edible-Oils.png', bg: 'linear-gradient(to bottom, #fffceb 50%, #ffda59 50%)' }
  ];

  const offers = [
    { title: 'Festive Special', description: 'Get 20% off on all Premium Ghee.', code: 'FESTIVE20', image: 'https://www.pavithram.online/wp-content/uploads/2025/10/Edible-Oils.png' },
    { title: 'Bulk Offer', description: 'Buy 5L Oil and get 1kg Millets free.', code: 'BULK5', image: 'https://www.pavithram.online/wp-content/uploads/2025/10/Millets_.png' }
  ];

  const socialFeed = [
    'https://www.pavithram.online/wp-content/uploads/2025/10/Jams-Pickles_.png',
    'https://www.pavithram.online/wp-content/uploads/2025/09/Chicken-Masala-160g.jpg',
    'https://www.pavithram.online/wp-content/uploads/2025/10/Millets_.png',
    'https://www.pavithram.online/wp-content/uploads/2025/10/Cochin-Snacks.png'
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <main className="home-page">
      
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeInUp}>Kerala’s Purest <br/><span>For Your Kitchen</span></motion.h1>
          <motion.p variants={fadeInUp}>From a humble oil mill in 1950 to a global brand exported to 25+ countries. We deliver trusted quality, uncompromised purity, and the authentic taste of tradition.</motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/products" className="hero-btn">Explore Products</Link>
          </motion.div>
        </motion.div>
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 1.05, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="https://www.pavithram.online/wp-content/uploads/2025/09/Model-Foreground-Hero.png" alt="Pavithram Products" />
        </motion.div>
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
            <p>Exported to 25+ Countries</p>
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

      {/* Seasonal Offers / Promotions */}
      <section className="offers-section">
        <motion.div 
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span>Limited Time</span>
          <h2>Seasonal Offers</h2>
        </motion.div>
        <motion.div 
          className="offers-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {offers.map((offer, i) => (
            <motion.div className="offer-card" key={i} variants={fadeInUp} whileHover={{ scale: 1.02 }}>
              <div className="offer-content">
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                <div className="offer-code">Use Code: <strong>{offer.code}</strong></div>
                <Link href="/products" className="hero-btn" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', marginTop: '1rem' }}>Shop Now</Link>
              </div>
              <div className="offer-img">
                <img src={offer.image} alt={offer.title} />
              </div>
            </motion.div>
          ))}
        </motion.div>
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

      {/* Trending Products Slider */}
      <section className="products-section">
        <motion.div 
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span>Bestsellers</span>
          <h2>Loved by Generations</h2>
        </motion.div>
        <motion.div 
          className="products-scroller"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {products.map((prod, i) => (
            <motion.div 
              className="product-card premium-card" 
              key={i} 
              variants={fadeInUp}
              style={{ background: prod.bg }}
            >
              <div className="product-badges">
                <span className="badge-quality">100% Pure</span>
                <span className="badge-export">Export Quality</span>
              </div>
              <img src={prod.image} alt={prod.name} style={{ mixBlendMode: 'multiply', backgroundColor: '#e5e5e5' }} onError={(e) => { e.target.src="https://www.pavithram.online/wp-content/uploads/2025/09/Model-Foreground-Hero.png" }} />
              <h3>{prod.name}</h3>
              <Link href="/products" className="view-btn premium-btn">View Product</Link>
            </motion.div>
          ))}
        </motion.div>
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

      {/* Gallery Section */}
      <section className="home-gallery-section">
        <motion.div 
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span>Glimpses of Pavithram</span>
          <h2>Inside Our World</h2>
        </motion.div>
        <motion.div 
          className="home-gallery-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {galleryPreview.map((img, i) => (
            <motion.div className="home-gallery-item" key={`gallery-${i}`} variants={fadeInUp} whileHover={{ scale: 1.02 }}>
              <img src={img.url} alt="Pavithram Gallery" />
            </motion.div>
          ))}
        </motion.div>
        <motion.div 
          style={{ textAlign: 'center', marginTop: '3rem' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Link href="/gallery" className="hero-btn">View Full Gallery</Link>
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
