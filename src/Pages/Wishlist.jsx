import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
// import './Wishlist.css'; // If using custom styles
import { useNavigate } from 'react-router-dom';

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

      setWishlist(res.data.wishlist || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
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

      setWishlist(wishlist.filter((item) => item._id !== productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) return <div className="text-center mt-10 text-lg">Loading your wishlist...</div>;

  return (
    <div className="p-4 sm:p-8 bg-white min-h-screen">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 relative"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg cursor-pointer"
                onClick={() => navigate(`/product/${item._id}`)}
              />
              <div className="mt-4">
                <h3
                  className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600"
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">₹{item.price}</p>
                <p className="text-sm text-yellow-500 mt-1">⭐ {item.rating}</p>
              </div>
              <button
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                onClick={() => removeFromWishlist(item._id)}
              >
                <AiFillHeart size={24} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
