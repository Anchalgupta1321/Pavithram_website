"use client";
import { useState } from 'react';import './certifications.css';
import { BsStars, BsShieldCheck, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { FaFilePdf, FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CertificateSlider = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <img 
        src={images[0]} 
        alt={title} 
        style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
      />
    );
  }

  return (
    <div className="cert-slider" style={{ position: 'relative', width: '100%' }}>
      <img 
        src={images[currentIndex]} 
        alt={`${title} Page ${currentIndex + 1}`} 
        style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
      />
      <button 
        onClick={prevSlide} 
        className="slider-btn prev"
        style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}
      >
        <BsChevronLeft size={20} />
      </button>
      <button 
        onClick={nextSlide} 
        className="slider-btn next"
        style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}
      >
        <BsChevronRight size={20} />
      </button>
      <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', zIndex: 2 }}>
        Page {currentIndex + 1} of {images.length}
      </div>
    </div>
  );
};

const pdfCerts = [
  "APEDA Certificate-Brothers Oil Mill",
  "APEDA-Pazhangadi Oil Industries",
  "Coconut Development Board Cerificate-Brothers Oil Mill",
  "FSSAI Licence-Pazhangadi Oil Industries",
  "FSSAI License Brothers oil mill",
  "FSSAI License Cochin Snacks (1)",
  "GMP-Brothers Oil Mill",
  "Spices Board Certificate-Pazhangadi Oil Industries",
  "Tea Board Certificate-Pazhangadi Oil Industries",
  "USFDA-Brothers Oil Mill",
  "USFDA-Pavithram Snacks",
  "USFDA-Pazhangadi Oil Industries"
];

const detailedCerts = [
  {
    title: "HACCP Certified",
    subtitle: "Hazard Analysis and Critical Control Points",
    desc1: "Our facilities strictly adhere to the Hazard Analysis and Critical Control Points (HACCP) system, an internationally recognized method for identifying and managing food safety related risk.",
    desc2: "Through rigorous monitoring of our entire production process, we prevent potential hazards and guarantee the highest standards of product integrity and consumer safety.",
    badge1: "HACCP Certified",
    badge2: "Global Standards",
    pdf: "/certifications/HACCP Certificate Original Copy Scanned (1).pdf"
  },
  {
    title: "ISO 22000 Certified",
    subtitle: "Brothers Oil Mill",
    desc1: "Brothers Oil Mill is officially ISO 22000 certified, demonstrating our unwavering commitment to comprehensive food safety management systems.",
    desc2: "This international standard ensures that our products are consistently safe for consumption worldwide, meeting strict statutory and regulatory food safety requirements.",
    badge1: "ISO 22000",
    badge2: "Food Safety",
    pdf: "/certifications/ISO 22000-Brothers Oil Mill.pdf"
  },
  {
    title: "ISO 22000 Certified",
    subtitle: "Pazhangadi Oil Industries",
    desc1: "Pazhangadi Oil Industries maintains the prestigious ISO 22000 certification, reflecting our stringent food safety protocols across all our manufacturing units.",
    desc2: "We prioritize rigorous quality control at every stage of production, from raw material sourcing to final packaging, ensuring absolute product safety and quality.",
    badge1: "ISO 22000",
    badge2: "Premium Quality",
    image: "/certifications/ISO 22000 -Pazhangadi Oil Industries.png"
  },
  {
    title: "ISO 22716 Certified",
    subtitle: "Pazhangadi Oil Industries",
    desc1: "We are proud to hold the ISO 22716 certification for Good Manufacturing Practices (GMP) at Pazhangadi Oil Industries.",
    desc2: "This certification validates our dedication to maintaining the highest quality, safety, and hygiene standards in our advanced manufacturing processes.",
    badge1: "ISO 22716",
    badge2: "GMP Certified",
    pdf: "/certifications/ISO 22716-Pazhangadi Oil Industries.pdf"
  },
  {
    title: "ISO Certified",
    subtitle: "Cochin Snacks",
    desc1: "Cochin Snacks operates under strict ISO guidelines to deliver premium quality traditional snacks that meet global standards.",
    desc2: "Our certification underscores our focus on operational excellence, hygienic processing, and absolute customer satisfaction.",
    badge1: "ISO Certified",
    badge2: "Quality Assured",
    pdf: "/certifications/ISO-Cochin Snacks.pdf"
  }
];

