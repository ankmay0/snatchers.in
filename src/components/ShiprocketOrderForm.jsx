import React, { useState } from "react";
import axios from "axios";

const styles = {
  card: {
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
    padding: "2rem",
    maxWidth: 600,
    margin: "2rem auto",
    fontFamily: "Segoe UI, Helvetica, Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    margin: 0,
    color: "#082032",
    fontWeight: 700,
    fontSize: 26,
  },
  section: {
    margin: "2rem 0 0.7rem 0",
    color: "#334756",
    fontWeight: 600,
    borderBottom: "1px solid #eee",
    paddingBottom: 6,
    letterSpacing: ".5px",
    fontSize: 15,
  },
  label: {
    display: "block",
    marginTop: 16,
    marginBottom: 6,
    color: "#677983",
    fontWeight: 500,
    fontSize: 14,
  },
  input: {
    padding: "8px 12px",
    fontSize: 16,
    border: "1px solid #c0c0c0",
    borderRadius: 5,
    width: "100%",
    marginBottom: 4,
    outline: "none",
    transition: "border 0.2s",
  },
  productRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    padding: "10px 24px",
    background: "linear-gradient(90deg, #2979ff 50%, #2081c3 100%)",
    border: "none",
    color: "#fff",
    borderRadius: 6,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 18,
    fontSize: 16,
    boxShadow: "0 2px 10px rgba(41,121,255,0.10)",
    transition: "background 0.24s",
  },
  addBtn: {
    marginLeft: 0,
    padding: "7px 17px",
    background: "#e3f0ff",
    color: "#2081c3",
    borderRadius: 5,
    border: "1px solid #2979ff",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: 14,
    marginBottom: 8,
  },
  apiResult: {
    marginTop: 24,
    fontFamily: "monospace",
    background: "#f7f7f9",
    border: "1px solid #ececec",
    borderRadius: 6,
    padding: 16,
    fontSize: 15,
    color: "#2b2d42",
    overflowX: "auto",
    wordBreak: "break-all",
    whiteSpace: "pre-line",
  },
};

const ShiprocketOrderForm = () => {
  const [form, setForm] = useState({
    order_id: "",
    order_date: "",
    billing_customer_name: "",
    billing_address: "",
    billing_city: "",
    billing_pincode: "",
    billing_phone: "",
    shipping_customer_name: "",
    shipping_address: "",
    shipping_city: "",
    shipping_pincode: "",
    shipping_phone: "",
    products: [{ name: "", qty: "", price: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [apiResult, setApiResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductChange = (index, field, value) => {
    const products = [...form.products];
    products[index][field] = value;
    setForm({ ...form, products });
  };

  const addProduct = () => {
    setForm({
      ...form,
      products: [...form.products, { name: "", qty: "", price: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiResult(null);
    try {
      const response = await axios.post("/api/create-order", form);
      setApiResult(response.data);
    } catch (err) {
      setApiResult(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form style={styles.card} onSubmit={handleSubmit} autoComplete="off">
      <h2 style={styles.header}>Create Shiprocket Order</h2>
      <div style={styles.section}>Order Details</div>
      <label style={styles.label}>Order ID</label>
      <input
        style={styles.input}
        name="order_id"
        value={form.order_id}
        onChange={handleChange}
        required
        placeholder="Ex: ORDR-12345"
      />

      <label style={styles.label}>Order Date</label>
      <input
        style={styles.input}
        type="date"
        name="order_date"
        value={form.order_date}
        onChange={handleChange}
        required
      />

      <div style={styles.section}>Billing Address</div>
      <label style={styles.label}>Name</label>
      <input
        style={styles.input}
        name="billing_customer_name"
        value={form.billing_customer_name}
        onChange={handleChange}
        required
      />
      <label style={styles.label}>Address</label>
      <input
        style={styles.input}
        name="billing_address"
        value={form.billing_address}
        onChange={handleChange}
        required
      />
      <label style={styles.label}>City</label>
      <input
        style={styles.input}
        name="billing_city"
        value={form.billing_city}
        onChange={handleChange}
        required
      />
      <label style={styles.label}>Pincode</label>
      <input
        style={styles.input}
        name="billing_pincode"
        value={form.billing_pincode}
        onChange={handleChange}
        required
      />
      <label style={styles.label}>Phone</label>
      <input
        style={styles.input}
        name="billing_phone"
        value={form.billing_phone}
        onChange={handleChange}
        required
      />

      <div style={styles.section}>Shipping Address</div>
      <label style={styles.label}>Name</label>
      <input
        style={styles.input}
        name="shipping_customer_name"
        value={form.shipping_customer_name}
        onChange={handleChange}
        required
      />
      <label style={styles.label}>Address</label>
      <input
        style={styles.input}
        name="shipping_address"
        value={form.shipping_address}
        onChange={handleChange}
        required
      />
      <label style={styles.label}>City</label>
      <input
        style={styles.input}
        name="shipping_city"
        value={form.shipping_city}
        onChange={handleChange}
        required
      />
      <label style={styles.label}>Pincode</label>
      <input
        style={styles.input}
        name="shipping_pincode"
        value={form.shipping_pincode}
        onChange={handleChange}
        required
      />
      <label style={styles.label}>Phone</label>
      <input
        style={styles.input}
        name="shipping_phone"
        value={form.shipping_phone}
        onChange={handleChange}
        required
      />

      <div style={styles.section}>Products</div>
      {form.products.map((prod, idx) => (
        <div style={styles.productRow} key={idx}>
          <input
            style={{ ...styles.input, width: 110 }}
            placeholder="Name"
            value={prod.name}
            onChange={e => handleProductChange(idx, "name", e.target.value)}
            required
          />
          <input
            style={{ ...styles.input, width: 70 }}
            placeholder="Qty"
            type="number"
            value={prod.qty}
            onChange={e => handleProductChange(idx, "qty", e.target.value)}
            required
          />
          <input
            style={{ ...styles.input, width: 100 }}
            placeholder="Price"
            type="number"
            value={prod.price}
            onChange={e => handleProductChange(idx, "price", e.target.value)}
            required
          />
        </div>
      ))}

      <button type="button" style={styles.addBtn} onClick={addProduct}>
        + Add Another Product
      </button>

      <button
        type="submit"
        style={styles.button}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Order"}
      </button>

      {apiResult && (
        <div style={styles.apiResult}>
          <b>API Result:</b>
          <pre>{JSON.stringify(apiResult, null, 2)}</pre>
        </div>
      )}
    </form>
  );
};

export default ShiprocketOrderForm;
