"use client";

import './certifications.css';
import { BsStars, BsShieldCheck } from 'react-icons/bs';

export default function CertificationsPage() {
  return (
    <main className="certifications-page">
      {/* Reused Banner */}
      <div className="page-banner">
        <h1>Certifications & Achievements</h1>
        <div className="breadcrumb">
          <span>Home</span> <span className="separator">-</span> <span>Certifications</span>
        </div>
      </div>

      <div className="certifications-container">
        
        {/* Split Layout Section */}
        <div className="certification-split">
          
          <div className="cert-image-wrapper">
            <img 
              src="https://www.pavithram.online/wp-content/uploads/2026/01/pdfrendition1-1-1024x721.png" 
              alt="DGFT One Star Export House Certification" 
            />
          </div>

          <div className="cert-content">
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
              <div className="cert-badge">
                <BsStars style={{ color: 'var(--color-primary-gold)' }} />
                DGFT Certified
              </div>
              <div className="cert-badge">
                <BsShieldCheck style={{ color: 'var(--color-primary-red)' }} />
                Valid till Jan 2031
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
