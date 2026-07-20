import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaWhatsapp } from "react-icons/fa";
import { fetchProductCategories } from "../services/wordpress";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair', display: 'swap' });

export const metadata = {
  title: "Best Cooking Oils & Food Products | Pavithram Foods",
  description: "Pavithram offers pure edible cooking oils and ghee, and food products from millets, spices, pickles, jams, Kerala snacks and breakfast essentials online.",
  keywords: ["Kerala edible oils", "pure sesame oil", "authentic Indian spices", "premium ghee export", "coconut oil", "millets online", "Pavithram foods"],
  authors: [{ name: 'Pavithram Group' }],
  creator: 'Pavithram Group',
  publisher: 'Pavithram Group',
  metadataBase: new URL('https://www.pavithramfoods.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.pavithramfoods.com',
    siteName: 'Pavithram Foods',
    title: 'Best Cooking Oils & Food Products | Pavithram Foods',
    description: 'Pavithram offers pure edible cooking oils and ghee, and food products from millets, spices, pickles, jams, Kerala snacks and breakfast essentials online.',
    images: [
      {
        url: 'https://www.pavithramfoods.com/logo_cropped.png',
        width: 1200,
        height: 630,
        alt: 'Pavithram Foods - Since 1950',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Cooking Oils & Food Products | Pavithram Foods',
    description: 'Pavithram offers pure edible cooking oils and ghee, and food products from millets, spices, pickles, jams, Kerala snacks and breakfast essentials online.',
    images: ['https://www.pavithramfoods.com/logo_cropped.png'],
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export default async function RootLayout({ children }) {
  // Nav dropdown categories come from the lightweight `product-cat` taxonomy
  // (small + cacheable, so it's reliable across all build workers) rather than
  // the heavy product fetch. These names match the products page sidebar and the
  // ?category= filters exactly.
  const productCategories = await fetchProductCategories();

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pavithram Group",
    "url": "https://www.pavithramfoods.com",
    "logo": "https://www.pavithramfoods.com/logo_cropped.png",
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
      <head>
        <link rel="preconnect" href="https://www.pavithram.online" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
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

        <Navbar categories={productCategories} />
        {children}
        <div className="heritage-badge" title="75 Years of Trust">
          <svg viewBox="0 0 100 100" className="badge-svg">
            <path id="curve" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
            <text>
              <textPath href="#curve" startOffset="0%">
                PAVITHRAM FOODS • SINCE 1950 •
              </textPath>
            </text>
          </svg>
          <div className="badge-center">75<br/><span>YRS</span></div>
        </div>
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

        {/* Cochin Snacks Pop-up Button */}
        <a 
          href="https://cochinsnacks.com/" 
          className="cochin-snacks-float" 
          target="_blank" 
          rel="noopener noreferrer"
          title="Discover Cochin Snacks by Pavithram"
        >
          <svg viewBox="0 0 100 100" className="cochin-badge-svg">
            <path id="cochin-curve" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
            <text>
              <textPath href="#cochin-curve" startOffset="10%">
                A PRODUCT OF PAVITHRAM
              </textPath>
            </text>
          </svg>
          <div className="cochin-badge-center">
             <img src="/Cochin_snacks_logo.png" alt="Cochin Snacks" className="cochin-float-img" />
          </div>
        </a>
      </body>
    </html>
  );
}
