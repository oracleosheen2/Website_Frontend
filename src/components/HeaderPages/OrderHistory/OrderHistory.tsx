"use client";
import React, { useState } from "react";
import { Package, Truck, RefreshCw, FileText } from "lucide-react";
import Image from "next/image";

interface Order {
  id: string;
  productName: string;
  image: string;
  price: number;
  date: string;
  status: string;
  deliveryDate: string;
}

const OrderHistory: React.FC = () => {
  // 🧾 Dummy order data
  const [orders] = useState<Order[]>([
    {
      id: "ORD12345",
      productName: "Elegant Pink Handbag",
      image:
        "https://images.unsplash.com/photo-1593032457860-8c74b6df6e0c?w=500&q=80",
      price: 1499,
      date: "25 Oct 2025",
      status: "Delivered",
      deliveryDate: "28 Oct 2025",
    },
    {
      id: "ORD67890",
      productName: "Golden Designer Heels",
      image:
        "https://images.unsplash.com/photo-1606813902741-9b94c7e6f973?w=500&q=80",
      price: 2399,
      date: "29 Oct 2025",
      status: "Shipped",
      deliveryDate: "Expected by 5 Nov 2025",
    },
    {
      id: "ORD11223",
      productName: "Stylish Pink Kurti Set",
      image:
        "https://images.unsplash.com/photo-1618354691420-90afa9d7e1e6?w=500&q=80",
      price: 999,
      date: "1 Nov 2025",
      status: "Processing",
      deliveryDate: "Will update soon",
    },
  ]);

  // ✅ Type-safe function parameters
  const handleTrack = (id: string) => alert(`Tracking order: ${id}`);
  const handleInvoice = (id: string) => alert(`Downloading invoice for: ${id}`);
  const handleReturn = (id: string) => alert(`Return request for: ${id}`);

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 py-12 px-4 flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">
          My Orders 🛍️
        </h1>
        <p className="text-gray-600 text-lg">
          View, track, and manage all your past orders in one place.
        </p>
      </div>

      <div className="w-full max-w-5xl space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between border-l-4 border-pink-500 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4 w-full md:w-2/3">
              <Image
                src={order.image}
                alt={order.productName}
                className="w-24 h-24 object-cover rounded-xl border border-pink-100"
                width={200}
                height={200}
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {order.productName}
                </h3>
                <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                <p className="text-sm text-gray-500">
                  Ordered on: {order.date}
                </p>
                <p
                  className={`text-sm font-medium mt-1 ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Shipped"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                >
                  {order.status} • {order.deliveryDate}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3 mt-4 md:mt-0">
              <span className="text-xl font-semibold text-pink-600">
                ₹{order.price}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleTrack(order.id)}
                  className="flex items-center gap-1 bg-pink-600 text-white px-3 py-2 rounded-full text-sm hover:bg-pink-700 transition"
                >
                  <Truck size={16} /> Track
                </button>
                <button
                  onClick={() => handleInvoice(order.id)}
                  className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-3 py-2 rounded-full text-sm hover:scale-105 transition"
                >
                  <FileText size={16} /> Invoice
                </button>
                <button
                  onClick={() => handleReturn(order.id)}
                  className="flex items-center gap-1 bg-pink-100 text-pink-700 px-3 py-2 rounded-full text-sm hover:bg-pink-200 transition"
                >
                  <RefreshCw size={16} /> Return
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center text-gray-600 mt-16">
          <Package className="w-16 h-16 text-pink-400 mx-auto mb-3" />
          <p className="text-lg">You have no orders yet. Start shopping now!</p>
          <button className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700">
            Shop Now
          </button>
        </div>
      )}

    
    </div>
  );
};

export default OrderHistory;
