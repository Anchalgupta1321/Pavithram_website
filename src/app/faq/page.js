"use client";

import { useState } from 'react';
import { BsStars } from 'react-icons/bs';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './faq.css';

const faqData = [
  {
    question: "What makes Pavithram's edible oils pure and unadulterated?",
    answer: "For over 75 years, we have sourced our sesame seeds, coconuts, and other raw materials directly from trusted local farmers. We use traditional, temperature-controlled extraction methods to ensure maximum nutrition and aroma, with zero added preservatives."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes! We are a DGFT-certified One Star Export House. We currently export our premium edible oils, ghee, spices, millets, and Cochin Snacks to over 28 countries worldwide. For export orders, please visit our Bulk Enquiry page."
  },
  {
    question: "Are your products certified?",
    answer: "Absolutely. All our products are FSSAI certified for domestic markets, and we hold necessary international export certifications to guarantee compliance with global food safety standards."
  },
  {
    question: "What is the shelf life of your products?",
    answer: "Our edible oils generally have a shelf life of 6 to 12 months, while spices and snacks vary. Please refer to the specific packaging on each product for exact manufacturing and expiry dates."
  },
  {
    question: "Do you accept wholesale or bulk orders?",
    answer: "Yes, we handle wholesale and bulk export orders. Please use our Export Enquiry form to reach our B2B sales team for custom quotes and shipping details."
  },
  {
    question: "Are Pavithram products manufactured in India?",
    answer: "Yes. Our products are manufactured in India following strict quality and hygiene standards."
  },
  {
    question: "How can I become a distributor?",
    answer: "You can submit the distributor enquiry form available on our website. Our team will review your application and contact you."
  },
  {
    question: "Do you export internationally?",
    answer: "Yes. We work with export partners across multiple international markets."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach us through our contact page, email, or customer support phone number."
  },
  {
    question: "Where can I buy Pavithram products?",
    answer: "Our products are available through retailers, distributors, and selected online channels."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <main className="faq-page">
      <motion.div 
        className="faq-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="faq-subtitle">
          <BsStars className="sparkle-icon" /> Support & Info
        </div>
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <p className="faq-desc">
          Have questions about our products, shipping, or heritage? Find your answers below.
        </p>
      </motion.div>

      <motion.div 
        className="faq-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {faqData.map((faq, index) => (
          <motion.div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
            variants={fadeInUp}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <span className="faq-icon">
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
            </div>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div 
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
