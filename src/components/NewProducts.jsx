import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../UI/ProductCard";
import products from "../Data/ProductData.js"; // Use your full product data

const NewProducts = () => {
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    alert(`Added "${product.title}" to cart!`);
  };

  const handleQuickView = (product) => {
    alert(`Quick view for "${product.title}"`);
  };

  const handleWishlist = (product) => {
    alert(`Added "${product.title}" to wishlist!`);
  };

  const handleCompare = (product) => {
    alert(`Added "${product.title}" to compare!`);
  };

  // Use only first 4 products or customize as needed
  const displayedProducts = products.slice(0, 8);

  return (
<>
  <div className="date-night-products mt-0 max-w-10xl mx-auto px-6 py-10">
    <h1
      className="text-6xl mb-0 text-center text-gray-800 font-medium"
      style={{ fontFamily: "'Italiana', serif" }}
    >
      Just Arrived
    </h1>

    <p className="text-center text-gray-500 italic mb-10">
      Discover Our Latest Additions.
    </p>

    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {displayedProducts.map((product) => (
        <div
          key={product.id}
          onClick={() => navigate(`/product/${product.id}`)}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter") navigate(`/product/${product.id}`);
          }}
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
            onQuickView={(e) => {
              e.stopPropagation();
              handleQuickView(product);
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
    </div>
  </div>

  <img
    src="/men.jpg"
    alt="Decorative line"
    className="mx-auto my-0 mb-9 max-w-10xl w-full shadow-md object-cover"
  />
</>


  );
};

export default NewProducts;
