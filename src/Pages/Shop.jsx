import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../UI/ProductCard";
import { getAuth } from "firebase/auth";

const Shop = () => {
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
        console.error("Error fetching shop data:", err);
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
              wishlisted={wishlist.includes(product._id)}
              isInCart={cart.includes(product._id)} // ✅ Cart State
              onClick={() => navigate(`/product/${product._id}`)}
              onToggleWishlist={(e) => toggleWishlist(e, product._id)}
              onAddToCart={(e) => toggleCart(e, product._id)}
              onRemoveFromCart={(e) => toggleCart(e, product._id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;
