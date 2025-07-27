import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import OrderPlacedModal from "./OrderPlacedModal"; // <-- ADD THIS IMPORT!

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PICKUP_LOCATION = "warehouse";

const BuyNowComponent = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setLoadingProduct(true);
    axios
      .get(`${API_BASE_URL}/api/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoadingProduct(false);
      })
      .catch(() => {
        setProduct(null);
        setLoadingProduct(false);
      });
  }, [productId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePayNow = async () => {
    if (!product) return;
    setLoading(true);
    setResult(null);

    // Check if Razorpay has loaded
    if (!(window && window.Razorpay)) {
      setResult({
        success: false,
        error: "Razorpay SDK has not loaded. Please refresh the page.",
      });
      setLoading(false);
      return;
    }

    try {
      // 1. Create Razorpay Order
      const paymentPayload = {
        amount: product.price, // INR, backend should convert to paise
        currency: "INR",
        receipt: "rcptid_" + Date.now(),
      };
      const paymentRes = await axios.post(
        `${API_BASE_URL}/api/payment/create-order`,
        paymentPayload
      );
      const { id: razorpayOrderId, amount, currency } = paymentRes.data.order;

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Razorpay public key
        amount, // paise
        currency,
        name: "Your Shop Name",
        description: "Product Purchase",
        order_id: razorpayOrderId,
        handler: async function (response) {
          // 3. Shiprocket order creation – only after successful payment
          const payment_id = response.razorpay_payment_id;

          try {
            const payload = {
              order_id: "ORD-" + Date.now(),
              order_date: new Date().toISOString().slice(0, 10),
              pickup_location: PICKUP_LOCATION,
              billing_customer_name: form.name,
              billing_last_name: "",
              billing_address: form.address,
              billing_city: form.city,
              billing_pincode: form.pincode,
              billing_state: form.state,
              billing_country: form.country,
              billing_email: form.email,
              billing_phone: form.phone,
              shipping_is_billing: true,
              order_items: [
                {
                  name: product.title || product.name,
                  sku: product.sku || product._id,
                  units: 1,
                  selling_price: product.price,
                },
              ],
              sub_total: product.price * 1,
              length: 20.32,
              breadth: 20.32,
              height: 3.81,
              weight: 0.2,
              payment_method: "Prepaid",
              payment_id,
            };

            const responseSR = await axios.post(
              `${API_BASE_URL}/api/shiprocket/create-order`,
              payload
            );

            setResult({ success: true, response: responseSR.data });
          } catch (err) {
            setResult({
              success: false,
              error:
                err.response?.data?.message ||
                err.response?.data ||
                err.message ||
                "Unknown error (order creation)",
            });
          }
          setLoading(false);
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#d32f2f" },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setResult({
              success: false,
              error: "Payment cancelled by user.",
            });
          },
        },
      };

      // Must check if window.Razorpay is available
      const rzp = new window.Razorpay(options);
      rzp.open();
      // Do not set loading false here, wait until handler or cancel
    } catch (err) {
      setResult({ success: false, error: err.message });
      setLoading(false);
    }
  };

  const renderError = (error) => {
    if (!error) return null;
    if (typeof error === "string") return error;
    if (error.message) return error.message;
    return (
      <pre className="whitespace-pre-wrap text-xs">
        {JSON.stringify(error, null, 2)}
      </pre>
    );
  };

  if (loadingProduct) return <div>Loading product...</div>;
  if (!product) return <div>Product not found</div>;

  // === ORDER PLACED MODAL SHOW ===
  if (result && result.success) {
    // Try to get order ID from the shiprocket API response
    const orderId =
      result.response?.shiprocket?.order_id ||
      result.response?.order_id ||
      "N/A";
    return (
      <OrderPlacedModal
        orderId={orderId}
        onClose={() => (window.location.href = "/")}
      />
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl shadow p-7 mt-10 max-w-md">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Buy Now</h3>
      <p className="mb-3 text-lg font-semibold text-red-600">
        {product.title} — ₹{product.price}
      </p>
      <div className="flex flex-col gap-3">
        <input
          className="border border-gray-300 rounded px-4 py-2 focus:border-red-500 outline-none"
          placeholder="Name"
          name="name"
          value={form.name}
          required
          onChange={handleChange}
        />
        {/* ...other inputs as before... */}
        <input
          className="border border-gray-300 rounded px-4 py-2 focus:border-red-500 outline-none"
          placeholder="Address"
          name="address"
          value={form.address}
          required
          onChange={handleChange}
        />
        <input
          className="border border-gray-300 rounded px-4 py-2 focus:border-red-500 outline-none"
          placeholder="City"
          name="city"
          value={form.city}
          required
          onChange={handleChange}
        />
        <input
          className="border border-gray-300 rounded px-4 py-2 focus:border-red-500 outline-none"
          placeholder="State"
          name="state"
          value={form.state}
          required
          onChange={handleChange}
        />
        <input
          className="border border-gray-300 rounded px-4 py-2 focus:border-red-500 outline-none"
          placeholder="Pincode"
          name="pincode"
          value={form.pincode}
          required
          onChange={handleChange}
        />
        <input
          className="border border-gray-300 rounded px-4 py-2 focus:border-red-500 outline-none"
          placeholder="Country"
          name="country"
          value={form.country}
          required
          onChange={handleChange}
        />
        <input
          className="border border-gray-300 rounded px-4 py-2 focus:border-red-500 outline-none"
          placeholder="Email"
          name="email"
          type="email"
          value={form.email}
          required
          onChange={handleChange}
        />
        <input
          className="border border-gray-300 rounded px-4 py-2 focus:border-red-500 outline-none"
          placeholder="Phone"
          name="phone"
          value={form.phone}
          required
          onChange={handleChange}
        />
        <button
          className={`w-full py-2 px-6 rounded-md text-white font-semibold transition ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
          disabled={loading}
          onClick={handlePayNow}
          type="button"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        {result && !result.success && (
          <div
            className={`mt-2 p-3 rounded bg-red-50 text-red-700`}
          >
            <strong>Order Failed:</strong>
            <br />
            {renderError(result.error)}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyNowComponent;
