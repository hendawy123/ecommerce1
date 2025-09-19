"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import Link from "next/link";
import getAllBrand from "@/api/getAllBrand/getAllBrand";

export default function Brand() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function getBrandss() {
    setLoading(true);
    const res = await getAllBrand();
    setBrands(res?.data || []);
    setLoading(false);
  }

  useEffect(() => {
    getBrandss();
  }, []);

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex flex-col items-center">
      {/* Title with reload */}
      <div className="flex justify-between items-center mb-8 w-full max-w-5xl">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 drop-shadow-lg">
          ✨ All Brands
        </h1>
        <button
          onClick={getBrandss}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
        >
          <motion.div
            animate={loading ? { rotate: 360 } : { rotate: 0 }}
            transition={{ repeat: loading ? Infinity : 0, duration: 1 }}
          >
            <RotateCcw size={20} />
          </motion.div>
          Reload
        </button>
      </div>

      {/* Brands Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AnimatePresence>
          {brands.map((brand, i) => (
            <Link href={`/brand/${brand._id}`} key={brand._id}>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.7, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: 50 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 border rounded-2xl bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center"
              >
                <motion.img
                  src={brand.image}
                  alt={brand.name}
                  className="w-24 h-24 object-contain mb-4"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.span
                  className="font-semibold text-gray-700"
                  whileHover={{ scale: 1.1 }}
                >
                  {brand.name}
                </motion.span>
              </motion.div>
            </Link>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
