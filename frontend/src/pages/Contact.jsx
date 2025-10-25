import { useState } from "react";
import api from "../api/axiosInstance"; // ✅ use global axios instance
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await api.post("/inquiries", formData); // ✅ dynamic API base URL
      setStatus(res.data.message || "Message sent successfully!");
      setFormData({ name: "", phone: "", message: "" }); // clear fields
    } catch (err) {
      console.error("Error submitting inquiry:", err);
      setStatus("Failed to send inquiry. Please try again.");
    }
  };

  return (
    <div className="contact-page">
      {/* HERO SECTION */}
      <section className="contact-hero">
        <div className="overlay">
          <h1>Contact Us</h1>
          <p>We’re here to help you with all your building material needs.</p>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="contact-info">
        <div className="info-container">
          <div className="info-box">
            <h2>📍 Our Address</h2>
            <p>Near Babasaheb Ambedkar High School, Mandangad, Dist. Ratnagiri — 415203</p>
          </div>
          <div className="info-box">
            <h2>📞 Call Us</h2>
            <p>
              Landline: 02350 225682 / 225957 / 225532 <br />
              Mobile: 9422630193 / 9270026772 / 8149667193 / 9657033788 <br />
              Khed Branch: 9545699932
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="contact-form-section">
        <h2>Send Us an Inquiry</h2>
        <p>Have a question or need a quote? Fill out the form below:</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Submit Message</button>
        </form>

        {status && <p className="form-status">{status}</p>}
      </section>
    </div>
  );
}
