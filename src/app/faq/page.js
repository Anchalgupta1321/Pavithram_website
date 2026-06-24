"use client";

import { useState } from 'react';
import { BsStars } from 'react-icons/bs';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './faq.css';

const faqData = [
  {
    question: "What makes Pavithram's edible oils pure and unadulterated?",
    answer: "For over 75 years, we have sourced our sesame seeds, coconuts, and other raw materials directly from trusted local farmers. We use traditional, temperature-controlled extraction methods to ensure maximum nutrition and aroma, with zero added preservatives."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes! We are a DGFT-certified One Star Export House. We currently export our premium edible oils, ghee, spices, millets, and Cochin Snacks to over 25 countries worldwide. For export orders, please visit our Bulk Enquiry page."
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
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="faq-page">
      <div className="faq-header">
        <div className="faq-subtitle">
          <BsStars className="sparkle-icon" /> Support & Info
        </div>
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <p className="faq-desc">
          Have questions about our products, shipping, or heritage? Find your answers below.
        </p>
      </div>

      <div className="faq-container">
        {faqData.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <span className="faq-icon">
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
