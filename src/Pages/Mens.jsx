import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../UI/ProductCard";
import { motion } from "framer-motion";
import axios from "axios";

const Mens = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const placeholderImg =
    "https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    alert(`Added "${product.title}" to cart!`);
  };

  // Frontend filtering (only men's products)
  const mensProducts = products.filter(
    (product) => product.category?.toLowerCase() === "men"
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Image and Title */}
        <div className="relative mb-8 w-full">
          <img
            src="/men.jpg"
            alt="Men's Collection"
            className="w-full h-48 sm:h-64 md:h-80 lg:h-[28rem] xl:h-[32rem] object-cover object-center shadow-md"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/30">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-3xl sm:text-4xl lg:text-5xl mb-2 text-center text-white font-medium drop-shadow-lg"
              style={{ fontFamily: "'Italiana', serif" }}
            >
              Shop Our Men's Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center text-sm sm:text-base text-gray-200 italic mb-2 sm:mb-4 drop-shadow"
            >
              Bold Designs for the Modern Man.
            </motion.p>
            <img
              src="./title-line.png"
              alt="Decorative underline"
              className="h-4 sm:h-6 md:h-8 lg:h-10 max-w-full object-contain mb-2"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mensProducts.map((product) => (
            <ProductCard
              key={product._id}
              image={product.images?.[0] || placeholderImg}
              title={product.title}
              price={product.price}
              rating={product.rating}
              badgeText={product.badgeText}
              badgeClass={product.badgeClass}
              onAddToCart={() => handleAddToCart(product)}
              onClick={() => navigate(`/product/${product._id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mens;
// This code defines a React component