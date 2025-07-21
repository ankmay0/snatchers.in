import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../UI/ProductCard";
import { motion } from "framer-motion";
import axios from "axios";
import { getAuth } from "firebase/auth";

const Mens = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const placeholderImg =
    "https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const idToken = await user.getIdToken();
        setToken(idToken);

        const [productsRes, wishlistRes, cartRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist`, {
            headers: { Authorization: `Bearer ${idToken}` },
          }),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, {
            headers: { Authorization: `Bearer ${idToken}` },
          }),
        ]);

        setProducts(productsRes.data);

        const wishlistedIds = wishlistRes.data.map((item) =>
          typeof item === "object" && item.productId
            ? item.productId._id || item.productId
            : item._id || item
        );
        setWishlist(wishlistedIds);

        const cartIds = cartRes.data.map((item) => item.product._id);
        setCart(cartIds);
      } catch (err) {
        console.error("Error fetching men's data:", err);
      }
    };

    fetchData();
  }, []);

  const toggleWishlist = async (e, productId) => {
    e?.stopPropagation?.();
    if (!token) return;

    const isWishlisted = wishlist.includes(productId);
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/wishlist/${productId}`;

    try {
      if (isWishlisted) {
        await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist((prev) => prev.filter((id) => id !== productId));
      } else {
        await axios.post(url, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist((prev) => [...prev, productId]);
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };

  const toggleCart = async (e, productId) => {
    e?.stopPropagation?.();
    if (!token) return;

    const isInCart = cart.includes(productId);
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/cart/${productId}`;

    try {
      if (isInCart) {
        await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart((prev) => prev.filter((id) => id !== productId));
      } else {
        await axios.post(url, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart((prev) => [...prev, productId]);
      }
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  const mensProducts = products.filter(
    (product) => product.category?.toLowerCase() === "men"
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                price={product.price}
                rating={product.rating}
                badgeText={product.badgeText}
                badgeClass={product.badgeClass}
                wishlisted={wishlist.includes(product._id)}
                isInCart={cart.includes(product._id)} // ✅ Cart state
                onToggleWishlist={(e) => toggleWishlist(e, product._id)}
                onAddToCart={(e) => toggleCart(e, product._id)}
                onRemoveFromCart={(e) => toggleCart(e, product._id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mens;
