
"use client";
import React, { useEffect, useState } from "react";
import getProducts from "@/api/products_api/Products.Api";
import SingleProducts from "../_Components/singleProducts/singleProducts";
import Loading from "./Loading";
import { profuctType } from "@/type/product.type";
export default function Products() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  getProducts().then((res) => {
    setData(res); 
    setLoading(false);
  });
}, []);


  if (loading) return <Loading />;

  return (
    <div className="min-h-screen px-4 py-16 bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex flex-col items-center">
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data.map((currantproduct : profuctType) => (
          <SingleProducts key={currantproduct._id} product={currantproduct} />
        ))}
      </div>
    </div>
  );
}
