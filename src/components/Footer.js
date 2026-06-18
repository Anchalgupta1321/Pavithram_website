import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <h2 className="footer-logo">PAVITHRAM</h2>
          <p className="footer-desc">
            Pavithram is a beloved food brand from Kerala, trusted for over 75 years and still going strong. Known for our pure coconut and gingelly oils, we now offer a range of authentic food products proudly exported to 25+ countries worldwide.
          </p>
          <div className="social-links">
            <a href="https://www.facebook.com/pavithramfoodskerala" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebookF /></a>
            <a href="https://www.instagram.com/pavithram_foods/?hl=en" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
            <a href="https://www.linkedin.com/company/pavithramgroup/" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedinIn /></a>
            <a href="https://www.youtube.com/@pavithram.online" target="_blank" rel="noopener noreferrer" className="social-icon"><FaYoutube /></a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/heritage">Heritage</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/certifications">Certifications</a></li>
            <li><a href="/blogs">Blogs</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Explore Column */}
        <div className="footer-col">
          <h3 className="footer-heading">Explore</h3>
          <ul className="footer-links">
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-col contact-col">
          <h3 className="footer-heading">Contact Us</h3>
          
          <div className="contact-item">
            <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaPhoneAlt /> Phone</strong>
            <p>0484 2678561,<br />+91 9745 300 600</p>
          </div>
          
          <div className="contact-item">
            <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaEnvelope /> Email</strong>
            <p>care@pavithramfoods.com</p>
          </div>
          
          <div className="contact-item">
            <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaMapMarkerAlt /> Address</strong>
            <p>Pazhangadi Oil Industries,<br />VI/523A, Kaipoorikkara,<br />Marampally P.O.,<br />Aluva, Kerala- 683107</p>
          </div>
        </div>

      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Pavithram Foods. All rights reserved.</p>
      </div>
    </footer>
  );
}
