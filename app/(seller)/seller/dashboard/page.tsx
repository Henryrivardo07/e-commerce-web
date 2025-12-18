"use client";

import React from "react";
import { ClipboardCheck, DollarSign, Package, ScrollText } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  return (
    <div>
      <h1 className="font-bold">
        <span className="hidden md:inline display-sm">Dashboard</span>
        <span className="inline md:hidden display-xs">Dashboard</span>
      </h1>

      <div className="grid md:grid-cols-4 grid-cols-1 my-6 gap-3">
        <div className="bg-white border border-neutral-300 p-3 rounded-md h-full">
          <Package />
          <p className="text-sm my-3">Total Product</p>
          <h3 className="font-bold">
            <span className="inline md:hidden text-xl">
              {user?.shop?._count?.completedItems}
            </span>
            <span className="hidden md:inline display-xs">
              {user?.shop?._count?.completedItems}
            </span>
          </h3>
        </div>

        <div className="bg-white border border-neutral-300 p-3 rounded-md h-full">
          <ScrollText />
          <p className="text-sm my-3">Total Orders</p>
          <h3 className="font-bold">
            <span className="inline md:hidden text-xl">
              {user?.shop?._count?.totalOrders}
            </span>
            <span className="hidden md:inline display-xs">
              {user?.shop?._count?.totalOrders}
            </span>
          </h3>
        </div>

        <div className="bg-white border border-neutral-300 p-3 rounded-md h-full">
          <DollarSign />
          <p className="text-sm my-3">Total Revenue</p>
          <h3 className="font-bold">
            <span className="inline md:hidden text-xl">
              {user?.shop?._count?.totalRevenue}
            </span>
            <span className="hidden md:inline display-xs">
              {user?.shop?._count?.totalRevenue}
            </span>
          </h3>
        </div>

        <div className="bg-white border border-neutral-300 p-3 rounded-md h-full">
          <ClipboardCheck />
          <p className="text-sm my-3">Completed Orders</p>
          <h3 className="font-bold">
            <span className="inline md:hidden text-xl">
              {user?.shop?._count?.completedItems}
            </span>
            <span className="hidden md:inline display-xs">
              {user?.shop?._count?.completedItems}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
