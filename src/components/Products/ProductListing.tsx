"use client";
import React, { useState, useMemo } from "react";
import Products from "./Products";
import Filters from "./Filters";
import CommonPageHeader from "../CommonPages/CommonPageHeader";


export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  gender: string[];
  isNew: boolean;
  rating: number;
  size?: string[]; // Make size optional
  color?: string[];
}

const ProductListing: React.FC = () => {
  // Sample products data with all filter properties
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Raksha Kavach Bracelet",
      price: 120.23,
      image: "https://picsum.photos/id/1011/300/300",
      category: "Dresses",
      brand: "H&M",
      size: ["Medium", "Large"],
      gender: ["Women", "Girls"],
      isNew: true,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Golden Thread Bracelet",
      price: 150.0,
      image: "https://picsum.photos/id/1012/300/300",
      category: "Tops",
      brand: "Zara",
      size: ["Large", "Plus Size"],
      gender: ["Women", "Ladies"],
      isNew: false,
      rating: 4.2,
    },
    {
      id: 3,
      name: "Silver Charm Bracelet",
      price: 180.5,
      image: "https://picsum.photos/id/1013/300/300",
      category: "Lingerie & Lounge Wear",
      brand: "Victoria's Secret",
      size: ["Medium"],
      gender: ["Women"],
      isNew: true,
      rating: 4.8,
    },
    {
      id: 4,
      name: "Beaded Bracelet",
      price: 90.0,
      image: "https://picsum.photos/id/1015/300/300",
      category: "Blouse",
      brand: "Mark & Spencer",
      size: ["Large", "Plus Size", "Sexy Plus Size"],
      gender: ["Ladies"],
      isNew: false,
      rating: 3.9,
    },
    {
      id: 5,
      name: "Leather Strap Bracelet",
      price: 200.0,
      image: "https://picsum.photos/id/1016/300/300",
      category: "Vintage",
      brand: "Gucci",
      size: ["Medium", "Large"],
      gender: ["Women", "Ladies"],
      isNew: true,
      rating: 4.7,
    },
    {
      id: 6,
      name: "Pearl Bracelet",
      price: 250.5,
      image: "https://picsum.photos/id/1018/300/300",
      category: "Dresses",
      brand: "Chanel",
      size: ["Medium"],
      gender: ["Women"],
      isNew: false,
      rating: 4.9,
    },
    {
      id: 7,
      name: "Thread Friendship Bracelet",
      price: 75.0,
      image: "https://picsum.photos/id/1020/300/300",
      category: "Tops",
      brand: "H&M",
      size: ["Large", "Plus Size"],
      gender: ["Girls", "Babies"],
      isNew: true,
      rating: 4.1,
    },
    {
      id: 8,
      name: "Gold Plated Bracelet",
      price: 300.0,
      image: "https://picsum.photos/id/1021/300/300",
      category: "Lingerie & Lounge Wear",
      brand: "Dior",
      size: ["Medium", "Large", "Sexy Plus Size"],
      gender: ["Women", "Ladies"],
      isNew: false,
      rating: 4.6,
    },
    {
      id: 9,
      name: "Classic Woven Bracelet",
      price: 110.0,
      image: "https://picsum.photos/id/1024/300/300",
      category: "Blouse",
      brand: "Prada",
      size: ["Medium"],
      gender: ["Women"],
      isNew: true,
      rating: 4.3,
    },
    {
      id: 10,
      name: "Mystic Stone Bracelet",
      price: 175.0,
      image: "https://picsum.photos/id/1025/300/300",
      category: "Vintage",
      brand: "Fendi",
      size: ["Large", "Plus Size"],
      gender: ["Ladies"],
      isNew: false,
      rating: 4.4,
    },
    {
      id: 11,
      name: "Diamond Elegance Bracelet",
      price: 280.0,
      image: "https://picsum.photos/id/1027/300/300",
      category: "Dresses",
      brand: "Versace",
      size: ["Medium"],
      gender: ["Women"],
      isNew: true,
      rating: 4.9,
    },
    {
      id: 12,
      name: "Rose Gold Beauty",
      price: 195.0,
      image: "https://picsum.photos/id/1028/300/300",
      category: "Tops",
      brand: "Dolce & Gabbana",
      size: ["Large", "Sexy Plus Size"],
      gender: ["Ladies"],
      isNew: false,
      rating: 4.5,
    },
  ];

  // Filter states
  const [priceRange, setPriceRange] = useState<number>(300);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("New Arrivals");

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      // Price filter
      if (product.price > priceRange) return false;

      // Gender filter
      if (
        selectedGenders.length > 0 &&
        !selectedGenders.some((gender) => product.gender.includes(gender))
      ) {
        return false;
      }

      // Brand filter
      if (
        selectedBrands.length > 0 &&
        !selectedBrands.includes(product.brand)
      ) {
        return false;
      }

      // Size filter
      // Size filter
      if (
        selectedSizes.length > 0 &&
        !product.size?.some((s) => selectedSizes.includes(s))
      ) {
        return false;
      }

      // Category filter
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      ) {
        return false;
      }

      return true;
    });

    // Sort products
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

  // Handler functions for filters
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

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

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
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        {" "}
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
