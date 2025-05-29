import React from "react";

const ProductCard = ({
  image,
  title,
  price,
  rating,
  onAddToCart,
  badgeText,
  badgeClass = "bg-black",
  onClick,           // accept onClick prop for the card click
}) => {
  return (
    <div
      onClick={onClick}   // make entire card clickable
      className="relative bg-gray-50 p-7 overflow-hidden group cursor-pointer
                 transition-shadow duration-400 ease-in-out
                 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15),0_15px_40px_rgba(0,0,0,0.1)] rounded-xl"
    >
      {/* Pinkish hover overlay covering entire card */}
      <div
        className="absolute inset-0 bg-pink-500 bg-opacity-10
                    scale-x-0 origin-center transition-transform duration-500
                    ease-cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-x-100 pointer-events-none z-[50]"
        style={{ transformOrigin: "center" }}
      ></div>

      {/* Badge rotated 90 degrees on left */}
      {badgeText && (
        <div
          className={`absolute z-50 top-5 left-1 rotate-90 text-white italic px-6 py-2 text-xs font-serif ${badgeClass} clip-polygon`}
          style={{
            clipPath:
              "polygon(100% 0%, 85% 50%, 100% 100%, 0 100%, 0% 50%, 0 0)",
            fontFamily: "'Droid Serif', serif",
          }}
        >
          {badgeText.toUpperCase()}
        </div>
      )}

      {/* Product image */}
      <div className="mb-4 product-thumb overflow-hidden rounded-md">
        <img
          src={image}
          alt={title}
          className="w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Product details */}
      <div className="product-details relative z-10">
        <h2
          className="text-xs font-normal uppercase font-montserrat mb-1
                       group-hover:text-pink-600 transition-colors duration-400 ease-in-out"
        >
          <a href="#">{title}</a>
        </h2>

        {/* Rating stars */}
        <div className="text-yellow-400 text-xl mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <i
              key={i}
              className={`fa fa-star ${
                i < rating ? "opacity-100" : "opacity-30"
              } transition-opacity duration-400 ease-in-out`}
            ></i>
          ))}
        </div>

        <span className="block text-black font-semibold text-lg mb-3">
          ${price}
        </span>

        {/* Add to cart button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent card click from triggering modal
            onAddToCart();
          }}
          className="border border-red-600 text-red-600 uppercase text-sm font-semibold py-2 px-5 rounded hover:bg-red-600 hover:text-white transition-colors duration-300 mx-auto block"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
