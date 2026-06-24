"use client";

import { FaGlobeAmericas, FaAward, FaShip, FaRegHandshake } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import './bulk-enquiry.css';

export default function BulkEnquiryPage() {
  return (
    <main className="bulk-enquiry-page">
      <div className="enquiry-header">
        <div className="enquiry-subtitle">
          <BsStars className="sparkle-icon" /> Export & Wholesale
        </div>
        <h1 className="enquiry-title">Partner With Pavithram</h1>
        <p className="enquiry-desc">
          Join our global network. We export premium Kerala food products to over 25 countries, delivering quality and trust since 1950.
        </p>
      </div>

      <div className="enquiry-stats">
        <div className="stat-card">
          <FaGlobeAmericas className="stat-icon" />
          <h3>25+</h3>
          <p>Countries Exported To</p>
        </div>
        <div className="stat-card">
          <FaAward className="stat-icon" />
          <h3>One Star</h3>
          <p>Export House (DGFT)</p>
        </div>
        <div className="stat-card">
          <FaShip className="stat-icon" />
          <h3>200+</h3>
          <p>Containers Annually</p>
        </div>
        <div className="stat-card">
          <FaRegHandshake className="stat-icon" />
          <h3>75+</h3>
          <p>Years of Trust</p>
        </div>
      </div>

      <div className="enquiry-container">
        {/* Left Info Card */}
        <div className="enquiry-info-card">
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
        </div>

        {/* Right Form */}
        <div className="enquiry-form-wrapper">
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
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem', marginTop: '10px' }}>
                Submit Enquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
