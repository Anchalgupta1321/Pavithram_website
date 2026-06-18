import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Best Cooking Oils & Food Products | Pavithram Online",
  description: "Pavithram offers pure edible cooking oils and ghee, and food products from millets, spices, pickles, jams, Kerala snacks and breakfast essentials online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-background-albastor)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--color-primary-red)' }}>
            PAVITHRAM
          </div>
          <div style={{ display: 'flex', gap: '2rem', fontWeight: '500' }}>
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/products">Products</a>
            <a href="/contact">Contact</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
