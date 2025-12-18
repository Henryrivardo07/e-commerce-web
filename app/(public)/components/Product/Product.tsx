"use client";

import React from "react";
import Image from "next/image";
import { getValidImage } from "@/lib/getValidImage";

type ProductProps = {
  title?: string;
  price?: number;
  rating?: number;
  qtySold?: number;
  isVerified?: boolean;
  MarketName?: string;
  productImg: string;
};

const Product: React.FC<ProductProps> = ({
  title,
  rating,
  MarketName,
  isVerified,
  price,
  qtySold,
  productImg,
}) => {
  return (
    <div className="card bg-white shadow-md rounded-xl cursor-pointer">
      <div className="h-43 md:h-60 w-full relative">
        <Image
          src={getValidImage(productImg)}
          alt="product"
          className="h-full w-full object-cover"
          width={300}
          height={300}
          unoptimized
        />
      </div>
      <div className="p-3">
        <p className="text-sm md:text-md mb-2 overflow-hidden text-ellipsis line-clamp-2 h-10">
          {title}
        </p>
        <p className="text-sm md:text-md font-bold mb-2">
          Rp{price?.toLocaleString("id-ID")}
        </p>

        <div className="text-sm flex items-center gap-1 mb-2">
          <Image
            src="/icons/Star.svg"
            alt="svg"
            className="w-4"
            width={20}
            height={20}
          />
          {rating == 0 ? (
            <span className="text-sm text-neutral-600">No rating yet</span>
          ) : (
            <>
              <span>{rating} - </span>
              <span>{qtySold !== 0 ? qtySold + " Sold" : ""} </span>
            </>
          )}
        </div>

        {MarketName && (
          <div className="flex items-center text-sm gap-1">
            {isVerified && (
              <Image
                src="/icons/Verify.svg"
                alt="svg"
                className="w-5"
                width={20}
                height={20}
              />
            )}
            <span className="text-ellipsis line-clamp-1">{MarketName}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
