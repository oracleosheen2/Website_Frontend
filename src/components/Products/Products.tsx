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
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-500">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-500">
          ☆
        </span>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ☆
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="w-full p-4 lg:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8 gap-4">
        <p className="text-sm lg:text-base text-gray-600">
          Showing <span className="font-semibold">{totalProducts}</span> out of{" "}
          <span className="font-semibold">{allProductsCount}</span> Products
        </p>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label
            htmlFor="sort-select"
            className="text-sm text-gray-600 whitespace-nowrap"
          >
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full sm:w-48 rounded-lg px-4 py-2 text-sm lg:text-base text-gray-700 bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer"
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
        <div className="text-center py-12 lg:py-16">
          <div className="text-gray-400 text-6xl lg:text-7xl mb-4">😔</div>
          <h3 className="text-lg lg:text-xl font-semibold text-gray-700 mb-3">
            No products found
          </h3>
          <p className="text-gray-500 text-sm lg:text-base max-w-md mx-auto">
            We couldn&rsquo;t find any products matching your criteria. Try
            adjusting your filters or search terms.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {products.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white hover:scale-105 group"
            >
              {/* Image Container */}
              <div className="relative w-full h-48 sm:h-56 lg:h-60 xl:h-64">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  priority={false}
                />

                {/* Wishlist Button */}
                <button
                  aria-label="Add to Wishlist"
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-all duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add wishlist logic here
                    console.log("Added to wishlist:", item.id);
                  }}
                >
                  <span className="text-lg">🤍</span>
                </button>

                {/* New Badge */}
                {item.isNew && (
                  <span className="absolute top-3 left-3 bg-black text-white px-2 py-1 rounded-full text-xs font-medium">
                    New
                  </span>
                )}

                {/* Discount Badge */}
                <span className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                  20% OFF
                </span>
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                {/* Category */}
                <p className="text-xs sm:text-sm text-gray-500 mb-1 uppercase tracking-wide font-medium">
                  {item.category}
                </p>

                {/* Product Name */}
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2 lg:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>

                {/* Price Section */}
                <div className="flex items-center justify-between mb-3">
                  <p className="text-lg sm:text-xl font-bold text-gray-900">
                    Rs. {item.price.toFixed(2)}
                  </p>
                  <p className="line-through text-gray-400 text-sm sm:text-base">
                    Rs. {(item.price * 1.2).toFixed(2)}
                  </p>
                </div>

                {/* Rating and Brand */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <div className="flex text-sm">
                      {renderStars(item.rating)}
                    </div>
                    <span className="text-gray-500 text-xs ml-1">
                      ({item.rating})
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">
                    {item.brand}
                  </span>
                </div>

                {/* Gender Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {item.gender.map((g) => (
                    <span
                      key={g}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium"
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
