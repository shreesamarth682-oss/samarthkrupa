import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [useUpload, setUseUpload] = useState(true); // ✅ toggle between upload and URL
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // ✅ Fetch all inquiries
  const fetchInquiries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/inquiries");
      setInquiries(res.data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchInquiries();
  }, []);

  // ✅ Handle text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Image upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm({ ...form, image: res.data.imageUrl });
      alert("✅ Image uploaded successfully!");
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("❌ Image upload failed");
    }
  };

  // ✅ Add or Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/products/${editingId}`, form);
        alert("✅ Product updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/products", form);
        alert("✅ Product added successfully!");
      }
      setForm({ name: "", category: "", price: "", description: "", image: "" });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // ✅ Edit product
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: product.image,
    });
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete product
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    }
  };

  // ✅ Delete inquiry
  const handleDeleteInquiry = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await axios.delete(`http://localhost:5000/api/inquiries/${id}`);
        alert("🗑️ Inquiry deleted successfully!");
        fetchInquiries();
      } catch (error) {
        console.error("Error deleting inquiry:", error);
      }
    }
  };

  // ✅ Logout Function
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminAuth"); // Clear login session
      navigate("/admin/login"); // Redirect to login page
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
  <div className="header-top">
    <h1 className="dashboard-title">🧰 Admin Dashboard</h1>

    {/* ✅ Logout Button */}
    <button className="logout-btn" onClick={handleLogout}>
      🚪 Logout
    </button>
  </div>
  <p>Manage products, inquiries, and billing from one place.</p>

  {/* ✅ Generate Bill Button */}
  <div className="center-btn">
    <button
      className="generate-bill-btn"
      onClick={() => navigate("/admin/invoice")}
    >
      🧾 Generate Bill
    </button>
  </div>
</div>


      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "products" ? "active" : ""}
          onClick={() => setActiveTab("products")}
        >
          🧱 Products
        </button>
        <button
          className={activeTab === "inquiries" ? "active" : ""}
          onClick={() => setActiveTab("inquiries")}
        >
          📬 Inquiries
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === "products" && (
        <div className="tab-content">
          <h2>{editingId ? "Edit Product" : "Manage Products"}</h2>

          <form className="product-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={form.price}
              onChange={handleChange}
            />

            {/* ✅ Toggle between Upload or URL */}
            <div className="image-option-toggle">
              <label>
                <input
                  type="radio"
                  checked={useUpload}
                  onChange={() => setUseUpload(true)}
                />{" "}
                Upload Image
              </label>
              <label>
                <input
                  type="radio"
                  checked={!useUpload}
                  onChange={() => setUseUpload(false)}
                />{" "}
                Paste Image URL
              </label>
            </div>

            {useUpload ? (
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            ) : (
              <input
                type="text"
                name="image"
                placeholder="Enter Image URL"
                value={form.image}
                onChange={handleChange}
              />
            )}

            {/* ✅ Preview */}
            {form.image && (
              <div className="preview-container">
                <img src={form.image} alt="Preview" className="image-preview" />
              </div>
            )}

            <textarea
              name="description"
              placeholder="Description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">
              {editingId ? "Update Product" : "Add Product"}
            </button>
          </form>

          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Preview</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p._id}>
                  <td>{i + 1}</td>
                  <td>
                    <img src={p.image} alt={p.name} className="thumb" />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                  <td>
                    <button className="edit" onClick={() => handleEdit(p)}>
                      ✏️ Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDeleteProduct(p._id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* INQUIRIES TAB */}
      {activeTab === "inquiries" && (
        <div className="tab-content">
          <h2>Customer Inquiries</h2>
          {inquiries.length === 0 ? (
            <p>No inquiries yet.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq, i) => (
                  <tr key={inq._id}>
                    <td>{i + 1}</td>
                    <td>{inq.name}</td>
                    <td>{inq.phone}</td>
                    <td>{inq.message}</td>
                    <td>
                      {new Date(inq.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => handleDeleteInquiry(inq._id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
