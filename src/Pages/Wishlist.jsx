import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../UI/ProductCard';
import { useNavigate } from 'react-router-dom';
import AnimatedHeading from '../UI/AnimatedHeading'; // Adjust path as needed

const placeholderImg = '/placeholder.png'; // Replace with your actual path if different

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWishlist(res.data);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const handleAddToCart = (product) => {
    console.log('Add to cart:', product);
    // Your cart logic here
  };

  const handleCompare = (product) => {
    console.log('Compare:', product);
    // Your compare logic here
  };

  const toggleWishlist = (productId) => {
    removeFromWishlist(productId); // Directly remove for now
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg font-medium text-gray-600">Loading your wishlist...</div>;
  }

  return (
    <div className="px-4 sm:px-8 py-6 min-h-screen bg-gray-50">
      <AnimatedHeading
        heading="Your Wishlist"
        subheading="All the products you love in one place."
      />

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard
              key={product._id}
              image={product.images?.[0] || placeholderImg}
              title={product.title}
              price={`₹${product.price}`}
              rating={product.rating}
              onAddToCart={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              onWishlist={(e) => {
                e.stopPropagation();
                toggleWishlist(product._id);
              }}
              onCompare={(e) => {
                e.stopPropagation();
                handleCompare(product);
              }}
              wishlisted={true}
              onToggleWishlist={() => toggleWishlist(product._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
