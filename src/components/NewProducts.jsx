import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../UI/ProductCard";
import axios from "axios";
import { getAuth } from "firebase/auth";

const NewProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const placeholderImg =
    "https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png";

  useEffect(() => {

const fetchData = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    const token = user && (await user.getIdToken());

    const [productRes, wishlistRes] = await Promise.all([
      axios.get("http://localhost:5000/api/products"),
      axios.get("http://localhost:5000/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    const sorted = productRes.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setProducts(sorted.slice(0, 8));

    // Extract product IDs from wishlist response
    const wishlistedIds = wishlistRes.data.map((item) =>
      item.productId ? item.productId : item // depends on your backend response shape
    );
    setWishlist(wishlistedIds);
  } catch (err) {
    console.error("Error fetching products or wishlist:", err);
  }
};

    fetchData();
  }, []);

  const handleAddToCart = (product) =>
    alert(`Added "${product.title}" to cart!`);

  const handleQuickView = (product) =>
    alert(`Quick view for "${product.title}"`);

  const handleCompare = (product) =>
    alert(`Added "${product.title}" to compare!`);

  const toggleWishlist = async (productId) => {
    const isWishlisted = wishlist.includes(productId);

    try {
      if (isWishlisted) {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist/${productId}`);
        setWishlist((prev) => prev.filter((id) => id !== productId));
      } else {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist`, {
          productId,
        });
        setWishlist((prev) => [...prev, productId]);
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };

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
          {products.map((product) => (
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
                onToggleWishlist={() => toggleWishlist(product._id)}
                onAddToCart={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                onQuickView={(e) => {
                  e.stopPropagation();
                  handleQuickView(product);
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
