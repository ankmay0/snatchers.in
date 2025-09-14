// src/pages/Contact.jsx
import React from "react";
import { FaEnvelope, FaClock, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200 py-20 px-5 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="https://i.ibb.co/Mk7x8vnN/Screenshot-2025-09-09-234817.png" // 👉 replace with your logo file path
            alt="Snatchers Logo"
            className="h-28 w-auto"
          />
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Contact Us
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-12">
          💎 We’d Love to Hear from You! <br />
          Have a question about your order, need help choosing a gift, or want
          to create a custom jewellery piece? We’re here to assist you.
        </p>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8 text-left">
          <div className="flex items-start space-x-4">
            <FaEnvelope className="text-indigo-600 text-2xl mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
              <p className="text-gray-600">snatchers.shop@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FaClock className="text-indigo-600 text-2xl mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Support Hours
              </h3>
              <p className="text-gray-600">
                Monday – Saturday | 10 AM – 7 PM IST
              </p>
              <p className="text-sm text-gray-500">(We respond within 24 hours)</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FaInstagram className="text-pink-600 text-2xl mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Stay Connected
              </h3>
              <a
                href="https://www.instagram.com/snatchers.shop?igsh=MWNpcHM0NG50eXRsdg=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                instagram.com/snatchers.shop
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
