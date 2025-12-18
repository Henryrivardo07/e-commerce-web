"use client";

import { useCart } from "@/hooks/useCart";
import React, { useEffect } from "react";
import CartIsEmpty from "./components/CartIsEmpty";
import CartNotEmpty from "./components/CartNotEmpty";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { data, isLoading } = useCart();

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (isLoading) return <div>Loading...</div>;

  if (!data?.items?.length) {
    return <CartIsEmpty />;
  }

  return <CartNotEmpty cartData={data} />;
};

export default Cart;
