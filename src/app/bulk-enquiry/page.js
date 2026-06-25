"use client";

import { FaGlobeAmericas, FaAward, FaShip, FaRegHandshake } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { motion } from 'framer-motion';
import './bulk-enquiry.css';

export default function BulkEnquiryPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <main className="bulk-enquiry-page">
      <motion.div 
        className="enquiry-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="enquiry-subtitle">
          <BsStars className="sparkle-icon" /> Export & Wholesale
        </div>
        <h1 className="enquiry-title">Partner With Pavithram</h1>
        <p className="enquiry-desc">
          Join our global network. We export premium Kerala food products to over 25 countries, delivering quality and trust since 1950.
        </p>
      </motion.div>

      <motion.div 
        className="enquiry-stats"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div className="stat-card" variants={fadeInUp} whileHover={{ y: -5 }}>
          <FaGlobeAmericas className="stat-icon" />
          <h3>25+</h3>
          <p>Countries Exported To</p>
        </motion.div>
        <motion.div className="stat-card" variants={fadeInUp} whileHover={{ y: -5 }}>
          <FaAward className="stat-icon" />
          <h3>One Star</h3>
          <p>Export House (DGFT)</p>
        </motion.div>
        <motion.div className="stat-card" variants={fadeInUp} whileHover={{ y: -5 }}>
          <FaShip className="stat-icon" />
          <h3>200+</h3>
          <p>Containers Annually</p>
        </motion.div>
        <motion.div className="stat-card" variants={fadeInUp} whileHover={{ y: -5 }}>
          <FaRegHandshake className="stat-icon" />
          <h3>75+</h3>
          <p>Years of Trust</p>
        </motion.div>
      </motion.div>

      <div className="enquiry-container">
        {/* Left Info Card */}
        <motion.div 
          className="enquiry-info-card"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2>Why Choose Us?</h2>
          <ul className="benefits-list">
            <li><strong>Premium Quality:</strong> 100% pure ingredients sourced directly from farmers.</li>
            <li><strong>Global Standards:</strong> Fully compliant with international food safety regulations.</li>
            <li><strong>Reliable Supply:</strong> State-of-the-art facilities ensuring consistent supply chains.</li>
            <li><strong>Authentic Taste:</strong> Traditional Kerala recipes and extraction methods.</li>
          </ul>
          
          <div className="contact-direct">
            <h3>Direct Export Contact</h3>
            <p><strong>Email:</strong> care@pavithramfoods.com</p>
            <p><strong>Phone:</strong> +91 9745300600</p>
            <p><strong>Phone:</strong> 0484 2678561</p>
          </div>
          <div className="leaf-watermark"></div>
        </motion.div>

        {/* Right Form */}
        <motion.div 
          className="enquiry-form-wrapper"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2>Request a Bulk Quote</h2>
          <form className="enquiry-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group">
                <input type="text" placeholder="Full Name*" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Company Name*" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="email" placeholder="Email Address*" required />
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Phone Number*" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" placeholder="Country / Region*" required />
              </div>
              <div className="form-group">
                <select required defaultValue="">
                  <option value="" disabled>Interested In*</option>
                  <option value="edible-oils">Edible Oils & Ghee</option>
                  <option value="spices">Blended & Straight Spices</option>
                  <option value="snacks">Cochin Snacks</option>
                  <option value="millets-rice">Millets & Rice</option>
                  <option value="multiple">Multiple Categories</option>
                </select>
              </div>
            </div>
            <div className="form-group full-width">
              <textarea placeholder="Tell us about your requirements (expected volume, packaging needs, etc.)" rows="6" required></textarea>
            </div>
            <div className="form-group full-width">
              <motion.button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', padding: '16px', fontSize: '1.1rem', marginTop: '10px' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Enquiry
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
