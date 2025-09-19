"use client";

import React from "react";
import { useCartActions } from "@/hooks/useCartActions";

export default function AddBtn({ id }: { id: string }) {
  const { addProductToCart } = useCartActions();

  async function chekAddProduct(productId: string) {
    console.log("=== ADD TO CART DEBUG ===");
    console.log("Product ID:", productId);
    try {
      const result = await addProductToCart(productId);
      console.log("Add to cart result:", result);
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  }

  return (
    <button
      onClick={() => chekAddProduct(id)}
      className="cursor-pointer w-full  relative inline-flex items-center justify-center px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold overflow-hidden transition-all duration-500 group-hover:shadow-lg"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
      <span className="relative z-10">Add to Cart 🛒</span>
    </button>
  );
}
