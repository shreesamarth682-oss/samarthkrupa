import "./About.css";

export default function About() {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-overlay">
          <div className="hero-text">
            <h1>About Shree Samarth Krupa</h1>
            <p>Building Materials • Hardware • Trusted Since Years</p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="about-story">
        <div className="story-container">
          <img
            src="https://housing-images.n7net.in/4f2250e8/23f3448c71017b79ca6726b1c4ba5912/v0/large/shree_samarth_krupa-dombivli_west-thane-reputed_builder.jpg"
            alt="Shop Building Material"
            className="story-image"
          />
          <div className="story-text">
            <h2>Our Story</h2>
            <p>
              <strong>Shree Samarth Krupa</strong> is a trusted name in Mandangad for 
              high-quality <b>building materials and hardware supplies</b>.
              Founded by <b>Mr. Deepak Chandrakant Ghosalkar</b>, our goal has always been to 
              deliver durable and affordable construction materials with honesty and professionalism.
            </p>
            <p>
              We supply <b>Shakti Cement Patra, A.C. Sheets, I-Beams, Channels, Angles, Tiles, Marble, GI & PVC Pipes</b>,
              and much more — all sourced from reliable brands. Our experience and customer-first approach 
              make us a top choice for contractors, builders, and homeowners.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <h2>Our Mission & Vision</h2>
        <div className="mv-grid">
          <div className="mv-card">
            <h3>🎯 Our Mission</h3>
            <p>
              To provide superior-quality materials and hardware that empower customers to build
              strong, safe, and lasting structures — all with transparency and trust.
            </p>
          </div>
          <div className="mv-card">
            <h3>🌟 Our Vision</h3>
            <p>
              To be the most reliable and respected building material supplier in Ratnagiri district,
              recognized for quality, integrity, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Owner Section */}
      <section className="owner-section">
        <div className="owner-card">
          <img
            src="https://res.cloudinary.com/dndqkry1y/image/upload/v1761298222/shree-samarth-krupa/qatw5e7ygtf628terqtp.png"
            alt="Owner"
            className="owner-img"
          />
          <div className="owner-info">
            <h2>Mr. Deepak Chandrakant Ghosalkar</h2>
            <p>
              Founder & Proprietor of <b>Shree Samarth Krupa</b><br />
              With years of experience in the hardware and construction industry, 
              Mr. Ghosalkar is known for his honesty, dedication, and excellent customer relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Business Highlights */}
      <section className="highlights">
        <h2>Our Key Highlights</h2>
        <div className="highlight-grid">
          <div className="highlight-card">
            <h3>🏗️ 500+ Projects</h3>
            <p>Supplying top-quality materials to homes, shops, and commercial sites.</p>
          </div>
          <div className="highlight-card">
            <h3>🚚 Fast Delivery</h3>
            <p>Reliable and timely delivery to all corners of Mandangad and nearby areas.</p>
          </div>
          <div className="highlight-card">
            <h3>🤝 Trusted Service</h3>
            <p>Built long-term relationships based on trust and quality.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
