"use client";

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="privacy-page">
      {/* Banner */}
      <motion.div 
        className="page-banner"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1>Privacy & Policy</h1>
        <div className="breadcrumb">
          <span>Home</span> <span className="separator">-</span> <span>Privacy & Policy</span>
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
        <h2>Privacy & Policy</h2>
        
        <p>We are dedicated to safeguarding and respecting your privacy.</p>

        <p>This Privacy Policy, together with our Cookies Policy, outlines how we collect, use, and protect any personal information you provide to us or that we collect from you. We do not gather any information that can identify individual visitors unless you voluntarily share your personal details with us. Please review this Privacy Policy carefully before using our website or submitting any personal data. We do not share your personal information with third parties or non-affiliated companies.</p>
        
        <hr style={{ border: 'none', borderBottom: '1px solid #eaeaea', marginTop: '3rem' }} />
      </motion.div>
    </main>
  );
}
