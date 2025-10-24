import "../styles.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p><strong>Category:</strong> {product.category}</p>
      {product.price && <p><strong>Price:</strong> ₹{product.price}</p>}
      <p>{product.description}</p>
    </div>
  );
}
