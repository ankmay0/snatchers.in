import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../UI/ProductCard";
import products from "../Data/ProductData.js";
import { AnimatePresence, motion } from "framer-motion";

const DateNight = () => {
  const [activeTab, setActiveTab] = useState("Date night");
  const navigate = useNavigate();

  // Map tab names to occasion strings used in product data
  const tabOccasionMap = {
    "Date night": "datenight",
    Heritage: "heritage",
    Wedding: "wedding",
    Gift: "gift",
  };

  // Filter products by active tab occasion and take first 4
  const filteredProducts = products
    .filter((p) => p.occasion.includes(tabOccasionMap[activeTab]))
    .slice(0, 4);

  const descriptions = {
    "Date night": "Curated picks to make your evening unforgettable.",
    Heritage: "Celebrate timeless heritage with these exclusive picks.",
    Wedding: "Elegant gifts to mark the beginning of forever.",
    Gift: "Handpicked surprises for every kind of love.",
  };

  const handleAddToCart = (product) => alert(`Added "${product.title}" to cart!`);
  const handleWishlist = (product) => alert(`Added "${product.title}" to wishlist!`);
  const handleCompare = (product) => alert(`Added "${product.title}" to compare!`);

  return (
    <div className="date-night-products max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title */}
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

      {/* Description */}
      <motion.p
        key={activeTab + "-desc"}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center text-sm sm:text-base text-gray-500 italic mb-6 sm:mb-8"
      >
        {descriptions[activeTab]}
      </motion.p>

      {/* Decorative Line */}
      <div className="flex justify-center items-center mb-4 sm:mb-6">
        <img
          src="./title-line.png"
          alt="Decorative underline"
          className="h-4 sm:h-6 md:h-8 lg:h-10 max-w-full object-contain"
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center items-center gap-3 mb-6 px-2">
        {["Date night", "Heritage", "Wedding", "Gift"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 border-b-2 transition text-sm font-medium ${
              activeTab === tab
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-500 hover:text-red-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Products */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + "-products"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') navigate(`/product/${product.id}`); }}
            >
              <ProductCard
                image={product.images[0]}
                title={product.title}
                price={`$${product.price}`}
                rating={product.rating}
                onAddToCart={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                onWishlist={(e) => {
                  e.stopPropagation();
                  handleWishlist(product);
                }}
                onCompare={(e) => {
                  e.stopPropagation();
                  handleCompare(product);
                }}
              />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DateNight;
