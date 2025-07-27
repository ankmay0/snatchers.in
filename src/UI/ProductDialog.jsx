import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";

const renderStars = (rating) => {
  const maxStars = 5;
  const filledStars = Math.round(rating);
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <span key={i} className="text-yellow-500 text-xl">
        {i <= filledStars ? "★" : "☆"}
      </span>
    );
  }
  return stars;
};

const ProductDialog = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/products/${productId}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Product not found:", err);
        setProduct(null);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product)
    return <div className="p-12 text-center text-lg">Product not found</div>;

  return (
    <div className="min-h-screen bg-white p-12 max-w-7xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-red-600 font-semibold mb-8 focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
        aria-label="Go back"
      >
        &larr; Back to Products
      </button>

      <div className="flex flex-col lg:flex-row gap-14">
        {/* Images */}
        <div className="w-full lg:w-1/2">
          <Swiper
            style={{ width: "100%", height: "520px" }}
            spaceBetween={20}
            navigation
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[Thumbs, Navigation]}
          >
            {product.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`Product image ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={16}
            slidesPerView={5}
            freeMode
            watchSlidesProgress
            modules={[Thumbs]}
            className="mt-6"
          >
            {product.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-28 object-cover rounded-md cursor-pointer border border-gray-300 hover:border-red-500 transition"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start">
          <h2 className="text-4xl sm:text-5xl font-semibold mb-6 text-red-600">
            {product.title}
          </h2>

          <p className="mb-4 text-2xl font-semibold text-gray-900">
            Price: ₹{product.price}
          </p>

          <div className="mb-8 flex items-center space-x-2">
            {renderStars(product.rating)}
          </div>

          <p className="mb-8 text-gray-700 text-lg leading-relaxed">
            {product.description}
          </p>

          {product.badgeText && (
            <span
              className={`inline-block max-w-fit px-5 py-3 text-md font-medium text-white rounded-md ${product.badgeClass} select-none`}
            >
              {product.badgeText}
            </span>
          )}

          {/* --- BUY NOW BUTTON --- */}
          <button
            className="mt-8 px-8 py-3 rounded-md bg-red-600 hover:bg-red-700 text-white text-lg font-semibold shadow transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={() => navigate(`/buy-now/${product._id}`)}
            type="button"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDialog;
