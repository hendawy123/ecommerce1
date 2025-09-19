import React from "react";
import CatogorySwiper from "./_Components/MainSlayder/CatogorySwiper";
import Products from "./products/page";

export default async function Home() {
  return (
<>
  <div className="min-h-screen px-6 py-14 bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex flex-col items-center">
      
  {/* كلمة All Products أعلى الصفحة */}
  <div className="mb-2 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 drop-shadow-lg text-center">All Products</div>
      {/* العنوان */}
      <h1 className="relative text-5xl font-extrabold mb-10 group text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 drop-shadow-lg">
        <span className="inline-block relative z-10">Categories</span>
        <span className="absolute left-1/2 -bottom-3 w-60 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 -translate-x-1/2 rounded-full shadow-lg"></span>
        <span className="absolute left-1/2 -bottom-3 w-0 h-2 bg-white/40 -translate-x-1/2 rounded-full group-hover:animate-sweep"></span>
      </h1>

      {/* السلايدر */}
      <div className="w-full max-w-7xl">
        <CatogorySwiper />
      </div>
  <Products />
    </div>

    
</>
  );
}
