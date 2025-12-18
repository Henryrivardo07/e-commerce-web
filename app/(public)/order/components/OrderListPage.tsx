"use client";

import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";
import React from "react";
import { FileText, Star } from "lucide-react";
import OrderNotEmpty from "./OrderNotEmpty";
import { getValidImage } from "@/lib/getValidImage";

const OrderListPage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="px-4 md:px-55 py-7 bg-neutral-50">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-4">
        <div className="hidden md:block md:w-57 bg-white shadow-md rounded-2xl p-4 h-fit">
          {user != null && (
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src={getValidImage(user.avatarUrl)}
                  fill
                  alt="Store"
                  unoptimized
                  className="rounded-full"
                />
              </div>
              <span className="text-sm font-bold">{user.name}</span>
            </div>
          )}

          <div className="flex items-center gap-2 hover:bg-neutral-100 h-12 rounded-md px-4 hover:font-bold">
            <FileText className="w-4" />
            <span>Order List</span>
          </div>
          <div className="flex items-center gap-2 hover:bg-neutral-100 h-12 rounded-md px-4 hover:font-bold">
            <Star className="w-4" />
            <span>Review</span>
          </div>
        </div>

        <div className="w-full">
          <h1 className="font-bold mb-6">
            <span className="inline md:hidden display-xs">Order List</span>
            <span className="hidden md:inline display-sm">Order List</span>
          </h1>
          <OrderNotEmpty />
        </div>
      </div>
    </div>
  );
};

export default OrderListPage;
