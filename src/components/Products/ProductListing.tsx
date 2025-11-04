"use client";
import React, { useState, useMemo } from "react";
import Products from "./Products";
import Filters from "./Filters";
import CommonPageHeader from "../CommonPages/CommonPageHeader";
import { allProducts } from "@/utils/products";

// Review interface define karein
export interface Review {
  name: string;
  comment: string;
  rating: number;
  date: string;
  avatar: string;
}

// Product interface
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  gender: string[];
  isNew: boolean;
  rating: number;
  size?: string[];
  color?: string[];
  description?: string;
  reviews?: Review[];
  // Additional fields for features
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

const ProductListing: React.FC = () => {
  // Filter states
  const [priceRange, setPriceRange] = useState<number>(300);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("New Arrivals");

  // For mobile filter toggle
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Filter logic
  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      if (product.price > priceRange) return false;
      if (
        selectedGenders.length > 0 &&
        !selectedGenders.some((g) => product.gender.includes(g))
      )
        return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand))
        return false;
      if (
        selectedSizes.length > 0 &&
        !product.size?.some((s) => selectedSizes.includes(s))
      )
        return false;
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      )
        return false;

      return true;
    });

    switch (sortOption) {
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "New Arrivals":
        filtered.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      default:
        break;
    }

    return filtered;
  }, [
    priceRange,
    selectedGenders,
    selectedBrands,
    selectedSizes,
    selectedCategories,
    sortOption,
  ]);

  // Handlers
  const handleGenderChange = (gender: string) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSortChange = (option: string) => setSortOption(option);

  const clearAllFilters = () => {
    setPriceRange(300);
    setSelectedGenders([]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedCategories([]);
    setSortOption("New Arrivals");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <CommonPageHeader title="Products" subtitle="Home - Products" />

      {/* 🔘 Mobile Filter Toggle Button */}
      <div className="md:hidden border-b border-gray-200 flex justify-between items-center px-4  sticky top-0 z-20 py-2">
        <h2 className="text-lg font-semibold">All Products</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-black text-white text-sm rounded-lg"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-grow">
        {/* 🧭 Filters Section */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } md:block w-full md:w-1/4  md:sticky md:top-0 z-10 py-4`}
        >
          <div className="h-full min-h-screen">
            <Filters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedGenders={selectedGenders}
              onGenderChange={handleGenderChange}
              selectedBrands={selectedBrands}
              onBrandChange={handleBrandChange}
              selectedSizes={selectedSizes}
              onSizeChange={handleSizeChange}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              onClearFilters={clearAllFilters}
            />
          </div>
        </div>

        {/* 🛍️ Products Section */}
        <div className="flex-1 bg-gray-50">
          <Products
            products={filteredProducts}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            totalProducts={filteredProducts.length}
            allProductsCount={allProducts.length}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
