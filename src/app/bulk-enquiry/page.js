"use client";

import { FaGlobeAmericas, FaAward, FaShip, FaRegHandshake } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { submitForm } from '../../services/wordpress';
import FormMessage from '../../components/FormMessage';
import './bulk-enquiry.css';

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

  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', country: '', interest: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormStatus(null);
    
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    
    const result = await submitForm('MOCK_ID_ENQUIRY', data); 
    
    setFormStatus({ status: result.status, message: result.message });
    setIsLoading(false);
    
    if (result.status === 'mail_sent' || result.status === 'success') {
      setFormData({ name: '', company: '', email: '', phone: '', country: '', interest: '', message: '' });
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
          <h3><AnimatedCounter to={25} suffix="+" /></h3>
          <p>Countries Exported To</p>
        </motion.div>
        <motion.div className="stat-card" variants={fadeInUp} whileHover={{ y: -5 }}>
          <FaAward className="stat-icon" />
          <h3>One Star</h3>
          <p>Export House (DGFT)</p>
        </motion.div>
        <motion.div className="stat-card" variants={fadeInUp} whileHover={{ y: -5 }}>
          <FaShip className="stat-icon" />
          <h3><AnimatedCounter to={200} suffix="+" /></h3>
          <p>Containers Annually</p>
        </motion.div>
        <motion.div className="stat-card" variants={fadeInUp} whileHover={{ y: -5 }}>
          <FaRegHandshake className="stat-icon" />
          <h3><AnimatedCounter to={75} suffix="+" /></h3>
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
          <form className="enquiry-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input type="text" name="name" placeholder="Full Name*" required value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <input type="text" name="company" placeholder="Company Name*" required value={formData.company} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="email" name="email" placeholder="Email Address*" required value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <input type="tel" name="phone" placeholder="Phone Number*" required value={formData.phone} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" name="country" placeholder="Country / Region*" required value={formData.country} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <select name="interest" required value={formData.interest} onChange={handleInputChange}>
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
              <textarea name="message" placeholder="Tell us about your requirements (expected volume, packaging needs, etc.)" rows="6" required value={formData.message} onChange={handleInputChange}></textarea>
            </div>
            <div className="form-group full-width">
              <motion.button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', padding: '16px', fontSize: '1.1rem', marginTop: '10px', opacity: isLoading ? 0.7 : 1 }}
                whileHover={isLoading ? {} : { scale: 1.02 }}
                whileTap={isLoading ? {} : { scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit Enquiry'}
              </motion.button>
            </div>
            {formStatus && (
              <div className="form-group full-width" style={{ marginTop: '-10px' }}>
                <FormMessage status={formStatus.status} message={formStatus.message} />
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </main>
  );
}
