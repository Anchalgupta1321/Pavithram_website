import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroContent}>
          
          <div className={styles.heroText}>
            <h1 className={styles.title}>
              Kerala’s Purest <br />
              <span className="gradient-text-gold">For Your Kitchen</span>
            </h1>
            <p className={styles.subtitle}>
              From authentic Oils to Millets & Essentials - Pavithram Delivers Trusted Quality for over 75 Years.
            </p>
            
            <div className={styles.buttonGroup}>
              <button className="btn-primary">Shop Retail</button>
              <button className="btn-secondary">Bulk / Export Enquiry</button>
            </div>

            <div className={styles.trustBadges}>
              <div className={styles.badge}>
                <span>★</span> 75 Years of Trust
              </div>
              <div className={styles.badge}>
                <span>✓</span> FSSAI Certified
              </div>
              <div className={styles.badge}>
                <span>🌍</span> Exporting to 25+ Countries
              </div>
            </div>
          </div>

          <div className={styles.heroImageContainer}>
            {/* We will replace this with an actual optimized next/image later */}
            <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--color-primary-gold)' }}>
              <span style={{ color: 'var(--color-primary-gold)', fontWeight: 'bold' }}>[ Product Image Placeholder ]</span>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
