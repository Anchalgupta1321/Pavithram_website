import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Best Cooking Oils & Food Products | Pavithram Online",
  description: "Pavithram offers pure edible cooking oils and ghee, and food products from millets, spices, pickles, jams, Kerala snacks and breakfast essentials online.",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
