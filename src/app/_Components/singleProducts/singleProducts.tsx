// src/app/_Components/SingleProducts.tsx
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { profuctType } from "../../../type/product.type";
import AddBtn from "../addBtn/addBtn";
import { Heart } from "lucide-react";
import addWishlist from "@/api/wishlist/wishlist.api";
import removeWishlist from "@/api/wishlist/removeWshlist";

export default function SingleProducts({
  product,
}: {
  product: profuctType & { priceAfterDiscount?: number };
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleWishlist = async () => {
    try {
      setLoading(true);
      if (isFavorite) {
        await removeWishlist(product._id);
        setIsFavorite(false);
      } else {
        await addWishlist(product._id);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("❌ Wishlist toggle error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      {/* زرار القلب */}
      <button
        onClick={handleWishlist}
        disabled={loading}
        className="absolute top-3 right-3 z-20 bg-white p-2 rounded-full shadow hover:scale-110 transition-transform"
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isFavorite ? "text-red-500 fill-red-500" : "text-gray-500"
          }`}
        />
      </button>

      {/* اللينك يشمل الصورة والتفاصيل */}
      <Link href={`/products/${product._id}`}>
        <div className="relative h-56 bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer">
          <img
            src={product.imageCover}
            alt={product.title}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.priceAfterDiscount && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              -
              {Math.round(
                (1 - product.priceAfterDiscount / product.price) * 100
              )}
              %
            </span>
          )}
        </div>

        <div className="p-5 space-y-3 cursor-pointer">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
            {product.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            {product.category?.name || "No category"}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            <div className="flex items-center space-x-1 text-yellow-400">
              {[...Array(Math.round(product.ratingsAverage || 0))].map(
                (_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.696h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.696l1.07-3.292z" />
                  </svg>
                )
              )}
            </div>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <AddBtn id={product._id} />
      </div>
    </div>
  );
}
