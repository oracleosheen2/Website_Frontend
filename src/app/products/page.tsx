import ProductHeader from "@/components/Products/ProductHeader";
import ProductListing from "@/components/Products/ProductListing";
// import ProductMain from "@/components/Products/ProductMain";
import React from "react";

const Page = () => {
  return (
    <div className="bg-white min-h-screen">
      <ProductHeader />
      {/* <ProductMain /> */}
      <ProductListing />
    </div>
  );
};

export default Page;
