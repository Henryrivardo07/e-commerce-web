"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import OpenStoreForm from "./components/OpenStoreForm";

const OpenStore: React.FC = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-neutral-100 overflow-y-auto p-6">
      <Card className="w-full md:w-113">
        <CardHeader>
          <CardTitle>
            <span className="display-xs font-bold text-black">Shirt</span>
          </CardTitle>
          <CardDescription>
            <span className="display-xs font-bold text-black">
              Open Your Store Today
            </span>
            <p className="text-sm md:text-md">
              Start selling in minutes and reach thousands of customers
              instantly
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OpenStoreForm />
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Link
            href={"/"}
            className="text-sm font-regular text-neutral-950 font-bold underline"
          >
            Back
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OpenStore;