export default function CertificationsPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="certifications-page">
      {/* Reused Banner */}
      <motion.div 
        className="page-banner"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1>Certifications & Achievements</h1>
        <div className="breadcrumb">
          <span>Home</span> <span className="separator">-</span> <span>Certifications</span>
        </div>
      </motion.div>

      <div className="certifications-container">
        
        {/* Split Layout Section */}
        <div className="certification-split">
          
          <motion.div 
            className="cert-image-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
          >
            <Image 
              src="https://www.pavithram.online/wp-content/uploads/2026/01/pdfrendition1-1-1024x721.png" 
              alt="DGFT One Star Export House Certification" 
              width={1024}
              height={721}
              style={{ width: '100%', height: 'auto' }}
            />
          </motion.div>

          <motion.div 
            className="cert-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
          >
            <h2>Government Recognised <br/><span className="highlight">One Star Export House</span></h2>
            
            <p>
              <strong>Pazhangadi Oil Industries</strong> is proud to be officially recognized as a <strong>One Star Export House</strong> by the Directorate General of Foreign Trade (DGFT), Ministry of Commerce and Industry, Government of India, in accordance with the provisions of the Foreign Trade Policy 2023. 
            </p>
            
            <p>
              This esteemed recognition is awarded to exporters who demonstrate consistent export performance, regulatory compliance, and a strong commitment to quality and ethical trade practices. The certificate has been digitally issued and authenticated by the DGFT, Regional Authority, Kochi, ensuring complete transparency and credibility.
            </p>
            
            <p>
              This recognition strengthens our standing in international markets and reinforces the trust placed in us by global customers, partners, and stakeholders. As a Government of India–recognized export house, we benefit from enhanced facilitation under India’s foreign trade framework, enabling smoother operations and improved global outreach. We remain dedicated to delivering high-quality products and contributing meaningfully to India’s export growth.
            </p>

            <div className="cert-badges">
              <motion.div className="cert-badge" whileHover={{ scale: 1.05 }}>
                <BsStars style={{ color: 'var(--color-primary-gold)' }} />
                DGFT Certified
              </motion.div>
              <motion.div className="cert-badge" whileHover={{ scale: 1.05 }}>
                <BsShieldCheck style={{ color: 'var(--color-primary-red)' }} />
                Valid till Jan 2031
              </motion.div>
            </div>

          </motion.div>

        </div>

        {detailedCerts.map((cert, index) => (
          <div className={`certification-split ${index % 2 === 0 ? 'reverse' : ''}`} key={index}>
            <motion.div 
              className="cert-image-wrapper"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={index % 2 === 0 ? slideInRight : slideInLeft}
            >
              {cert.image ? (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', background: 'transparent' }}>
                  <img src={cert.image} alt={cert.title} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
                </div>
              ) : cert.pdf ? (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', background: 'transparent' }}>
                  <Document
                    file={cert.pdf}
                    options={pdfOptions}
                    loading={
                      <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Loading Certificate...</div>
                    }
                    error={
                      <div style={{ padding: '2rem', textAlign: 'center', color: '#d93025' }}>Failed to render PDF.</div>
                    }
                  >
                    <Page 
                      pageNumber={1} 
                      width={550}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      renderMode="svg"
                      className="pdf-page-canvas"
                    />
                  </Document>
                </div>
              ) : (
                <div style={{ width: '100%', height: 'auto', aspectRatio: '1 / 1.414', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                  <p style={{ color: '#666', fontWeight: 600 }}>HACCP PDF Pending Upload</p>
                </div>
              )}
            </motion.div>

            <motion.div 
              className="cert-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={index % 2 === 0 ? slideInLeft : slideInRight}
            >
              <h2>{cert.title} <br/><span className="highlight">{cert.subtitle}</span></h2>
              <p>{cert.desc1}</p>
              <p>{cert.desc2}</p>
              
              <div className="cert-badges">
                <motion.div className="cert-badge" whileHover={{ scale: 1.05 }}>
                  <BsStars style={{ color: 'var(--color-primary-gold)' }} />
                  {cert.badge1}
                </motion.div>
                <motion.div className="cert-badge" whileHover={{ scale: 1.05 }}>
                  <BsShieldCheck style={{ color: 'var(--color-primary-red)' }} />
                  {cert.badge2}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Certificate Gallery Grid */}
      <div className="pdf-gallery-section">
        <div className="certifications-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <motion.div 
            className="gallery-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>Our Full Range of Certifications</h2>
          </motion.div>

          <div className="cert-list">
            {pdfCerts.map((cert, index) => (
              <motion.div 
                className="cert-list-item"
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <BsShieldCheck className="cert-list-icon" />
                <span className="cert-list-name">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
