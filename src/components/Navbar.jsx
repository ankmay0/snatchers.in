import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaShoppingBag,
  FaTrashAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaHeart,
} from 'react-icons/fa';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY < 20) {
        setShowMobileSearch(true);
      } else if (window.scrollY > lastScrollY) {
        setShowMobileSearch(false); // scrolling down
      } else {
        setShowMobileSearch(true); // scrolling up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-8 xl:top-8 sm:top-10 left-0 w-full bg-white shadow-md z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img
                src="/logo-black.png"
                alt="Logo"
                className="h-10 w-auto max-w-full sm:h-8 lg:h-[4rem]"
              />
            </a>

            {/* Search Bar - Desktop Only */}
            <div className="hidden lg:flex flex-1 mx-6">
              <div className="bg-white border-2 border-black rounded-full flex items-center px-4 py-2 shadow-md max-w-xl mx-auto w-full">
                <FaSearch className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full outline-none text-sm bg-transparent placeholder-gray-500"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-3 text-gray-600">
              <button className="hover:text-indigo-600">
                <FaHeart />
              </button>

              <div className="relative group">
                <button className="relative hover:text-indigo-600">
                  <FaShoppingBag />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                    3
                  </span>
                </button>
                <div className="absolute right-0 mt-3 w-80 bg-white border shadow-lg p-4 hidden group-hover:block z-50">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 mb-4">
                      <img
                        src={`/assets/img/product-${i + 1}.jpg`}
                        alt="Product"
                        className="w-12 h-12 object-cover"
                      />
                      <div>
                        <h2 className="text-sm font-medium">
                          Product Name {i + 1}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {3 - i} × ₹{(i + 1) * 50}
                        </p>
                      </div>
                      <button>
                        <FaTrashAlt className="text-red-500" />
                      </button>
                    </div>
                  ))}
                  <a
                    href="/checkout.html"
                    className="block w-full text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                  >
                    Checkout
                  </a>
                </div>
              </div>

              <a href="/profile" className="hover:text-indigo-600">
                <FaUser />
              </a>

              {/* Hamburger Button */}
              <button
                className="lg:hidden text-2xl text-gray-700 z-40 transition-transform duration-300 transform hover:scale-110"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* Search Bar - Mobile Only (Visible only at top) */}
          {showMobileSearch && (
            <div className="block lg:hidden mt-4 transition-opacity duration-300">
              <div className="bg-white border-2 border-black rounded-full flex items-center px-4 py-2 shadow-md mx-auto max-w-md">
                <FaSearch className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full outline-none text-sm bg-transparent placeholder-gray-500"
                />
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="hidden lg:flex justify-center mt-4 space-x-8 text-gray-700 text-sm font-medium">
            <a href="/" className="hover:text-indigo-600">
              Home
            </a>
            <a href="/shop" className="hover:text-indigo-600">
              Shop
            </a>
            <a href="/mens" className="hover:text-indigo-600">
              Men
            </a>
            <a href="/womens" className="hover:text-indigo-600">
              Women
            </a>
            <a href="/about" className="hover:text-indigo-600">
              Contact Us
            </a>
          </nav>
        </div>
      </header>

      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-semibold text-gray-800">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <FaTimes className="text-gray-700 text-xl hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4 text-gray-700 text-sm font-medium">
          <a href="/" className="hover:text-indigo-600">
            Home
          </a>
          <a href="/shop" className="hover:text-indigo-600">
            Shop
          </a>
          <a href="/mens" className="hover:text-indigo-600">
            Men
          </a>
          <a href="/womens" className="hover:text-indigo-600">
            Women
          </a>
          <a href="/about" className="hover:text-indigo-600">
            Contact Us
          </a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
