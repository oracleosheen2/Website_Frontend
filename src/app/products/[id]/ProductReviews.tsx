"use client";
import React from "react";
import { Star, StarOff } from "lucide-react";

const allReviews = [
  {
    productId: 1,
    name: "Riya Sharma",
    comment:
      "Absolutely gorgeous bracelet! The shine and build quality are amazing. Perfect for gifting!",
    rating: 5,
    date: "Oct 20, 2025",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    productId: 1,
    name: "Neha Patel",
    comment:
      "The product is really good, but delivery took a bit longer than expected.",
    rating: 4,
    date: "Oct 18, 2025",
    avatar: "https://i.pravatar.cc/100?img=45",
  },
  {
    productId: 1,
    name: "Sanya Verma",
    comment: "Love it! Looks premium and classy. Got lots of compliments 🩷",
    rating: 5,
    date: "Oct 15, 2025",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    productId: 2,
    name: "Aman Raj",
    comment: "Nice shine, worth every rupee. I’ll definitely buy again.",
    rating: 5,
    date: "Oct 10, 2025",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
];

interface ProductReviewsProps {
  productId: number;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const reviews = allReviews.filter((r) => r.productId === productId);

  return (
    <section className="bg-gradient-to-b from-pink-50 via-white to-yellow-50 py-12 px-4 md:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Customer <span className="text-pink-500">Reviews</span>
          </h2>
          <p className="text-gray-500 mt-2">
            See what our happy customers are saying about this product ✨
          </p>
        </div>

        {/* Reviews */}
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-lg border border-pink-100 rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top Section */}
                <div className="flex items-center mb-4">
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-12 h-12 rounded-full border-2 border-pink-400 mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{r.name}</p>
                    <p className="text-sm text-gray-400">{r.date}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, index) => (
                    <span key={index}>
                      {index < r.rating ? (
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
                      ) : (
                        <StarOff className="w-5 h-5 text-gray-300" />
                      )}
                    </span>
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-700 leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Write a Review CTA */}
        <div className="text-center mt-10">
          <button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
            Write a Review
          </button>
        </div>
      </div>
    </section>
  );
}
