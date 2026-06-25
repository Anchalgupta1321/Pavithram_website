import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "../components/Footer";
import { FaWhatsapp } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Best Cooking Oils & Food Products | Pavithram Online",
  description: "Pavithram offers pure edible cooking oils and ghee, and food products from millets, spices, pickles, jams, Kerala snacks and breakfast essentials online.",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({ children }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pavithram Group",
    "url": "https://www.pavithram.online",
    "logo": "https://www.pavithram.online/logo_cropped.png",
    "foundingDate": "1950",
    "description": "Pavithram is a beloved food brand from Kerala, trusted for over 75 years. We export pure edible oils, ghee, and traditional foods to 25+ countries.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9745300600",
      "contactType": "customer service"
    }
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Google Analytics Setup */}
        <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />

        <nav style={{ padding: '1.2rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-background-albastor)', boxShadow: '0 2px 15px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo_cropped.png" alt="Pavithram Logo" style={{ height: '70px', objectFit: 'contain' }} />
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: '500', fontSize: '0.95rem' }}>
            <a href="/" className="nav-link">Home</a>
            
            <div className="nav-item has-dropdown">
              <span className="nav-link">Our Story ▾</span>
              <div className="dropdown-menu">
                <a href="/heritage" className="dropdown-item">Heritage</a>
                <a href="/certifications" className="dropdown-item">Certifications</a>
              </div>
            </div>

            <div className="nav-item has-dropdown">
              <span className="nav-link">Shop ▾</span>
              <div className="dropdown-menu">
                <a href="/products" className="dropdown-item">All Products</a>
                <a href="/products/oils" className="dropdown-item">Oils</a>
                <a href="/products/ghee" className="dropdown-item">Ghee</a>
                <a href="/products/millets" className="dropdown-item">Millets</a>
              </div>
            </div>

            <a href="/blogs" className="nav-link">Recipes & Blogs</a>

            <div className="nav-item has-dropdown">
              <span className="nav-link">Contact Us ▾</span>
              <div className="dropdown-menu">
                <a href="/contact" className="dropdown-item">Contact</a>
                <a href="/faq" className="dropdown-item">FAQ</a>
              </div>
            </div>
            <a href="/bulk-enquiry" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem', marginLeft: '1rem' }}>Export Enquiry</a>
          </div>
        </nav>
        {children}
        <Footer />
        <a 
          href="https://wa.me/919745300600" 
          className="whatsapp-float" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
        >
          <FaWhatsapp />
        </a>
      </body>
    </html>
  );
}
