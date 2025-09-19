"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, ShoppingCart } from "lucide-react";
import Loading from "./Loading";
import { toast } from "sonner";
import { cartType, cartProductType } from "@/type/cartType";
import { motion } from "framer-motion";
import { useCart } from "@/context/cartContext";
import { useCartActions } from "@/hooks/useCartActions";

export default function Cart() {
  const { cart } = useCart();
  const { removeProductFromCart, updateProductQuantity, clearCart } = useCartActions();
  const [removeDisable, setRemoveDisable] = useState(false);
  const [updatingProduct, setUpdatingProduct] = useState<string | null>(null);
  const [clearAllCart, setClearAllCart] = useState(false);

  if (!cart) {
    return <Loading />;
  }

  async function deleteUserCart(id: string) {
    setRemoveDisable(true);
    try {
      await removeProductFromCart(id);
    } catch (err) {
      console.error(err);
    } finally {
      setRemoveDisable(false);
    }
  }

  async function updateCartUser(id: string, count: number) {
    if (count < 1) return;
    setUpdatingProduct(id);

    try {
      await updateProductQuantity(id, count);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingProduct(null);
    }
  }

  async function clearAllCartActions() {
    setClearAllCart(true);
    try {
      console.log("=== CLEAR CART DEBUG ===");
      const result = await clearCart();
      console.log("Clear cart result:", result);
    } catch (err) {
      console.error("Clear cart error:", err);
    } finally {
      setClearAllCart(false);
    }
  }

  const isEmpty = cart.data.products.length === 0;

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex flex-col items-center">
      <h2 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 drop-shadow-lg">
        🛒 My Cart
      </h2>
      {isEmpty ? (
        // 🛒 Cart Empty State with Animation
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="mb-6 p-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg"
          >
            <ShoppingCart size={80} className="text-white" />
          </motion.div>

          <h3 className="text-2xl font-bold text-gray-700 mb-3">
            Your Cart is Empty
          </h3>
          <p className="text-gray-500 mb-6">
            Looks like you haven’t added anything yet.
          </p>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl text-white bg-gradient-to-r from-purple-600 to-blue-600 
                       hover:scale-105 hover:shadow-2xl transition-transform duration-300 font-semibold"
          >
            🚀 Go To Shop
          </Link>
        </div>
      ) : (
        <>
          {/* products */}
          <div className="space-y-4">
            {cart.data.products.map((item: cartProductType) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="w-28 h-28 object-cover rounded-lg transform group-hover:scale-105 transition duration-300"
                />

                <div className="flex-1 px-0 sm:px-4 mt-3 sm:mt-0 text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-700 line-clamp-2">
                    {item.product.title}
                  </h3>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>

                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <button
                    onClick={() =>
                      updateCartUser(item.product.id, item.count - 1)
                    }
                    disabled={
                      item.count <= 1 || updatingProduct === item.product.id
                    }
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 
                               rounded-full text-lg font-bold transition 
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>

                  <span className="text-gray-800 font-semibold">
                    {item.count}
                  </span>

                  <button
                    onClick={() =>
                      updateCartUser(item.product.id, item.count + 1)
                    }
                    disabled={updatingProduct === item.product.id}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 
                               rounded-full text-lg font-bold transition 
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>

                  <button
                    onClick={() => deleteUserCart(item.product.id)}
                    disabled={removeDisable}
                    className="ml-2 text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* total */}
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white flex justify-between items-center shadow-lg">
            <span className="text-lg sm:text-xl font-semibold">Total</span>
            <span className="text-xl sm:text-2xl font-bold">
              ${cart.data.totalCartPrice}
            </span>
          </div>

          {/* buttons */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              type="button"
              className="relative w-full p-4 rounded-xl text-white flex justify-between items-center shadow-lg 
                 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600
                 transition-all duration-500 ease-out 
                 hover:scale-105 hover:shadow-2xl overflow-hidden group"
              onClick={clearAllCartActions}
              disabled={clearAllCart}
            >
              <span className="relative z-10 text-lg sm:text-xl font-semibold tracking-wide">
                Clear All Products
              </span>
              <span className="relative z-10 text-2xl font-bold">
                <i className="fa-solid fa-trash fa-bounce"></i>
              </span>
            </button>

            <Link
              href={`/checkout/${cart.data._id}`}
              className="relative w-full p-4 rounded-xl text-white flex justify-between items-center shadow-lg 
                 bg-gradient-to-r from-green-600 via-teal-600 to-blue-600
                 transition-all duration-500 ease-out 
                 hover:scale-105 hover:shadow-2xl overflow-hidden group"
            >
              <span className="relative z-10 text-lg sm:text-xl font-semibold tracking-wide">
                Checkout Payment
              </span>
              <span className="relative z-10 text-2xl font-bold">
                <i className="fa-solid fa-credit-card fa-shake"></i>
              </span>
            </Link>

            <Link
              href={`/chekoutCash/${cart.data._id}`}
              className="relative w-full p-4 rounded-xl text-white flex justify-between items-center shadow-lg 
                 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600
                 transition-all duration-500 ease-out 
                 hover:scale-105 hover:shadow-2xl overflow-hidden group"
            >
              <span className="relative z-10 text-lg sm:text-xl font-semibold tracking-wide">
                Checkout Cash
              </span>
              <span className="relative z-10 text-2xl font-bold">
                <i className="fa-solid fa-wallet fa-bounce"></i>
              </span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
