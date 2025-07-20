import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../UI/ProductCard";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CategoryShop = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const query = useQuery();

  const category = query.get("category");
  const occasion = query.get("occasion");

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

  const filteredProducts = products.filter((product) => {
    if (category) {
      return product.category === category;
    }
    if (occasion) {
      return product.occasion?.includes(occasion);
    }
    return true;
  });

  let headingText = "Shop";
  if (category) {
    headingText =
      category === "men"
        ? "Shop For Men"
        : category === "women"
        ? "Shop For Women"
        : `Shop For ${category}`;
  } else if (occasion) {
    headingText = `Shop For ${occasion.charAt(0).toUpperCase() + occasion.slice(1)}`;
  }

  const handleAddToCart = (product) => {
    alert(`Added "${product.title}" to cart!`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-3xl sm:text-4xl lg:text-6xl mb-5 text-center text-gray-800 font-medium"
          style={{ fontFamily: "'Italiana', serif" }}
        >
          {headingText}
        </h1>

        <div className="flex justify-center items-center mb-4 sm:mb-6">
          <img
            src="./title-line.png"
            alt="Decorative underline"
            className="h-4 sm:h-6 md:h-8 lg:h-10 max-w-full object-contain"
          />
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryShop;
