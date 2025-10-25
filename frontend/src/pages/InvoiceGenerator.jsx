import { useEffect, useState } from "react";
import api from "../api/axiosInstance"; // ✅ Use your configured Axios instance
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./InvoiceGenerator.css";

export default function InvoiceGenerator() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
  });

  // ✅ Fetch products (auto handles local + Render)
  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Add product
  const addProduct = (product) => {
    if (!selectedProducts.find((p) => p._id === product._id)) {
      setSelectedProducts([...selectedProducts, { ...product, qty: 1 }]);
    }
  };

  // ✅ Update quantity or price
  const updateProduct = (id, field, value) => {
    setSelectedProducts(
      selectedProducts.map((p) =>
        p._id === id ? { ...p, [field]: Number(value) } : p
      )
    );
  };

  // ✅ Remove product
  const removeProduct = (id) => {
    setSelectedProducts(selectedProducts.filter((p) => p._id !== id));
  };

  // ✅ Total amount
  const totalAmount = selectedProducts.reduce(
    (sum, p) => sum + p.price * p.qty,
    0
  );

  // ✅ Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const today = new Date().toLocaleDateString("en-IN");

    doc.setCharSpace(0);

    // Header
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("Shree Samarth Krupa - Invoice", 14, 15);

    doc.setFont("times", "normal");
    doc.setFontSize(11);
    doc.text("Building Material & Hardware", 14, 21);
    doc.text(
      "Near Babasaheb Ambedkar High School, Mandangad, Dist. Ratnagiri",
      14,
      26
    );
    doc.text("Mob: 9422630193 / 9270026772 / 8149667193", 14, 31);

    // Customer Info
    doc.setFont("times", "bold");
    doc.text(`Date: ${today}`, 150, 15);
    doc.text(`Customer: ${customer.name || "-"}`, 150, 21);
    doc.text(`Phone: ${customer.phone || "-"}`, 150, 26);

    // Product Table
    const tableData = selectedProducts.map((p, i) => [
      i + 1,
      p.name,
      p.category,
      p.qty,
      p.price.toFixed(2),
      (p.qty * p.price).toFixed(2),
    ]);

    autoTable(doc, {
      head: [["#", "Product", "Category", "Qty", "Price (Rs.)", "Total (Rs.)"]],
      body: tableData,
      startY: 38,
      styles: {
        font: "times",
        fontSize: 11,
        cellPadding: 3,
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [0, 74, 173],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
    });

    const finalY = doc.lastAutoTable.finalY || 38;

    // ✅ Grand Total only
    doc.setFont("times", "bold");
    doc.setFontSize(12);
    doc.text(`Grand Total: Rs. ${totalAmount.toFixed(2)}`, 14, finalY + 10);

    // Footer
    doc.setFont("times", "normal");
    doc.setFontSize(11);
    doc.text("Thank you for your purchase! Visit again.", 14, finalY + 20);

    doc.save(`Invoice_${customer.name || "Customer"}.pdf`);
  };

  return (
    <div className="invoice-generator">
      <h1>Invoice / Bill Generator</h1>

      {/* Customer Info */}
      <div className="customer-section">
        <input
          type="text"
          placeholder="Customer Name"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Customer Phone"
          value={customer.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
        />
      </div>

      {/* Product Selector */}
      <div className="product-selector">
        <h3>Available Products</h3>
        <div className="product-list">
          {products.map((p) => (
            <div className="product-card" key={p._id}>
              <img src={p.image} alt={p.name} />
              <p>{p.name}</p>
              <button onClick={() => addProduct(p)}>Add</button>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Products */}
      <div className="selected-products">
        <h3>Invoice Items</h3>
        {selectedProducts.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price (Rs.)</th>
                  <th>Total (Rs.)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((p, i) => (
                  <tr key={p._id}>
                    <td>{i + 1}</td>
                    <td>{p.name}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={p.qty}
                        onChange={(e) =>
                          updateProduct(p._id, "qty", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={p.price}
                        onChange={(e) =>
                          updateProduct(p._id, "price", e.target.value)
                        }
                      />
                    </td>
                    <td>{(p.qty * p.price).toFixed(2)}</td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => removeProduct(p._id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ✅ Grand Total */}
            <div className="totals-display">
              <h3>Grand Total: Rs. {totalAmount.toFixed(2)}</h3>
            </div>
          </>
        )}

        {selectedProducts.length > 0 && (
          <div className="invoice-footer">
            <button onClick={generatePDF}>📄 Generate PDF</button>
          </div>
        )}
      </div>
    </div>
  );
}
