"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* دوائر متحركة في الخلفية */}
      <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse -top-10 -left-10"></div>
      <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse bottom-0 right-0"></div>

      {/* Spinner */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        <div className="absolute w-full h-full border-4 border-transparent border-t-white rounded-full animate-spin"></div>
        <div className="absolute w-12 h-12 border-4 border-transparent border-b-white rounded-full animate-spin-slow"></div>
      </div>

      {/* النص */}
      <h2 className="mt-8 text-white text-2xl font-bold tracking-widest animate-pulse">
        Loading your cart...
      </h2>

      {/* شرطة متحركة تحت النص */}
      <div className="mt-4 w-40 h-1 bg-white/30 rounded-full overflow-hidden">
        <div className="h-full w-1/3 bg-white animate-loading-bar"></div>
      </div>
    </div>
  );
}
