"use client";

import './heritage.css';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BsGeoAltFill } from 'react-icons/bs';

export default function HeritagePage() {
  const leaders = [
    {
      name: "P. M. Muhammed Rafique",
      title: "Chairman & Managing Director",
      image: "https://www.pavithram.online/wp-content/themes/pavithram/assets/img/about/P.%20M.%20Muhammed%20Rafique.jpg"
    },
    {
      name: "P. M. Zakeer Hussain",
      title: "Director",
      image: "https://www.pavithram.online/wp-content/themes/pavithram/assets/img/about/Zakeer2.jpg"
    },
    {
      name: "P. M. Abdul Samad",
      title: "Director",
      image: "https://www.pavithram.online/wp-content/themes/pavithram/assets/img/about/Abdul%20Samad.jpg"
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <main className="heritage-page">
      
      {/* Hero Banner */}
      <motion.section 
        className="heritage-hero"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="hero-video-wrapper">
          <iframe 
            src="https://www.youtube.com/embed/lh2vZLgutII?autoplay=1&mute=1&loop=1&playlist=lh2vZLgutII&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1" 
            title="Pavithram Story Background" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
          <div className="hero-video-overlay"></div>
        </div>

        <motion.h1 variants={fadeInUp} style={{ position: 'relative', zIndex: 3 }}>A Legacy Born in Aluva</motion.h1>
        <motion.p variants={fadeInUp} style={{ position: 'relative', zIndex: 3 }}>
          Started as a small family business in Aluva, Pavithram comes from a traditional family whose roots run deep in Kerala’s heritage of purity and hard work. What began as a humble oil mill has now grown into a global brand loved by thousands, exporting to 25+ countries around the world.
        </motion.p>
      </motion.section>

      {/* Heritage Logos Section */}
      <section className="heritage-logos-section">
        <motion.div 
          className="heritage-logos-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div className="heritage-logo-left" variants={fadeInUp}>
            <Image src="/logo.png" alt="Pavithram Logo" width={300} height={150} style={{ objectFit: 'contain', width: 'auto', height: '120px' }} />
          </motion.div>
          <div className="heritage-logo-divider"></div>
          <motion.div className="heritage-logo-right" variants={fadeInUp}>
            <Image src="/75_years_logo_new.png" alt="75 Years of Inspiring Tradition" width={300} height={150} style={{ objectFit: 'contain', width: 'auto', height: '150px' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* Global Reach Stats Section */}
      <section className="heritage-stats-section">
        <motion.div 
          className="stats-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div className="stat-box" variants={fadeInUp}>
            <h2>150+</h2>
            <p>SKUs</p>
          </motion.div>
          <div className="stat-divider"></div>
          <motion.div className="stat-box" variants={fadeInUp}>
            <h2>140+</h2>
            <p>Cities in<br />India</p>
          </motion.div>
          <div className="stat-divider"></div>
          <motion.div className="stat-box" variants={fadeInUp}>
            <h2>28+</h2>
            <p>Countries</p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="world-map-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <Image src="/Gemini_Generated_Image_y9n24ny9n24ny9n2.png" alt="Global Reach Map" width={1200} height={600} style={{ width: '100%', height: 'auto', opacity: 1, display: 'block' }} />
        </motion.div>
      </section>

      {/* Modern Timeline */}
      <section className="timeline-section">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Our 75-Year Journey
        </motion.h2>
        <div className="timeline">
          
          {[
            {
              year: "1950s", title: "The Beginning", img: "https://www.pavithram.online/wp-content/themes/pavithram/assets/img/about/Sri.%20P.%20A.%20Moideen%20Haji.jpg", alt: "Sri. P. A. Moideen Haji",
              desc: "In the late 1950s, Sri. P. A. Moideen Haji, along with his three brothers, laid the foundation of the business by starting an Oil Mill in Aluva under the name Brothers’ Mill. They sourced only the best quality sesame seeds and coconuts to produce pure, traditional edible oils. Their oils quickly gained trust among local vendors and Ayurveda establishments, known for their natural aroma, taste, and authenticity."
            },
            {
              year: "1950s", title: "The Guiding Light", img: "https://www.pavithram.online/wp-content/themes/pavithram/assets/img/about/A.%20K.%20Aishu.jpg", alt: "Smt. A. K. Aishu",
              desc: "Smt. A. K. Aishu, the woman power behind the birth and growth of this business, was the guiding light of Pavithram’s journey. As the beloved better half of Sri. P. A. Moideen Haji, she stood beside him through every challenge and triumph. Her strength, wisdom, and unwavering support were instrumental in shaping what has now become a lasting legacy, an empire built on values, trust, and perseverance."
            },
            {
              year: "1990s", title: "The New Generation",
              desc: "The three sons of Moideen Haji transformed the traditional business into a consumer-focused brand. They launched PAVITHRAM, packaging the oils for direct customers. With the installation of fully automatic machinery, Pavithram began producing filtered pure sesame seed oil."
            },
            {
              year: "2005", title: "Growth and Expansion",
              desc: "Pavithram introduced a new brand, Pulari, specializing in rice bran oil. Within a short period, Pulari became a popular choice among consumers, marking Pavithram Products as a leading name in the edible oil segment."
            },
            {
              year: "2010", title: "Bottle Production Unit",
              desc: "The group set up its own bottle production unit with an iconic bottle design. This move helped streamline packaging, ensure hygiene, and increase production efficiency. Pavithram also introduced lamp oil to households and spiritual spaces."
            },
            {
              year: "2019", title: "Diversification",
              desc: "With a vision to diversify, Pavithram ventured into food products such as masalas, curry powders, pickles, jams, and condiments, catering to both the Indian market and expatriates abroad who longed for the authentic taste of home."
            },
            {
              year: "2023", title: "The Taste of Kerala", img: "https://www.pavithram.online/wp-content/themes/pavithram/assets/img/about/snacks-abt.png", alt: "Cochin Snacks",
              desc: "After receiving overwhelming appreciation for Kerala’s traditional snacks in international markets, Pavithram launched Cochin Snacks, a sister brand dedicated to authentic Kerala-style snacks. Today, it is a fast-growing favorite."
            },
            {
              year: "Present & Beyond", title: "Reaching the World", img: "https://www.pavithram.online/wp-content/themes/pavithram/assets/img/about/container2.png", alt: "Global Export Containers",
              desc: "By 2025, Pavithram proudly exports around 200 containers every year to more than 28 countries. Looking ahead, Pavithram is gearing up to introduce new product ranges, including breakfast items and ready-to-eat meals."
            }
          ].map((item, index) => (
            <motion.div 
              className="timeline-item" 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h3>{item.title}</h3>
                {item.img && (
                  <div className="timeline-image-wrapper single-img">
                    <Image src={item.img} alt={item.alt} width={500} height={300} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                  </div>
                )}
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>



      {/* Leaders Section */}
      <section className="leaders-section">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2>The Leaders Who Carried the Legacy Forward</h2>
          <p className="leaders-subtitle">Together, they strengthened the foundation laid by their parents, steering Pavithram towards innovation, expansion, and global recognition.</p>
        </motion.div>
        
        <motion.div 
          className="leaders-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {leaders.map((leader, index) => (
            <motion.div 
              className="leader-card" 
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
            >
              <div className="leader-img-wrapper">
                <Image src={leader.image} alt={leader.name} width={400} height={400} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
              </div>
              <div className="leader-info">
                <h4>{leader.name}</h4>
                <p>{leader.title}</p>
                <span className="company">Pavithram Group of Companies</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* Video Section */}
      <section className="video-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp}>Our Essence</motion.h2>
          <motion.p variants={fadeInUp}>From a small Oil Mill in Aluva to a name trusted across the world, Pavithram stands for purity, tradition, and innovation. Every product we make carries the same promise, authentic taste, uncompromised quality, and the warmth of Kerala’s legacy.</motion.p>
          
          <motion.div className="video-wrapper" variants={fadeInUp}>
            <iframe 
              src="https://www.youtube.com/embed/lh2vZLgutII?autoplay=0&rel=0" 
              title="Pavithram Story" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
}
