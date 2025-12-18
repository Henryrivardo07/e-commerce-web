"use client";

import { Button } from "@/components/ui/button";
import { formatOrderDate } from "@/lib/dateFormatter";
import { getValidImage } from "@/lib/getValidImage";
import { CartItem } from "@/types/Cart.type";
import Image from "next/image";
import React from "react";

interface ListOrderCheckoutProps {
  storeName: string;
  products: CartItem[];
}

const ListOrderCheckout: React.FC<ListOrderCheckoutProps> = ({
  storeName,
  products,
}) => {
  return (
    <div className="w-full p-3 md:p-5 bg-white border-b border-b-neutral-300 mb-4">
      {/* Header */}
      <div className="flex items-center gap-1 text-sm font-normal flex-wrap mb-3">
        <Image
          src="/icons/Store.svg"
          width={20}
          height={20}
          alt="store"
          className="rounded-md"
          unoptimized
        />
        <span>{storeName}</span>
      </div>

      {/* Product Info */}
      {products.map((p) => (
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3 mb-3"
          key={p.id}
        >
          <div className="flex items-center justify-start w-full gap-4">
            <Image
              src={getValidImage(p.product.images[0])}
              width={70}
              height={70}
              alt={p.product.title}
              className="rounded-sm"
              unoptimized
            />
            <div className="flex flex-col justify-between md:gap-2">
              <span className="text-sm font-bold">{p.product.title}</span>
              <span className="text-sm text-neutral-600">T-Shirt</span>
              <span className="inline md:hidden text-sm font-bold">
                {p.qty} x Rp{p.priceSnapshot.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <span className="hidden md:inline text-sm md:text-lg font-bold w-full text-end">
            {p.qty} x Rp{p.priceSnapshot.toLocaleString("id-ID")}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ListOrderCheckout;
