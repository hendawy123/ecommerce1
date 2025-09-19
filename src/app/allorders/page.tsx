"use client";

import React, { useEffect, useState } from "react";
import getAllOrders from "@/api/getAllOrders/getAllOreders";

type Order = {
  id: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  createdAt: string;
  isPaid: boolean;
};

export default function PAGE() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await getAllOrders();
        setOrders(res?.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold">
        Loading your orders...
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-bold text-gray-500">
        🚀 You have no orders yet
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 drop-shadow-lg text-center">🛍 My Orders</h1>
      <div className="w-full max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-2xl p-6 border 
                       hover:shadow-2xl hover:scale-105 
                       transition-transform duration-300 ease-out cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2">
              Order #{order.id}
            </h2>
            <p className="text-gray-600">
              <span className="font-medium">Total:</span> ${order.totalOrderPrice}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Payment:</span>{" "}
              {order.paymentMethodType}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Date:</span>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p
              className={`mt-2 font-bold ${
                order.isPaid ? "text-green-600" : "text-red-500"
              }`}
            >
              {order.isPaid ? "✅ Paid" : "❌ Not Paid"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
