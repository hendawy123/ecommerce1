"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useCart } from "@/context/cartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const { cart } = useCart();
  const numberOfCartItems = cart?.data?.products
    ? cart.data.products.reduce((acc, item) => acc + item.count, 0)
    : 0;

  function handleLogout() {
    signOut({ callbackUrl: "/login" });
  }

  const links = [
    { href: "/", label: "Home", icon: "fa-solid fa-house" },
    { href: "/Categories", label: "Categories", icon: "fa-solid fa-list" },
    { href: "/Wishlist", label: "Wishlist", icon: "fa-solid fa-heart" },
    { href: "/products", label: "Products", icon: "fa-solid fa-box-open" },
    { href: "/brand", label: "Brand", icon: "fa-solid fa-tags" },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-400 to-red-400 shadow-lg sticky top-0 z-50">
  <div className="max-w-[100%] mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <a
            href="/"
            className="text-2xl font-extrabold text-white flex items-center gap-2 drop-shadow-lg"
          >
            <i className="fa-solid fa-store text-pink-200"></i> ShopNow
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-white font-medium">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-2 px-4 py-2 rounded-md transition duration-300 ${
                  pathname === link.href
                    ? "text-pink-200 font-semibold bg-pink-600/30 shadow-lg scale-105"
                    : "hover:bg-white/20 hover:text-yellow-200 hover:scale-110 hover:shadow-xl"
                }`}
              >
                <i className={link.icon}></i>
                <span>{link.label}</span>
              </a>
            ))}

            {/* Cart */}
            <button
              type="button"
              onClick={() => router.push("/Cart")}
              aria-label="Cart"
              className="relative flex items-center gap-3 px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-semibold shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            >
              <i className="fa-solid fa-cart-shopping text-lg"></i>
              <div className="flex flex-col leading-tight text-left">
                <span className="text-sm">Cart</span>
                <span className="text-xs opacity-90">Your items</span>
              </div>
                <span className="ml-3 relative inline-flex items-center justify-center w-7 h-7 rounded-full bg-white text-pink-500 font-bold shadow-md">
                <span
                  className={`absolute inset-0 rounded-full ${
                    numberOfCartItems > 0 ? "animate-pulse" : ""
                  }`}
                  style={{ opacity: 0.12 }}
                />
                <span className="relative z-10 text-sm">
                  {numberOfCartItems}
                </span>
              </span>
            </button>

            {/* User Greeting + Auth */}
            {session?.user ? (
              <div className="flex items-center gap-5">
                <div className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl cursor-pointer transition-all duration-500 hover:scale-110 hover:shadow-xl">
                  Hi, {session.user.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="group flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-md transition-all duration-300 hover:scale-110 hover:shadow-xl"
                >
                  <span>Logout</span>
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push("/login")}
                  className="px-5 py-2 rounded-lg border border-pink-400 text-pink-200 font-semibold hover:bg-pink-600 hover:text-white transition duration-300 hover:scale-110 hover:shadow-xl"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/regester")}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold hover:scale-110 transition duration-300 shadow-xl"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-yellow-200 focus:outline-none"
            >
              <i
                className={`fa-solid ${
                  menuOpen ? "fa-xmark" : "fa-bars"
                } text-2xl`}
              ></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden bg-gradient-to-r from-purple-500 via-pink-400 to-red-400 shadow-lg px-4 py-4 space-y-3"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition duration-300 ${
                  pathname === link.href
                    ? "text-pink-200 font-semibold bg-pink-600/30 shadow-lg scale-105"
                    : "hover:bg-white/20 hover:text-yellow-200 hover:scale-110 hover:shadow-xl"
                }`}
              >
                <i className={link.icon}></i>
                {link.label}
              </a>
            ))}

            {/* Mobile Cart */}
            <button
              onClick={() => router.push("/Cart")}
              className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-yellow-400 to-pink-400 text-white rounded-md shadow hover:scale-110 transition hover:shadow-xl"
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Cart ({numberOfCartItems})</span>
            </button>

            {session?.user ? (
              <>
                <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-md hover:scale-110 hover:shadow-xl transition duration-300">
                  Hi, {session.user.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-md hover:scale-110 hover:shadow-xl"
                >
                  <span>Logout</span>
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => router.push("/login")}
                  className="w-full px-4 py-2 rounded-lg border border-pink-400 text-pink-200 font-semibold hover:bg-pink-600 hover:text-white transition hover:scale-110 hover:shadow-xl"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/regester")}
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold hover:scale-110 transition shadow-xl"
                >
                  Register
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
