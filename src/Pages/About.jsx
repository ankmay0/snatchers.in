import React from "react";
import { motion } from "framer-motion";

const founders = [
  {
    name: "Abhijit Sahu",
    title: "Founder",
    description:
      "Abhijit Sahu brings critical startup experience and a relentless passion for innovation to Snatchers.in. Committed to exceptional product quality, he seeks to build trust and deliver jewelry that embodies timeless elegance for every customer.",
    imgSrc: "/abhijeet.jpg",
  },
  {
    name: "Ayush Gupta",
    title: "Co-Founder",
    description:
      "Ayush Gupta supports Snatchers.in with a robust background in startups and an unwavering focus on customer service. He is dedicated to ensuring that jewelry is not only meaningful but also accessible to all, shaping the brand’s inclusive vision.",
    imgSrc: "/Ayush.jpg",
  },
];

export default function About() {
  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
        >
          About <span className="text-red-600">Snatchers.in</span>
        </motion.h1>

        <p className="text-lg md:text-xl text-gray-700 mb-4">
          At <span className="font-semibold text-gray-900">Snatchers.in</span>,
          we believe that jewelry transcends gender boundaries. Our mission is
          to craft pieces that empower individuals to express their unique
          identities, free from traditional norms.
        </p>
        <p className="text-lg md:text-xl text-gray-700 mb-12">
          Founded in <span className="font-bold">2025</span>, Snatchers.in
          emerged from a vision to redefine jewelry as a medium of
          self-expression. Our collections blend timeless elegance with
          contemporary flair, ensuring that every piece resonates with
          authenticity and style.
        </p>

        {/* Philosophy */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
            Our Philosophy
          </h2>
          <ul className="text-left md:text-center space-y-4 text-gray-700 max-w-2xl mx-auto">
            <li>
              <span className="font-bold text-red-600">Inclusivity:</span>{" "}
              Designs that cater to all, celebrating diversity and individuality.
            </li>
            <li>
              <span className="font-bold text-red-600">Craftsmanship:</span>{" "}
              Meticulous attention to detail, ensuring each piece is a
              masterpiece.
            </li>
            <li>
              <span className="font-bold text-red-600">Sustainability:</span>{" "}
              Ethically sourced materials and eco-friendly practices at the core
              of our operations.
            </li>
          </ul>
        </div>

        {/* Founders */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-10">
            Meet Our Founders
          </h2>
          <div className="grid sm:grid-cols-2 gap-10">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition duration-300"
              >
                <img
                  src={founder.imgSrc}
                  alt={founder.name}
                  className="w-32 h-32 object-cover rounded-full border-4 border-indigo-100 shadow-md mb-5"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {founder.name}
                </h3>
                <span className="text-red-600 font-medium mb-3">
                  {founder.title}
                </span>
                <p className="text-gray-700 text-center leading-relaxed">
                  {founder.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
