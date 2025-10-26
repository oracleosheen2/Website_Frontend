"use client";
import Link from "next/link";
import Image from "next/image";
import { allProducts } from "../data";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  size: string[];
  gender: string[];
  isNew: boolean;
  rating: number;
}

interface RecommendedProductsProps {
  currentId: number;
  category: string;
}

export default function RecommendedProducts({
  currentId,
  category,
}: RecommendedProductsProps) {
  const related = allProducts
    .filter((p) => p.category === category && p.id !== currentId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="py-12 px-4 md:px-10 bg-gradient-to-b from-gray-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            Recommended <span className="text-pink-500">Products</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Handpicked items you might love 💖
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
          {related.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-pink-100"
            >
              {/* Product Image */}
              <div className="relative w-full h-44 md:h-56 overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                />
                {p.isNew && (
                  <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    NEW
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col items-start">
                <p className="font-semibold text-gray-800 text-sm md:text-base mb-1 group-hover:text-pink-600 transition-colors">
                  {p.name}
                </p>
                <p className="text-sm text-gray-500 mb-2">{p.brand}</p>
                <div className="flex items-center justify-between w-full">
                  <p className="font-semibold text-pink-600">
                    ₹{p.price.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    {"★".repeat(Math.round(p.rating))}
                    {"☆".repeat(5 - Math.round(p.rating))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
