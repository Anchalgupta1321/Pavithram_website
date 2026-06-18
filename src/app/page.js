"use client";

import './home.css';
import Link from 'next/link';
import { BsShieldCheck, BsGlobe, BsAward, BsClockHistory, BsCheckCircleFill, BsTree, BsDroplet, BsBoxSeam } from 'react-icons/bs';

export default function HomePage() {
  const categories = [
    { name: 'Edible Oils & Ghee', image: 'https://www.pavithram.online/wp-content/uploads/2025/10/Edible-Oils.png' },
    { name: 'Cochin Snacks', image: 'https://www.pavithram.online/wp-content/uploads/2025/10/Cochin-Snacks.png' },
    { name: 'Millets', image: 'https://www.pavithram.online/wp-content/uploads/2025/10/Millets_.png' },
    { name: 'Jams & Pickles', image: 'https://www.pavithram.online/wp-content/uploads/2025/10/Jams-Pickles_.png' }
  ];

  const products = [
    { name: 'Pure Sesame Oil', image: 'https://www.pavithram.online/wp-content/uploads/2025/10/Edible-Oils.png' },
    { name: 'Chicken Masala 160g', image: 'https://www.pavithram.online/wp-content/uploads/2025/09/Chicken-Masala-160g.jpg' },
    { name: 'Biriyani Masala 100g', image: 'https://www.pavithram.online/wp-content/uploads/2025/09/Biriyani-Masala-100g.jpg' },
    { name: 'Mutton Masala 160g', image: 'https://www.pavithram.online/wp-content/uploads/2025/09/Mutton-Masala-160g.jpg' },
    { name: 'Pure Coconut Oil', image: 'https://www.pavithram.online/wp-content/uploads/2025/09/coconut-oil-500ml.jpg' } // Assuming this exists or falls back gracefully
  ];

  return (
    <main className="home-page">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Kerala’s Purest <br/><span>For Your Kitchen</span></h1>
          <p>From a humble oil mill in 1950 to a global brand exported to 25+ countries. We deliver trusted quality, uncompromised purity, and the authentic taste of tradition.</p>
          <Link href="/products" className="hero-btn">Explore Products</Link>
        </div>
        <div className="hero-image">
          <img src="https://www.pavithram.online/wp-content/uploads/2025/09/Model-Foreground-Hero.png" alt="Pavithram Products" />
        </div>
      </section>

      {/* Trust Bar (Beating the D2C brands on transparency & legacy) */}
      <div className="trust-bar">
        <div className="trust-item">
          <BsClockHistory className="trust-icon" />
          <div className="trust-text">
            <h4>75+ Years Legacy</h4>
            <p>Trusted since 1950</p>
          </div>
        </div>
        <div className="trust-item">
          <BsShieldCheck className="trust-icon" />
          <div className="trust-text">
            <h4>100% Pure & Natural</h4>
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
            <p>Exported to 25+ Countries</p>
          </div>
        </div>
      </div>

      {/* Farm to Kitchen Process */}
      <section className="process-section">
        <div className="section-heading">
          <span>Our Process</span>
          <h2>Purity in Every Drop</h2>
        </div>
        <div className="process-grid">
          <div className="process-step">
            <BsTree className="process-icon" />
            <h3>1. Sourced with Care</h3>
            <p>We handpick the finest sesame seeds and coconuts directly from trusted local farmers across India.</p>
          </div>
          <div className="process-step">
            <BsDroplet className="process-icon" />
            <h3>2. Traditional Extraction</h3>
            <p>Our oils are extracted using traditional, temperature-controlled methods to retain maximum nutrients and aroma.</p>
          </div>
          <div className="process-step">
            <BsBoxSeam className="process-icon" />
            <h3>3. Hygienic Packaging</h3>
            <p>Processed and bottled in our state-of-the-art, fully automatic facility ensuring zero human touch.</p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="categories-section">
        <div className="section-heading">
          <span>Shop by Category</span>
          <h2>Explore Our Range</h2>
        </div>
        <div className="categories-grid">
          {categories.map((cat, i) => (
            <div className="cat-card" key={i}>
              <img src={cat.image} alt={cat.name} />
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Hero Product Spotlight */}
      <section className="spotlight-section">
        <div className="spotlight-split">
          <div className="spotlight-img">
            <img src="https://www.pavithram.online/wp-content/uploads/2025/10/Edible-Oils.png" alt="Pavithram Pure Sesame Oil" />
          </div>
          <div className="spotlight-content">
            <div className="section-heading" style={{ textAlign: 'left', marginBottom: '1rem' }}>
              <span>Signature Product</span>
            </div>
            <h2>Pavithram Pure Sesame Oil</h2>
            <ul className="spotlight-list">
              <li><BsCheckCircleFill /> 100% Pure & Unadulterated</li>
              <li><BsCheckCircleFill /> Rich in natural antioxidants</li>
              <li><BsCheckCircleFill /> Perfect for cooking and Ayurveda</li>
              <li><BsCheckCircleFill /> Trusted by generations since 1950</li>
            </ul>
            <Link href="/products" className="hero-btn">Buy Now</Link>
          </div>
        </div>
      </section>

      {/* Trending Products Slider */}
      <section className="products-section">
        <div className="section-heading">
          <span>Bestsellers</span>
          <h2>Loved by Generations</h2>
        </div>
        <div className="products-scroller">
          {products.map((prod, i) => (
            <div className="product-card" key={i}>
              <img src={prod.image} alt={prod.name} onError={(e) => { e.target.src="https://www.pavithram.online/wp-content/uploads/2025/09/Model-Foreground-Hero.png" }} />
              <h3>{prod.name}</h3>
              <Link href="/products" className="view-btn">View Product</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-heading">
          <span>Customer Love</span>
          <h2>What Our Family Says</h2>
        </div>
        <div className="testimonial-card">
          <p>"Pavithram sesame oil is the only oil my grandmother trusts. It tastes exactly like the traditional oils we used to get in our village decades ago. Absolutely pure!"</p>
          <div className="testimonial-author">- Aisha M., Kerala</div>
        </div>
      </section>

      {/* Heritage Teaser */}
      <section className="heritage-teaser">
        <div className="heritage-teaser-content">
          <h2>From a humble mill in Aluva to <span>millions of kitchens</span> worldwide.</h2>
          <p>Founded in the 1950s as Pazhangadi Oil Industries, the Pavithram Group of Companies has grown from a trusted edible oil manufacturer into a complete food brand loved in Kerala and abroad. We ensure purity, nutrition, and freshness in every product, continuing a legacy of health and tradition for over 75 years.</p>
          <Link href="/heritage" className="hero-btn">Discover Our Story</Link>
        </div>
        <div className="heritage-teaser-img">
          <img src="https://www.pavithram.online/wp-content/uploads/2025/09/about-img-1.png" alt="Pavithram Heritage" />
        </div>
      </section>

    </main>
  );
}
