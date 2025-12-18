"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListOrder from "./ListOrder";
import { useMyOrders } from "@/hooks/useOrder";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { groupOrdersByShop } from "@/lib/groupOrdersByShop";
import Link from "next/link";

const OrderNotEmpty: React.FC = () => {
  const { data: dataAll, isLoading: loadingAll } = useMyOrders();
  const [tab, setTab] = useState("all");

  const tabItems = [
    { value: "all", label: "All Order" },
    { value: "processing", label: "Processing" },
    { value: "delivered", label: "Delivered" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];
  return (
    <div>
      <div className="relative mr-2 w-full mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border bg-white border-neutral-300 py-2 px-10 rounded-xl w-full"
        />
        <Search className="absolute text-neutral-500 top-2 left-3 w-5" />
      </div>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        {/* ✅ Desktop Tabs */}
        <TabsList className="hidden md:flex w-full justify-between bg-white p-3 h-15">
          {tabItems.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="w-full text-neutral-700 data-[state=active]:text-black border-b border-b-neutral-300 data-[state=active]:border-b-primary data-[state=active]:font-semibold py-3 transition-all rounded-none h-12 data-[state=active]:shadow-none cursor-pointer"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ✅ Mobile Dropdown */}
        <div className="block md:hidden mb-4">
          <Select value={tab} onValueChange={setTab}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {tabItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <TabsContent value="all">
          {loadingAll ? (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full mb-3" />
              ))}
            </>
          ) : (
            dataAll &&
            groupOrdersByShop(dataAll).map((o) => (
              <Link
                href={`/checkout/${o.orderId}`}
                passHref
                key={`${o.orderId}-${o.shopId}`}
              >
                <ListOrder
                  storeName={o.storeName}
                  invoiceId={o.invoiceId}
                  orderDate={o.orderDate}
                  status={o.statusOrder}
                  products={o.products}
                  totalPayment={o.totalPayment}
                  onCancel={() => console.log("Order cancelled!")}
                />
              </Link>
            ))
          )}
        </TabsContent>
        <TabsContent value="processing">Change your password here.</TabsContent>
        <TabsContent value="delivered">Change your password here.</TabsContent>
        <TabsContent value="completed">Change your password here.</TabsContent>
        <TabsContent value="cancelled">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderNotEmpty;
