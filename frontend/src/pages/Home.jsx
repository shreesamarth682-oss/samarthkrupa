import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Shree Samarth Krupa</h1>
          <p>
            Your trusted supplier for quality building materials and hardware in Mandangad.
          </p>
          <button onClick={() => (window.location.href = "tel:9422630193")}>
            📞 Call Us Now
          </button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="home-about">
        <div className="about-inner">
          <img
            src="https://www.addressofchoice.com/aoc_assets/elevation/41721/Shree_Samarth_Krupa_Complex_elevation_2.jpg"
            alt="Building Material"
            className="about-img"
          />
          <div className="about-text">
            <h2>About Us</h2>
            <p>
              <strong>Shree Samarth Krupa</strong>, owned by <b>Mr. Deepak Chandrakant Ghosalkar</b>,
              has been serving Mandangad with high-quality building materials and hardware for years.
              We provide <b>Shakti Cement Patra, A.C. Sheets, I-Beams, Channels, Angles, Tiles, Marbles, GI & PVC fittings</b>,
              and much more — ensuring durability and trusted service.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="home-products">
        <h2>Our Products</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="https://5.imimg.com/data5/SELLER/Default/2023/10/355693962/DS/QZ/BW/60537958/whatsapp-image-2023-10-26-at-11-51-11-am-1000x1000.jpeg" alt="Cement" />
            <h3>Shakti Cement Patra</h3>
          </div>
          <div className="product-card">
            <img src="https://5.imimg.com/data5/EM/ZW/DA/GLADMIN-3631955/ms-angles-channels-i-beam.jpg" alt="Steel" />
            <h3>I-Beam, Channel & Angle</h3>
          </div>
          <div className="product-card">
            <img src="https://image.made-in-china.com/2f0j00pRObfNiKrnqL/Ripple-All-Over-Marble-Tile-Floor-Tiles-750X1500-Living-Room-Bedroom-Floor-Non-Slip-Floor-Tiles.jpg" alt="Tiles" />
            <h3>Tiles & Marble (Suncity, Style, Cryamik)</h3>
          </div>
          <div className="product-card">
            <img src="https://rowy.com.my/uploads/1/4/0/4/140415688/gi-pvc-fitting-piping-2408202201_orig.jpg" alt="Fittings" />
            <h3>GI & PVC Pipes & Fittings</h3>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-choose">
        <h2>Why Choose Us?</h2>
        <div className="why-grid">
          <div className="why-card">
            <h3>🏗️ Trusted Supplier</h3>
            <p>Supplying to homes, shops, and construction projects across Mandangad.</p>
          </div>
          <div className="why-card">
            <h3>💰 Affordable Pricing</h3>
            <p>High-quality materials at competitive prices you can trust.</p>
          </div>
          <div className="why-card">
            <h3>🚚 On-Time Delivery</h3>
            <p>We ensure every order reaches your site quickly and safely.</p>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="contact-cta">
        <h2>Contact Us Today</h2>
        <p>
          📍 Near Babasaheb Ambedkar High School, Mandangad, Dist. Ratnagiri — 415203 <br />
          ☎️ 02350 225682 / 225957 / 225532 <br />
          📱 9422630193 / 9270026772 / 8149667193 / 9657033788
        </p>
        <button onClick={() => (window.location.href = "/contact")}>📩 Get in Touch</button>
      </section>
    </div>
  );
}
