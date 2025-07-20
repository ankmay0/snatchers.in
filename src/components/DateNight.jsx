import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../UI/ProductCard";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; // ✅ Use context if available

const DateNight = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState("Gifts");
  const navigate = useNavigate();

  const { currentUser } = useAuth(); // ✅ Get user from context
  const userId = currentUser?.uid || "demo-user-123"; // fallback for testing
  const token = localStorage.getItem("token");

  const placeholderImg =
    "https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png";

  const tabOccasionMap = {
    Gifts: "gift",
    "Date night": "datenight",
    Traditional: "heritage",
    "Everyday Wear": "wedding",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/wishlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const productIds = res.data.map((p) => p._id);
        setWishlist(productIds);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };

    if (token) {
      fetchProducts();
      fetchWishlist();
    }
  }, [userId, token]);

  const filteredProducts = products
    .filter((p) => p.occasion?.includes(tabOccasionMap[activeTab]))
    .slice(0, 8);

  const descriptions = {
    "Date night": "Curated picks to make your evening unforgettable.",
    Traditional: "Celebrate timeless heritage with these exclusive picks.",
    "Everyday Wear": "Elegant gifts to mark the beginning of forever.",
    Gifts: "Handpicked surprises for every kind of love.",
  };

  const handleAddToCart = (product) =>
    alert(`Added "${product.title}" to cart!`);
  const handleCompare = (product) =>
    alert(`Added "${product.title}" to compare!`);

  const toggleWishlist = async (productId) => {
    const isWishlisted = wishlist.includes(productId);
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/wishlist/${productId}`;

    try {
      if (isWishlisted) {
        await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist((prev) => prev.filter((id) => id !== productId));
      } else {
        await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWishlist((prev) => [...prev, productId]);
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };

  return (
    <div className="date-night-products max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.h1
        key={activeTab + "-title"}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl sm:text-4xl lg:text-5xl mb-2 text-center text-gray-800 font-medium"
        style={{ fontFamily: "'Italiana', serif" }}
      >
        {activeTab} Specials
      </motion.h1>

      <motion.p
        key={activeTab + "-desc"}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center text-sm sm:text-base text-gray-500 mb-6 sm:mb-8"
      >
        {descriptions[activeTab]}
      </motion.p>

      <div className="flex justify-center items-center mb-4 sm:mb-6">
        <img
          src="./title-line.png"
          alt="Decorative underline"
          className="h-4 sm:h-6 md:h-8 lg:h-10 max-w-full object-contain"
        />
      </div>

      <div className="flex overflow-x-auto whitespace-nowrap justify-center items-center gap-2 sm:gap-4 md:gap-6 lg:gap-10 mb-6 px-0 scrollbar-hide">
        {["Everyday Wear", "Gifts", "Traditional", "Date night"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-1 py-1 border-2 rounded-xl p-2 transition text-xs sm:text-2xl md:text-3xl font-medium flex-shrink-0 ${
              activeTab === tab
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-red-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + "-products"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") navigate(`/product/${product._id}`);
              }}
            >
              <ProductCard
                image={product.images?.[0] || placeholderImg}
                title={product.title}
                price={`$${product.price}`}
                rating={product.rating}
                onAddToCart={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                onWishlist={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product._id);
                }}
                onCompare={(e) => {
                  e.stopPropagation();
                  handleCompare(product);
                }}
                wishlisted={wishlist.includes(product._id)}
                onToggleWishlist={() => toggleWishlist(product._id)}
              />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DateNight;
