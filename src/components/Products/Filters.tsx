"use client";
import React from "react";

interface FiltersProps {
  priceRange: number;
  setPriceRange: (value: number) => void;
  selectedGenders: string[];
  onGenderChange: (gender: string) => void;
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
  selectedSizes: string[];
  onSizeChange: (size: string) => void;
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  priceRange,
  setPriceRange,
  selectedGenders,
  onGenderChange,
  selectedBrands,
  onBrandChange,
  selectedSizes,
  onSizeChange,
  selectedCategories,
  onCategoryChange,
  onClearFilters,
}) => {
  const filters = ["Women", "Ladies", "Girls", "Babies"];
  const brands = [
    "H&M",
    "Mark & Spencer",
    "Victoria's Secret",
    "Dior",
    "Gucci",
    "Fendi",
    "Prada",
    "Versace",
    "Dolce & Gabbana",
    "Zara",
    "Chanel",
  ];

  const categories = [
    "Dresses",
    "Tops",
    "Lingerie & Lounge Wear",
    "Blouse",
    "Vintage",
  ];

  const sizes = ["Medium", "Large", "Plus Size", "Sexy Plus Size"];

  const hasActiveFilters =
    priceRange < 300 ||
    selectedGenders.length > 0 ||
    selectedBrands.length > 0 ||
    selectedSizes.length > 0 ||
    selectedCategories.length > 0;

  return (
    <div className="w-full md:w-1/4 lg:w-1/5 p-4 space-y-6 bg-white h-fit sticky top-4">
      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <button
            onClick={onClearFilters}
            className="text-red-600 font-semibold text-sm hover:text-red-800 transition-colors w-full text-center py-2 border border-red-300 rounded-lg hover:bg-red-100"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Prices */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-3 text-gray-800 text-lg">PRICES</h3>
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span className="font-medium">Range</span>
          <span className="font-semibold text-red-600">
            Rs. 120 - Rs. {priceRange}
          </span>
        </div>
        <input
          type="range"
          min={120}
          max={300}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-red-500 h-2 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Rs. 120</span>
          <span>Rs. 300</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-3 text-gray-800 text-lg">FILTERS</h3>
        <div className="space-y-3">
          {filters.map((item) => (
            <label
              key={item}
              className="flex items-center text-sm text-gray-700 hover:text-gray-900 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedGenders.includes(item)}
                onChange={() => onGenderChange(item)}
                className="mr-3 accent-red-500 w-4 h-4 transform group-hover:scale-110 transition-transform cursor-pointer"
              />
              <span className="group-hover:font-medium transition-all">
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-3 text-gray-800 text-lg">BRANDS</h3>
        <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center text-sm text-gray-700 hover:text-gray-900 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => onBrandChange(brand)}
                className="mr-3 accent-red-500 w-4 h-4 transform group-hover:scale-110 transition-transform cursor-pointer"
              />
              <span className="group-hover:font-medium transition-all">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-3 text-gray-800 text-lg">SIZE</h3>
        <div className="space-y-3">
          {sizes.map((size) => (
            <label
              key={size}
              className="flex items-center text-sm text-gray-700 hover:text-gray-900 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => onSizeChange(size)}
                className="mr-3 accent-red-500 w-4 h-4 transform group-hover:scale-110 transition-transform cursor-pointer"
              />
              <span className="group-hover:font-medium transition-all">
                {size}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-3 text-gray-800 text-lg">CATEGORIES</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center text-sm text-gray-700 hover:text-gray-900 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
                className="mr-3 accent-red-500 w-4 h-4 transform group-hover:scale-110 transition-transform cursor-pointer"
              />
              <span className="group-hover:font-medium transition-all">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
