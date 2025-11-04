"use client";
import Image from "next/image";
import React from "react";
import { Product } from "./ProductListing";
import Link from "next/link";

interface ProductsProps {
  products: Product[];
  sortOption: string;
  onSortChange: (option: string) => void;
  totalProducts: number;
  allProductsCount: number;
}

const Products: React.FC<ProductsProps> = ({
  products,
  sortOption,
  onSortChange,
  totalProducts,
  allProductsCount,
}) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-sm ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
        <span className="text-gray-500 text-xs ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="w-full p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <p className="text-gray-600 text-sm">
            Showing <span className="font-semibold">{totalProducts}</span> of{" "}
            <span className="font-semibold">{allProductsCount}</span> products
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="sort-select" className="text-gray-700 text-sm">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all cursor-pointer w-48"
          >
            <option value="newest">New Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">😔</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 text-sm">
            Try adjusting your filters to find more products.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full h-64 bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={false}
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {item.isNew && (
                    <span className="bg-black text-white px-2 py-1 rounded text-xs font-medium">
                      NEW
                    </span>
                  )}
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                    20% OFF
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  aria-label="Add to Wishlist"
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Added to wishlist:", item.id);
                  }}
                >
                  <span className="text-lg">🤍</span>
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Brand */}
                <p className="text-xs text-gray-500 uppercase font-medium mb-1">
                  {item.brand}
                </p>

                {/* Product Name */}
                <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 h-10">
                  {item.name}
                </h3>

                {/* Rating */}
                <div className="mb-3">{renderStars(item.rating)}</div>

                {/* Price Section */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      Rs. {item.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      Rs. {(item.price * 1.2).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Gender Tags */}
                <div className="flex flex-wrap gap-1">
                  {item.gender.map((g) => (
                    <span
                      key={g}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
