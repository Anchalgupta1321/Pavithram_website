"use client";

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import Link from 'next/link';
import './contact.css';

export default function ContactPage() {
  return (
    <>
      <main className="contact-page">
      <div className="contact-header">
        <div className="contact-subtitle">
          <BsStars className="sparkle-icon" /> Contact Us
        </div>
        <h1 className="contact-title">Contact Us For Any Query</h1>
      </div>

      <div className="contact-container">
        {/* Left Info Card */}
        <div className="contact-info-card">
          <h2>Address 1</h2>
          
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <p>Pazhangadi Oil Industries,<br />VI/523A, Kaipoorikkara, Marampally P.O.,<br />Aluva, Kerala- 683107</p>
          </div>
          
          <div className="info-item">
            <FaPhoneAlt className="info-icon" />
            <p>+91 9745300600</p>
          </div>
          
          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <p>care@pavithramfoods.com</p>
          </div>

          <div className="leaf-watermark"></div>
        </div>

        {/* Right Form */}
        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input type="text" placeholder="Name*" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email*" required />
            </div>
            <div className="form-group">
              <input type="tel" placeholder="Phone*" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Subject*" required />
            </div>
            <div className="form-group full-width">
              <textarea placeholder="Your Messages.." rows="8" required></textarea>
            </div>
            <div className="form-group full-width terms-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the <Link href="/terms" style={{ color: 'inherit', textDecoration: 'underline' }}><strong>Terms & Conditions</strong></Link> and <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}><strong>Privacy Policy</strong></Link></label>
            </div>
            <div className="form-group full-width">
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1rem', marginTop: '10px' }}>
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      </main>
      
      {/* Full Width Map Section */}
      <div style={{ width: '100%', height: '450px' }}>
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
      </div>
    </>
  );
}
