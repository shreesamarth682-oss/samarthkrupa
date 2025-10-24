import { BrowserRouter as Router, Routes,  Navigate,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import InvoiceGenerator from "./pages/InvoiceGenerator";
import AdminLogin from "./pages/AdminLogin";
import "./styles.css";

export default function App() {

  const isAdmin = localStorage.getItem("adminAuth");
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />}
        />
        <Route path="/admin/invoice" element={<InvoiceGenerator />} />

      </Routes>
      <Footer />
    </Router>
  );
}
