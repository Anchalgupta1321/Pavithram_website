"use client";

import './heritage.css';

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

  return (
    <main className="heritage-page">
      
      {/* Hero Banner */}
      <section className="heritage-hero">
        <h1>A Legacy Born in Aluva</h1>
        <p>
          Started as a small family business in Aluva, Pavithram comes from a traditional family whose roots run deep in Kerala’s heritage of purity and hard work. What began as a humble oil mill has now grown into a global brand loved by thousands, exporting to 25+ countries around the world.
        </p>
      </section>

      {/* Modern Timeline */}
      <section className="timeline-section">
        <h2>Our 75-Year Journey</h2>
        <div className="timeline">
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-year">1950s</span>
              <h3>The Beginning</h3>
              <div className="timeline-image-wrapper single-img">
                <img src="https://www.pavithram.online/wp-content/themes/pavithram/assets/img/about/Sri.%20P.%20A.%20Moideen%20Haji.jpg" alt="Sri. P. A. Moideen Haji" />
              </div>
              <p>In the late 1950s, Sri. P. A. Moideen Haji, along with his three brothers, laid the foundation of the business by starting an Oil Mill in Aluva under the name Brothers’ Mill. They sourced only the best quality sesame seeds and coconuts to produce pure, traditional edible oils. Their oils quickly gained trust among local vendors and Ayurveda establishments, known for their natural aroma, taste, and authenticity.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-year">1950s</span>
              <h3>The Guiding Light</h3>
              <div className="timeline-image-wrapper single-img">
                <img src="https://www.pavithram.online/wp-content/themes/pavithram/assets/img/about/A.%20K.%20Aishu.jpg" alt="Smt. A. K. Aishu" />
              </div>
              <p>Smt. A. K. Aishu, the woman power behind the birth and growth of this business, was the guiding light of Pavithram’s journey. As the beloved better half of Sri. P. A. Moideen Haji, she stood beside him through every challenge and triumph. Her strength, wisdom, and unwavering support were instrumental in shaping what has now become a lasting legacy, an empire built on values, trust, and perseverance.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-year">1990s</span>
              <h3>The New Generation</h3>
              <p>The three sons of Moideen Haji transformed the traditional business into a consumer-focused brand. They launched PAVITHRAM, packaging the oils for direct customers. With the installation of fully automatic machinery, Pavithram began producing filtered pure sesame seed oil.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-year">2005</span>
              <h3>Growth and Expansion</h3>
              <p>Pavithram introduced a new brand, Pulari, specializing in rice bran oil. Within a short period, Pulari became a popular choice among consumers, marking Pavithram Products as a leading name in the edible oil segment.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-year">2010</span>
              <h3>Bottle Production Unit</h3>
              <p>The group set up its own bottle production unit with an iconic bottle design. This move helped streamline packaging, ensure hygiene, and increase production efficiency. Pavithram also introduced lamp oil to households and spiritual spaces.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-year">2019</span>
              <h3>Diversification</h3>
              <p>With a vision to diversify, Pavithram ventured into food products such as masalas, curry powders, pickles, jams, and condiments, catering to both the Indian market and expatriates abroad who longed for the authentic taste of home.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-year">2023</span>
              <h3>The Taste of Kerala</h3>
              <div className="timeline-image-wrapper single-img">
                <img src="https://www.pavithram.online/wp-content/themes/pavithram/assets/img/about/snacks-abt.png" alt="Cochin Snacks" />
              </div>
              <p>After receiving overwhelming appreciation for Kerala’s traditional snacks in international markets, Pavithram launched Cochin Snacks, a sister brand dedicated to authentic Kerala-style snacks. Today, it is a fast-growing favorite.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-year">Present & Beyond</span>
              <h3>Reaching the World</h3>
              <div className="timeline-image-wrapper single-img">
                <img src="https://www.pavithram.online/wp-content/themes/pavithram/assets/img/about/container2.png" alt="Global Export Containers" />
              </div>
              <p>By 2025, Pavithram proudly exports around 200 containers every year to more than 25 countries. Looking ahead, Pavithram is gearing up to introduce new product ranges, including breakfast items and ready-to-eat meals.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Leaders Section */}
      <section className="leaders-section">
        <h2>The Leaders Who Carried the Legacy Forward</h2>
        <p className="leaders-subtitle">Together, they strengthened the foundation laid by their parents, steering Pavithram towards innovation, expansion, and global recognition.</p>
        
        <div className="leaders-grid">
          {leaders.map((leader, index) => (
            <div className="leader-card" key={index}>
              <div className="leader-img-wrapper">
                <img src={leader.image} alt={leader.name} />
              </div>
              <div className="leader-info">
                <h4>{leader.name}</h4>
                <p>{leader.title}</p>
                <span className="company">Pavithram Group of Companies</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        <h2>Our Essence</h2>
        <p>From a small Oil Mill in Aluva to a name trusted across the world, Pavithram stands for purity, tradition, and innovation. Every product we make carries the same promise, authentic taste, uncompromised quality, and the warmth of Kerala’s legacy.</p>
        
        <div className="video-wrapper">
          <iframe 
            src="https://www.youtube.com/embed/lh2vZLgutII?autoplay=0&rel=0" 
            title="Pavithram Story" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
      </section>

    </main>
  );
}
