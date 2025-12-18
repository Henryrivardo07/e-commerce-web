"use client";

import React from "react";
import CheckoutForm from "./CheckoutForm";
import useCheckoutForm from "./useCheckoutForm";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { useOrderById } from "@/hooks/useOrder";
import { Skeleton } from "@/components/ui/skeleton";
import { groupOrdersByShop } from "@/lib/groupOrdersByShop";
import ListOrderCheckout from "./ListOrderCheckout";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const CheckoutPage: React.FC = () => {
  const {
    handleSubmit,
    onSubmit,
    setValue,
    watch,
    register,
    errors,
    isPending,
  } = useCheckoutForm();
  const { data: dataAll, isLoading: loadingAll } = useOrderById(22);

  const shippingMethod = watch("shippingMethod");
  return (
    <div className="px-4 md:px-30 py-7 bg-neutral-50">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-4">
        <div className="w-full">
          <h1 className="font-bold mb-6">
            <span className="inline md:hidden display-xs">Checkout</span>
            <span className="hidden md:inline display-md">Checkout</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex flex-col w-full">
              <div className="rounded-xl bg-white p-5 shadow-lg mb-4 md:mb-6">
                <h2 className="text-md md:text-lg font-bold">
                  Shipping Address
                </h2>
                {/* ✅ pass same form instance */}
                <CheckoutForm
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  errors={errors}
                  register={register}
                  isPending={isPending}
                />
              </div>

              <div className="w-full rounded-xl bg-white p-5 shadow-lg">
                {loadingAll ? (
                  <>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-20 w-full mb-3" />
                    ))}
                  </>
                ) : (
                  dataAll &&
                  groupOrdersByShop(dataAll).map((o) => (
                    <ListOrderCheckout
                      key={`${o.orderId}-${o.shopId}`}
                      storeName={o.storeName}
                      products={o.products}
                    />
                  ))
                )}

                {/* ✅ controlled select, sync with form */}
                <Select
                  value={shippingMethod}
                  onValueChange={(value) =>
                    setValue("shippingMethod", value, { shouldValidate: true })
                  }
                >
                  <SelectGroup>
                    <SelectLabel asChild>
                      <div className="text-md md:text-lg font-bold">
                        <span className="text-black">Shipping Method</span>
                      </div>
                    </SelectLabel>
                  </SelectGroup>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Shipping" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JNE">JNE</SelectItem>
                    <SelectItem value="TIKI">TIKI</SelectItem>
                    <SelectItem value="SiCepat">SiCepat</SelectItem>
                  </SelectContent>
                </Select>
                {errors.shippingMethod && (
                  <span className="text-xs text-red-500 mt-1 ms-1">
                    {errors.shippingMethod.message}
                  </span>
                )}
              </div>
            </div>

            <div className="w-full md:w-97 bg-white rounded-xl py-5 h-fit">
              <h2 className="text-md md:text-lg font-bold px-5 mb-4">
                Payment Method
              </h2>

              <div className="px-5">
                <div className="flex items-center justify-between gap-2">
                  <div className="border border-neutral-300 rounded-md h-10 w-15 flex justify-center items-center">
                    <Image
                      src="/img/BNI.svg"
                      alt="bni"
                      width={30}
                      height={30}
                      unoptimized
                    />
                  </div>
                  <span className="text-sm md:text-md font-normal w-full">
                    BNI Virtual Account
                  </span>
                  <input
                    type="radio"
                    name="bank"
                    id="bni"
                    className="appearance-none checked:bg-white border checked:border-7 checked:border-black p-2 checked:p-1 rounded-full"
                  />
                </div>
                <div className="my-4 border border-neutral-300"></div>
                <div className="flex items-center justify-between gap-2">
                  <div className="border border-neutral-300 rounded-md h-10 w-15 flex justify-center items-center">
                    <Image
                      src="/img/BRI.svg"
                      alt="bri"
                      width={30}
                      height={30}
                      unoptimized
                    />
                  </div>
                  <span className="text-sm md:text-md font-normal w-full">
                    BRI Virtual Account
                  </span>
                  <input
                    type="radio"
                    name="bank"
                    id="bri"
                    className="appearance-none checked:bg-white border checked:border-7 checked:border-black p-2 checked:p-1 rounded-full"
                  />
                </div>
                <div className="my-4 border border-neutral-300"></div>
                <div className="flex items-center justify-between gap-2">
                  <div className="border border-neutral-300 rounded-md h-10 w-15 flex justify-center items-center">
                    <Image
                      src="/img/BCA.svg"
                      alt="bca"
                      width={30}
                      height={30}
                      unoptimized
                    />
                  </div>
                  <span className="text-sm md:text-md font-normal w-full">
                    BCA Virtual Account
                  </span>
                  <input
                    type="radio"
                    name="bank"
                    id="bca"
                    className="appearance-none checked:bg-white border checked:border-7 checked:border-black p-2 checked:p-1 rounded-full"
                  />
                </div>
                <div className="my-4 border border-neutral-300"></div>
                <div className="flex items-center justify-between gap-2">
                  <div className="border border-neutral-300 rounded-md h-10 w-15 flex justify-center items-center">
                    <Image
                      src="/img/Mandiri.svg"
                      alt="mandiri"
                      width={30}
                      height={30}
                      unoptimized
                    />
                  </div>
                  <span className="text-sm md:text-md font-normal w-full">
                    Mandiri Virtual Account
                  </span>
                  <input
                    type="radio"
                    name="bank"
                    id="mandiri"
                    className="appearance-none checked:bg-white border checked:border-7 checked:border-black p-2 checked:p-1 rounded-full"
                  />
                </div>
              </div>
              <div className="my-4 border border-neutral-300"></div>
              <div className="px-5">
                <h2 className="text-md md:text-lg font-bold mb-4">
                  Payment Summary
                </h2>
                {/* <div className="flex items-center justify-between mb-3">
                  <span className="text-sm md:text-md">
                    Total Price of Goods
                  </span>
                  <span className="text-sm md:text-md font-bold">
                    Rp{dataAll?.totalAmount.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm md:text-md">Shipping cost</span>
                  <span className="text-sm md:text-md font-bold">Rp10.000</span>
                </div> */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm md:text-md font-bold">Total</span>
                  <span className="text-sm md:text-md font-bold">
                    Rp{dataAll?.totalAmount.toLocaleString("id-ID")}
                  </span>
                </div>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  disabled={isPending}
                  className="w-full"
                  size={"sm"}
                >
                  {isPending ? "Processing..." : "Pay Now"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
