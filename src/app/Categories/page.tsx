"use client";
import getAllCategorise from "@/api/getAllCategores/getAllCategorise";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function getAllCategory() {
    setLoading(true);
    const res = await getAllCategorise();
    setCategories(res || []);
    setLoading(false);
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <>
      <div className="max-w-6xl mx-auto mt-12 px-4">
      {/* كلمة Categories أعلى الصفحة */}
      <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 drop-shadow-lg text-center">Categories</h1>
      {/* Title with Reload */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          ✨ Explore Our Categories
        </h2>

        <motion.button
          onClick={getAllCategory}
          disabled={loading}
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300"
        >
          <motion.div
            animate={loading ? { rotate: 360 } : { rotate: 0 }}
            transition={{ repeat: loading ? Infinity : 0, duration: 1, ease: "linear" }}
          >
            <RotateCcw size={20} />
          </motion.div>
          {loading ? "Reloading..." : "Reload"}
        </motion.button>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-500 animate-pulse mb-6">
          Loading categories...
        </p>
      )}

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AnimatePresence>
          {categories.map((cat, i) => (
            <motion.div
              key={cat._id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.97 }}
              className="relative group p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden border border-gray-100"
            >
              {/* Gradient Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 blur-2xl rounded-2xl" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Image */}
                <motion.img
                  src={cat.image}
                  alt={cat.name}
                  className="w-24 h-24 object-contain mb-4"
                  whileHover={{ rotate: 10, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />

                {/* Name */}
                <motion.h2
                  className="text-lg font-semibold text-gray-700 group-hover:text-indigo-700 transition-colors"
                  whileHover={{ scale: 1.15 }}
                >
                  {cat.name}
                </motion.h2>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      </div>
    </>
  );
}
