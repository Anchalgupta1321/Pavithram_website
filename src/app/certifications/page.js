"use client";

import './certifications.css';
import { BsStars, BsShieldCheck } from 'react-icons/bs';
import { FaFilePdf, FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

const pdfCerts = [
  "APEDA Certificate-Brothers Oil Mill.pdf",
  "APEDA-Pazhangadi Oil Industries.pdf",
  "Coconut Development Board Cerificate-Brothers Oil Mill.pdf",
  "FSSAI Licence-Pazhangadi Oil Industries.pdf",
  "FSSAI License Brothers oil mill.pdf",
  "FSSAI License Cochin Snacks (1).pdf",
  "GMP-Brothers Oil Mill.pdf",
  "ISO 22000-Brothers Oil Mill.pdf",
  "ISO 22000-Pazhangadi Oil Industries.pdf",
  "ISO 22716-Pazhangadi Oil Industries.pdf",
  "ISO-Cochin Snacks.pdf",
  "Spices Board Certificate-Pazhangadi Oil Industries.pdf",
  "Tea Board Certificate-Pazhangadi Oil Industries.pdf",
  "USFDA-Brothers Oil Mill.pdf",
  "USFDA-Pavithram Snacks.pdf",
  "USFDA-Pazhangadi Oil Industries.pdf"
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
            <p>Download and view our complete list of quality, safety, and export certifications.</p>
          </motion.div>

          <div className="pdf-grid">
            {pdfCerts.map((cert, index) => (
              <motion.a 
                href={`/certifications/${cert}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-card"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="pdf-icon-wrapper">
                  <FaFilePdf className="pdf-icon" />
                </div>
                <div className="pdf-info">
                  <h3>{cert.replace('.pdf', '').replace(/-/g, ' ')}</h3>
                  <div className="pdf-download">
                    <span>View Document</span>
                    <FaDownload />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
