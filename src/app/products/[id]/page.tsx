// src/app/products/[id]/page.tsx
"use client";

import SelectedProduct from '@/api/products_api/SelectedProducts';
import AddBtn from '@/app/_Components/addBtn/addBtn';
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import addWishlist from '@/api/wishlist/wishlist.api';
import removeWishlist from '@/api/wishlist/removeWshlist';
import getRealtedP from '@/productCategoriseActions/related.Action';
import Link from 'next/link';

export default function ProductDetails(props: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const [product, setProduct] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function resolveParams() {
      const { id } = await props.params;
      setId(id);
    }
    resolveParams();
  }, [props.params]);

  useEffect(() => {
    if (!id) return;
    async function fetchData() {
      try {
        const data = await SelectedProduct(id);
        setProduct(data);

        if (data?.category?._id) {
          const related = await getRealtedP(data.category._id);
          const filtered = related.data.filter((p: any) => p._id !== id);
          setRelatedProducts(filtered);
        }
      } catch (err) {
        console.error("❌ Error fetching product or related:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleWishlist = async () => {
    if (!product) return;
    try {
      setLoadingFav(true);
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
      setLoadingFav(false);
    }
  };

  // 🎨 Loading Skeleton
  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="h-[400px] bg-gray-200 rounded-2xl"></div>
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-60 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-xl text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* تفاصيل المنتج */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
        {/* صورة المنتج */}
        <div className="relative group">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-[450px] object-contain rounded-2xl shadow-lg transform group-hover:scale-105 transition duration-500"
          />
          {product.priceAfterDiscount && (
            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
              Save {Math.round((1 - product.priceAfterDiscount / product.price) * 100)}%
            </span>
          )}
          <button
            onClick={handleWishlist}
            disabled={loadingFav}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            <Heart
              className={`w-6 h-6 ${
                isFavorite ? "text-red-500 fill-red-500" : "text-gray-500"
              }`}
            />
          </button>
        </div>

        {/* تفاصيل */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {product.title}
          </h1>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <p className="text-sm text-gray-500">
            Category:{" "}
            <span className="font-semibold text-blue-600">{product.category?.name}</span>
          </p>

          <div className="flex items-baseline gap-4">
            {product.priceAfterDiscount ? (
              <>
                <span className="text-3xl font-bold text-red-600">
                  ${product.priceAfterDiscount}
                </span>
                <span className="line-through text-gray-400">${product.price}</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {[...Array(Math.round(product.ratingsAverage || 0))].map((_, i) => (
                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.696h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.696l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 text-sm">{product.ratingsAverage || 0} / 5</span>
          </div>

          <AddBtn id={product._id} />
        </div>
      </div>

      {/* المنتجات المشابهة */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link
                key={item._id}
                href={`/products/${item._id}`}
                className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 p-4 transform hover:-translate-y-2 hover:scale-[1.02]"
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={item.imageCover}
                    alt={item.title}
                    className="h-40 w-full object-contain mb-3 transform group-hover:scale-110 transition duration-500"
                  />
                </div>
                <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-blue-600 transition">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.category?.name}</p>
                <p className="text-xl font-bold text-gray-900">${item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
