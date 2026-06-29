"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="terms-page">
      {/* Banner */}
      <motion.div 
        className="page-banner"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1>Terms & Conditions</h1>
        <div className="breadcrumb">
          <span>Home</span> <span className="separator">-</span> <span>Terms & Conditions</span>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="page-content"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.2 }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-red)', fontWeight: '600', textDecoration: 'none' }}>
            ← Back to Contact Us
          </Link>
        </div>
        <h2>Terms & Conditions</h2>
        <p>Please read these Terms & Conditions and all our policies carefully before accessing or using our Website for shopping. By accessing or purchasing from our Website, you (“You”) agree to be bound by these Terms & Conditions and policies specified herein, which together constitute a valid and binding agreement between You and Us (Pavithramfoods). If you do not agree to all the terms of this agreement, you must not access or use any of the services offered on our Website. Pavithramfoods reserves the right to modify or update these Terms & Conditions and policies at any time, and therefore, you are advised to review them before making any new purchase.</p>

        <p>The Website, including all its information and content such as data, images, and text, is owned by or licensed to Pavithramfoods. Copying, using, or publishing any part of this content for commercial purposes without our prior permission is strictly prohibited.</p>

        <p>We have made every effort to display our products on the Website as accurately as possible. However, the images you see may vary depending on your device’s display and color settings. Therefore, we cannot guarantee that your screen’s display of product colors will be completely accurate. While Pavithramfoods strives to provide the most current, accurate, and reliable information, occasional typographical errors, omissions, or inaccuracies may occur. Such errors are unintentional, and we apologize for any inconvenience caused. We reserve the right to correct any errors, update product information, or amend prices at any time without prior notice.</p>

        <p>These Terms & Conditions, our sales policies, and all purchases made through this Website shall be governed by and interpreted in accordance with the laws of India, without regard to conflict of law principles. Any disputes arising in relation to these Terms & Conditions shall be subject to the exclusive jurisdiction of the courts in Ernakulam, Kerala.</p>
      </motion.div>
    </main>
  );
}
