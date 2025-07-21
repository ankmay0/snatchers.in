import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../UI/ProductCard';
import { useNavigate } from 'react-router-dom';
import AnimatedHeading from '../UI/AnimatedHeading';

const placeholderImg = '/placeholder.png';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const cartData = Array.isArray(res.data)
        ? res.data.map((item) => item.product || item)
        : [];

      setCartItems(cartData);
    } catch (error) {
      console.error('Failed to fetch cart:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, { productId: product._id }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems((prev) => [...prev, product]);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleCartToggle = (product) => {
    const isInCart = cartItems.some((item) => item._id === product._id);
    isInCart ? removeFromCart(product._id) : addToCart(product);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-medium text-gray-600">
        Loading your cart...
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 py-6 min-h-screen bg-gray-50">
      <AnimatedHeading
        heading="Your Cart"
        subheading="Everything you're ready to grab!"
      />

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cartItems.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              image={product.images?.[0] || placeholderImg}
              title={product.title}
              price={product.price}
              rating={product.rating}
              isInCart={true}
              onAddToCart={() => handleCartToggle(product)}
              onRemoveFromCart={() => handleCartToggle(product)}
              showRemoveFromCart={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
