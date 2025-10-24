import { Link } from "react-router-dom";
import "../styles.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>🏗️ Shree Samarth Krupa</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}
