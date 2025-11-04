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
    <div className="w-full   h-fit sticky ">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-red-600 font-medium hover:text-red-800 transition-colors cursor-pointer bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="p-5 space-y-8">
        {/* Prices */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 text-base border-b pb-2">
            Price Range
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span className="text-sm text-gray-600">Range:</span>
              <span className="text-sm font-semibold text-gray-900">
                ₹120 - ₹{priceRange}
              </span>
            </div>
            <input
              type="range"
              min={120}
              max={300}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
            />
            <div className="flex justify-between text-sm text-gray-600 font-medium">
              <span>₹120</span>
              <span>₹300</span>
            </div>
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 text-base border-b pb-2">
            Gender
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {filters.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 text-gray-700 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedGenders.includes(item)}
                    onChange={() => onGenderChange(item)}
                    className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2 cursor-pointer"
                  />
                </div>
                <span className="text-sm font-medium group-hover:text-red-600 transition-colors">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 text-base border-b pb-2">
            Brands
          </h3>
          <div className="space-y-3 ">
            {brands?.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-3 text-gray-700 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => onBrandChange(brand)}
                    className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2 cursor-pointer"
                  />
                </div>
                <span className="text-sm font-medium group-hover:text-red-600 transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 text-base border-b pb-2">
            Size
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {sizes.map((size) => (
              <label
                key={size}
                className="flex items-center gap-3 text-gray-700 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => onSizeChange(size)}
                    className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2 cursor-pointer"
                  />
                </div>
                <span className="text-sm font-medium group-hover:text-red-600 transition-colors">
                  {size}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 text-base border-b pb-2">
            Categories
          </h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 text-gray-700 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => onCategoryChange(category)}
                    className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2 cursor-pointer"
                  />
                </div>
                <span className="text-sm font-medium group-hover:text-red-600 transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
