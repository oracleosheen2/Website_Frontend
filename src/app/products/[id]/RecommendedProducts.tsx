"use client";
import Link from "next/link";
import Image from "next/image";
import { allProducts } from "@/utils/products";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  size?: string[];
  gender: string[];
  isNew: boolean;
  rating: number;
  color?: string[];
  description?: string;
  reviews?: Review[];
  features?: {
    freeShipping: boolean;
    returns: string;
    warranty: string;
    authentic: boolean;
  };
  shippingInfo?: {
    delivery: string;
    returnPolicy: string;
    securePayment: boolean;
  };
}

interface Review {
  name: string;
  comment: string;
  rating: number;
  date: string;
  avatar: string;
}

interface RecommendedProductsProps {
  currentId: number;
  category: string;
}

export default function RecommendedProducts({
  currentId,
  category,
}: RecommendedProductsProps) {
  // Filter related products by category and exclude current product
  const related = allProducts
    .filter((p) => p.category === category && p.id !== currentId)
    .slice(0, 4);

  if (related.length === 0) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={`text-xs ${
          index < Math.floor(rating)
            ? "text-yellow-500"
            : index === Math.floor(rating) && rating % 1 >= 0.5
            ? "text-yellow-300"
            : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

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
          {related.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-pink-100 relative"
            >
              <Link href={`/products/${product.id}`}>
                {/* Product Image */}
                <div className="relative w-full h-44 md:h-56 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      {product.isNew && (
                        <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Discount Badge */}
                    <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      -20%
                    </div>
                  </div>

                  {/* Bottom Features Badges */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                    {product.features?.freeShipping && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                        🚚 Free
                      </span>
                    )}
                    {product.features?.authentic && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                        ✓ Authentic
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col items-start">
                  {/* Brand */}
                  <p className="text-xs text-blue-600 font-semibold mb-1">
                    {product.brand}
                  </p>

                  {/* Product Name */}
                  <p className="font-semibold text-gray-800 text-sm md:text-base mb-1 group-hover:text-pink-600 transition-colors line-clamp-2">
                    {product.name}
                  </p>

                  {/* Category & Gender */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    {product.gender.slice(0, 2).map((gen) => (
                      <span
                        key={gen}
                        className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                      >
                        {gen}
                      </span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-gray-600">
                      {product.rating}/5
                    </span>
                    {product.reviews && product.reviews.length > 0 && (
                      <span className="text-xs text-gray-400">
                        ({product.reviews.length})
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between w-full">
                    <div className="space-y-1">
                      <p className="font-bold text-pink-600 text-lg">
                        ₹{product.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 line-through">
                        ₹{(product.price * 1.2).toFixed(2)}
                      </p>
                    </div>

                    {/* Quick Features */}
                    <div className="flex flex-col items-end space-y-1">
                      {product.features?.warranty && (
                        <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                          {product.features.warranty}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Available Colors */}
                  {product.color && product.color.length > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-xs text-gray-500">Colors:</span>
                      <div className="flex gap-1">
                        {product.color.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-3 h-3 rounded-full border border-gray-300"
                            style={{ backgroundColor: color.toLowerCase() }}
                            title={color}
                          />
                        ))}
                        {product.color.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{product.color.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Available Sizes */}
                  {product.size && product.size.length > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-gray-500">Sizes:</span>
                      <div className="flex gap-1">
                        {product.size.slice(0, 3).map((size, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-700 px-1 rounded"
                          >
                            {size}
                          </span>
                        ))}
                        {product.size.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{product.size.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Quick View Description */}
                  {product.description && (
                    <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                      {product.description.substring(0, 60)}...
                    </p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {related.length >= 4 && (
          <div className="text-center mt-8">
            <Link
              href={`/products`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              View All {category} Products
              <span className="text-lg">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
