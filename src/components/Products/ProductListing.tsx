"use client";
import React, { useState, useMemo } from "react";
import Products from "./Products";
import Filters from "./Filters";
import CommonPageHeader from "../CommonPages/CommonPageHeader";
import { allProducts } from "@/utils/products";


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
}

const ProductListing: React.FC = () => {
  // Filter states
  const [priceRange, setPriceRange] = useState<number>(300);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("New Arrivals");

  // Filter products
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
    <div>
      <CommonPageHeader title="Products" subtitle="Home - Products" />
      <div className="flex flex-col md:flex-row min-h-screen">
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
        <Products
          products={filteredProducts}
          sortOption={sortOption}
          onSortChange={handleSortChange}
          totalProducts={filteredProducts.length}
          allProductsCount={allProducts.length}
        />
      </div>
    </div>
  );
};

export default ProductListing;
