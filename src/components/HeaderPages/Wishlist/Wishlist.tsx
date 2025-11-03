"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  FaHeartBroken,
  FaShoppingCart,
  FaTrash,
  FaHeart,
} from "react-icons/fa";

interface WishlistItem {
  id: number;
  name: string;
  price: string;
  image: string;
  inStock: boolean;
}

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Golden Designer Handbag",
      price: "₹1,899",
      image:
        "https://img.freepik.com/premium-photo/beautiful-golden-handbag-women-isolated-pink-background_76440-352.jpg",
      inStock: true,
    },
    {
      id: 2,
      name: "Pink Silk Saree",
      price: "₹2,999",
      image:
        "https://img.freepik.com/premium-photo/beautiful-indian-woman-wearing-silk-saree_75648-2786.jpg",
      inStock: true,
    },
    {
      id: 3,
      name: "Golden Heels",
      price: "₹1,499",
      image:
        "https://img.freepik.com/premium-photo/beautiful-golden-high-heels-shoes-pink-background_76440-248.jpg",
      inStock: false,
    },
  ]);

  const handleRemove = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const handleAddToCart = (name: string) => {
    alert(`${name} added to cart 🛒`);
  };

  const handleViewDetails = (name: string) => {
    alert(`Viewing details of ${name}`);
  };

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 py-10 px-4 sm:px-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-pink-700">
        My Wishlist <FaHeart className="inline ml-2 text-pink-600" />
      </h1>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-center border-b border-pink-100 pb-5 sm:pb-6"
            >
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded-xl border-2 border-yellow-400"
                />
                <div>
                  <h2 className="text-lg font-semibold text-pink-800">
                    {item.name}
                  </h2>
                  <p className="text-pink-600 font-semibold mt-1">
                    {item.price}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      item.inStock ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-4 sm:mt-0">
                <button
                  onClick={() => handleViewDetails(item.name)}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-xl text-sm font-semibold shadow-md hover:scale-105 transition-all"
                >
                  View
                </button>
                <button
                  disabled={!item.inStock}
                  onClick={() => handleAddToCart(item.name)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition-all ${
                    item.inStock
                      ? "bg-pink-600 hover:bg-pink-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FaShoppingCart className="inline mr-1" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="px-3 py-2 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-xl text-sm shadow-md transition-all"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-16">
            <FaHeartBroken className="text-4xl mx-auto mb-3 text-pink-400" />
            <p className="text-lg">Your wishlist is empty 💔</p>
            <button className="mt-5 bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 shadow-md">
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
