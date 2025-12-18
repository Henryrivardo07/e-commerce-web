import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartIsEmpty = () => {
  return (
    <div className="px-4 md:px-30 py-7">
      <div className="flex flex-col gap-6 md:gap-10 p-4">
        <div className="w-full">
          <h1 className="font-bold mb-6">
            <span className="inline md:hidden display-xs">Cart</span>
            <span className="hidden md:inline display-md">Cart</span>
          </h1>
        </div>

        <div className="flex flex-col gap-8 justify-center items-center my-20 md:my-25">
          <Image
            src="/img/EmptyCart.svg"
            alt="cartempty"
            width={150}
            height={150}
            className="object-cover rounded"
            unoptimized
          />
          <div className="text-center">
            <h5 className="text-md md:text-lg font-bold">Your Cart is Empty</h5>
            <p className="text-sm md:text-md">
              Your cart is waiting. Add your favorite items and come back to
              checkout.
            </p>
          </div>
          <Link href="/catalog" passHref>
            <Button
              className="font-semibold w-70 md:w-75 cursor-pointer"
              size={"sm"}
            >
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartIsEmpty;
