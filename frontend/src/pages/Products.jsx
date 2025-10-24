import { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      {/* Hero Banner */}
      <section className="products-hero">
        <div className="overlay">
          <h1>Our Products</h1>
          <p>Quality materials that build trust — delivered to your site.</p>
        </div>
      </section>

      {/* Product Categories */}
      <section className="categories">
        <h2>Explore Our Building Materials</h2>
        <p>We provide a complete range of materials for your construction and renovation needs.</p>

        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                {product.price && <p className="price">₹{product.price}</p>}
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </section>

      {/* Quality Section */}
      <section className="quality">
        <h2>Why Our Products?</h2>
        <div className="quality-grid">
          <div className="quality-card">
            <h3>🏗️ Top-Grade Materials</h3>
            <p>We deal only with verified, high-quality products that ensure long-term strength.</p>
          </div>
          <div className="quality-card">
            <h3>💰 Affordable Pricing</h3>
            <p>Competitive prices with complete transparency and no hidden costs.</p>
          </div>
          <div className="quality-card">
            <h3>🚚 Fast Delivery</h3>
            <p>We ensure your materials reach you on time, anywhere in Mandangad.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
