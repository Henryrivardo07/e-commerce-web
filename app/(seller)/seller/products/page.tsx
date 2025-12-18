"use client";

import React from "react";
import SellerProducts from "./components/SellerProducts";

const ProductsSeller = () => {
  return (
    <div>
      <h1 className="font-bold">
        <span className="hidden md:inline display-sm">Products</span>
        <span className="inline md:hidden display-xs">Products</span>
      </h1>

      <SellerProducts />
    </div>
  );
};

export default ProductsSeller;
