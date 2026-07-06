"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { submitForm } from '../services/wordpress';
import FormMessage from './FormMessage';

export default function Footer() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormStatus(null);
    
    const data = new FormData();
    data.append('email', email);
    
    const result = await submitForm('MOCK_ID_NEWSLETTER', data); 
    
    setFormStatus({ status: result.status, message: result.message });
    setIsLoading(false);
    
    if (result.status === 'mail_sent' || result.status === 'success') {
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <motion.div 
        className="newsletter-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="newsletter-content">
          <h3 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Subscribe to our Newsletter</h3>
          <p style={{ color: '#b0b0b0' }}>Get the latest updates, heritage recipes, and exclusive offers straight to your inbox.</p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubscribe} style={{ flexWrap: 'wrap' }}>
          <input type="email" placeholder="Enter your email address" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit" className="btn-primary" disabled={isLoading} style={{ opacity: isLoading ? 0.7 : 1 }}>
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
          <div style={{ width: '100%', marginTop: '0.5rem' }}>
            {formStatus && <FormMessage status={formStatus.status} message={formStatus.message} />}
          </div>
        </form>
      </motion.div>

      <motion.div 
        className="footer-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        
        {/* Brand Column */}
        <motion.div className="footer-col brand-col" variants={fadeInUp}>
          <Image src="/logo_cropped.png" alt="Pavithram Logo" width={270} height={90} style={{ height: '90px', width: 'auto', marginBottom: '1.5rem', objectFit: 'contain' }} />
          <p className="footer-desc">
            Pavithram is a beloved food brand from Kerala, trusted for over 75 years and still going strong. Known for our pure coconut and gingelly oils, we now offer a range of authentic food products proudly exported to 25+ countries worldwide.
          </p>
          <div className="social-links">
            <a href="https://www.facebook.com/pavithramfoodskerala" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebookF /></a>
            <a href="https://www.instagram.com/pavithram_foods/?hl=en" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
            <a href="https://www.linkedin.com/company/pavithramgroup/" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedinIn /></a>
            <a href="https://www.youtube.com/@pavithram.online" target="_blank" rel="noopener noreferrer" className="social-icon"><FaYoutube /></a>
          </div>
        </motion.div>

        {/* Quick Links Column */}
        <motion.div className="footer-col" variants={fadeInUp}>
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/heritage">Heritage</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/certifications">Certifications</a></li>
            <li><a href="/blogs">Blogs</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </motion.div>

        {/* Explore Column */}
        <motion.div className="footer-col" variants={fadeInUp}>
          <h3 className="footer-heading">Explore</h3>
          <ul className="footer-links">
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
          </ul>
        </motion.div>

        {/* Contact Column */}
        <motion.div className="footer-col contact-col" variants={fadeInUp}>
          <h3 className="footer-heading">Contact Us</h3>
          
          <div className="contact-item">
            <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaPhoneAlt /> Phone</strong>
            <p>+91 9745 300 600</p>
          </div>
          
          <div className="contact-item">
            <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaEnvelope /> Email</strong>
            <p>care@pavithramfoods.com</p>
          </div>
          
          <div className="contact-item">
            <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaMapMarkerAlt /> Address</strong>
            <p>Pazhangadi Oil Industries,<br />VI/523A, Kaipoorikkara,<br />Marampally P.O.,<br />Aluva, Kerala- 683107</p>
          </div>
        </motion.div>

      </motion.div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Pavithram Foods. All rights reserved.</p>
      </div>
    </footer>
  );
}
