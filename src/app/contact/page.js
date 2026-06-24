"use client";

import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaSearch, FaStore } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import Link from 'next/link';
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

  const filteredDealers = dealers.filter(dealer => 
    dealer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Dealer Locator Section */}
      <section className="dealer-locator-section">
        <div className="dealer-locator-header">
          <h2>Find a Dealer Near You</h2>
          <p>Search for certified Pavithram distributors and retail outlets in your area.</p>
        </div>
        
        <div className="dealer-search-box">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by city, store name, or address..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="dealer-grid">
          {filteredDealers.length > 0 ? (
            filteredDealers.map(dealer => (
              <div key={dealer.id} className="dealer-card">
                <div className="dealer-card-header">
                  <FaStore className="store-icon" />
                  <h3>{dealer.name}</h3>
                </div>
                <div className="dealer-info">
                  <p><strong><FaMapMarkerAlt className="dealer-small-icon"/></strong> {dealer.address}</p>
                  <p><strong><FaPhoneAlt className="dealer-small-icon"/></strong> {dealer.phone}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-dealers">
              <p>No dealers found matching your search. Please try a different location or contact us directly.</p>
            </div>
          )}
        </div>
      </section>

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
