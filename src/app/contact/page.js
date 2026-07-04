"use client";

import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaSearch, FaStore } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { submitForm } from '../../services/wordpress';
import FormMessage from '../../components/FormMessage';
import './contact.css';

const dealers = [
  { id: 1, name: "Kerala Mart Supermarket", city: "Kochi", address: "MG Road, Ernakulam, Kerala 682011", phone: "0484 2356789" },
  { id: 2, name: "Daily Needs Hypermarket", city: "Thiruvananthapuram", address: "Pattom, Trivandrum, Kerala 695004", phone: "0471 2445566" },
  { id: 3, name: "Malabar Traders", city: "Kozhikode", address: "SM Street, Calicut, Kerala 673001", phone: "0495 2721234" },
  { id: 4, name: "Global Indian Grocers", city: "Dubai", address: "Al Karama, Dubai, UAE", phone: "+971 4 336 1234" },
  { id: 5, name: "South Indian Store", city: "London", address: "East Ham, London, UK E6 1JD", phone: "+44 20 8472 5678" }
];

export default function ContactPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
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
    
    const result = await submitForm('MOCK_ID', data); // Replace MOCK_ID later
    
    setFormStatus({ status: result.status, message: result.message });
    setIsLoading(false);
    
    if (result.status === 'mail_sent' || result.status === 'success') {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  const filteredDealers = dealers.filter(dealer => 
    dealer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="contact-page-wrapper">
      <main className="contact-page">
      <motion.div 
        className="contact-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="contact-subtitle">
          <BsStars className="sparkle-icon" /> Contact Us
        </div>
        <h1 className="contact-title">Contact Us For Any Query</h1>
      </motion.div>

      <div className="contact-container">
        {/* Left Info Card */}
        <motion.div 
          className="contact-info-card"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--color-dark)' }}>
            We would love to hear from you.<br/><br/>
            Whether you are a customer, distributor, retailer, exporter, or business partner, our team is ready to assist you.<br/><br/>
            Get in touch with our team for product enquiries, distributorship opportunities, exports, and business partnerships.<br/><br/>
            Our team will respond at the earliest.
          </p>
          
          <div className="info-item">
            <FaPhoneAlt className="info-icon" />
            <p>0484 2678561, +91 9745 300 600</p>
          </div>
          
          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <p>care@pavithramfoods.com</p>
          </div>

          <div className="info-item" style={{ alignItems: 'flex-start' }}>
            <FaMapMarkerAlt className="info-icon" style={{ marginTop: '5px' }} />
            <p>Pazhangadi Oil Industries,<br />VI/523A, Kaipoorikkara,<br />Marampally P.O.,<br />Aluva, Kerala- 683107</p>
          </div>

          <div className="leaf-watermark"></div>
        </motion.div>

        {/* Right Form */}
        <motion.div 
          className="contact-form-wrapper"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" name="name" placeholder="Name*" required value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Email*" required value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <input type="tel" name="phone" placeholder="Phone*" required value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <input type="text" name="subject" placeholder="Subject*" required value={formData.subject} onChange={handleInputChange} />
            </div>
            <div className="form-group full-width">
              <textarea name="message" placeholder="Your Messages.." rows="8" required value={formData.message} onChange={handleInputChange}></textarea>
            </div>
            <div className="form-group full-width terms-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the <Link href="/terms" style={{ color: 'inherit', textDecoration: 'underline' }}><strong>Terms & Conditions</strong></Link> and <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}><strong>Privacy Policy</strong></Link></label>
            </div>
            <div className="form-group full-width">
              <motion.button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', padding: '16px', fontSize: '1rem', marginTop: '10px', opacity: isLoading ? 0.7 : 1 }}
                whileHover={isLoading ? {} : { scale: 1.02 }}
                whileTap={isLoading ? {} : { scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
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
      
      {/* Full Width Map Section */}
      <motion.div 
        style={{ width: '100%', height: '450px' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <iframe
          src="https://maps.google.com/maps?q=Pavithram%20Oil%20Industries,%20Marampally,%20Aluva,%20Kerala&t=&z=14&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, display: 'block' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Pavithram Oil Industries Location"
        ></iframe>
      </motion.div>
    </div>
  );
}
