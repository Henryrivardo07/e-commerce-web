"use client";

import { Button } from "@/components/ui/button";
import { formatOrderDate } from "@/lib/dateFormatter";
import { getValidImage } from "@/lib/getValidImage";
import { CartItem } from "@/types/Cart.type";
import Image from "next/image";
import React from "react";

interface ListOrderProps {
  storeName: string;
  invoiceId: string;
  orderDate: string;
  status: string;
  products: CartItem[];
  totalPayment: number;
  onCancel?: () => void;
}

const ListOrder: React.FC<ListOrderProps> = ({
  storeName,
  invoiceId,
  orderDate,
  status,
  products,
  totalPayment,
  onCancel,
}) => {
  const displayDate = formatOrderDate(orderDate);

  return (
    <div className="w-full p-3 md:p-5 bg-white shadow-md mb-4 rounded-xl">
      {/* Header */}
      <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-2">
        <span className="md:hidden text-sm">{displayDate}</span>
        <div className="flex items-center gap-1 text-sm font-normal flex-wrap">
          <Image
            src="/icons/Store.svg"
            width={15}
            height={15}
            alt="store"
            className="rounded-full"
            unoptimized
          />
          <span>{storeName}</span>
          <span className="hidden md:inline">-</span>
          <span>{invoiceId}</span>
          <span className="hidden md:inline">-</span>
          <span className="hidden md:inline">{displayDate}</span>
        </div>
        <div className="border border-neutral-300 rounded-sm px-2 text-sm">
          {status}
        </div>
      </div>

      <hr className="my-3" />

      {/* Product Info */}
      {products.map((p) => (
        <div className="flex items-center gap-3 mb-3" key={p.id}>
          <Image
            src={getValidImage(p.product.images[0])}
            width={50}
            height={50}
            alt={p.product.title}
            className="rounded-sm"
            unoptimized
          />
          <div className="flex flex-col justify-between">
            <span className="text-sm font-bold">{p.product.title}</span>
            <span className="text-sm">
              {p.qty} x Rp{p.priceSnapshot.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      ))}

      <hr className="my-3" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-start flex-col">
          <span className="text-sm text-neutral-600">Total Payment</span>
          <span className="text-md font-bold">
            Rp{totalPayment.toLocaleString("id-ID")}
          </span>
        </div>
        <Button
          variant={"outline"}
          size={"sm"}
          className="px-3 md:px-8"
          onClick={onCancel}
        >
          Cancel Order
        </Button>
      </div>
    </div>
  );
};

export default ListOrder;
