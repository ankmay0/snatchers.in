import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../UI/ProductCard";
import { useAuth } from "../contexts/AuthContext"; // ✅ Only if you use AuthContext

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // ✅ optional based on your setup
  const token = localStorage.getItem("token");

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

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const productIds = res.data.map((p) => p._id);
        setWishlist(productIds);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };

    fetchProducts();
    if (token) fetchWishlist();
  }, [token]);

  const handleAddToCart = (product) => {
    alert(`Added "${product.title}" to cart!`);
  };

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
        await axios.post(url, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist((prev) => [...prev, productId]);
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-red-600 text-center">
          Explore Our Collection
        </h2>
        <div className="w-24 h-1 bg-red-500 mx-auto mb-10 rounded-full" />

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              image={product.images?.[0] || placeholderImg}
              title={product.title}
              price={product.price}
              rating={product.rating}
              badgeText={product.badgeText}
              badgeClass={product.badgeClass}
              onAddToCart={() => handleAddToCart(product)}
              onWishlist={(e) => {
                e.stopPropagation();
                toggleWishlist(product._id);
              }}
              wishlisted={wishlist.includes(product._id)}
              onClick={() => navigate(`/product/${product._id}`)}
              onToggleWishlist={() => toggleWishlist(product._id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;
