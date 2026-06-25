import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "../components/Navbar";
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

        <Navbar />
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
