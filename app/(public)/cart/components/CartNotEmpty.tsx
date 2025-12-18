import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDeleteCartItem, useUpdateCartItem } from "@/hooks/useCart";
import CartItem from "./CartItem";
import { Cart } from "@/types/Cart.type";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

type CartNotEmptyProp = {
  cartData: Cart;
};

const CartNotEmpty: React.FC<CartNotEmptyProp> = ({ cartData }) => {
  const [selected, setSelected] = useState<number[]>([]); // ✅ store selected itemIds

  const updateCartMutation = useUpdateCartItem();
  const deleteCartItemMutation = useDeleteCartItem();
  const queryClient = useQueryClient();

  // ✅ handle single item checkbox
  const handleCheck = (itemId: number, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, itemId] : prev.filter((x) => x !== itemId)
    );
  };

  // ✅ handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds =
        cartData?.groups?.flatMap((g) => g.items.map((it) => it.id)) ?? [];
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  };

  // ✅ handle quantity change
  const handleQuantityChange = (itemId: number, qty: number) => {
    updateCartMutation.mutate(
      { itemId: itemId, qty },
      {
        onError: () => {
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
      }
    );
  };

  const totalItems = cartData?.groups?.flatMap((g) => g.items).length ?? 0;

  const allSelected = totalItems > 0 && selected.length === totalItems;
  const isIndeterminate = selected.length > 0 && selected.length < totalItems;

  return (
    <div className="px-4 md:px-30 py-7">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-4">
        <div className="w-full">
          <h1 className="font-bold mb-6">
            <span className="inline md:hidden display-xs">Cart</span>
            <span className="hidden md:inline display-md">Cart</span>
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <Checkbox
              checked={
                allSelected ? true : isIndeterminate ? "indeterminate" : false
              }
              onCheckedChange={handleSelectAll}
            />
            <h3 className="text-sm md:text-md">Select All</h3>
          </div>

          {cartData?.groups?.map((group, i) => (
            <CartItem
              key={group.shop.id}
              storeName={group.shop.name}
              CartItems={group.items}
              checkedItems={selected} // ✅ pass array of checked
              onCheck={handleCheck}
              onRemove={(itemId) => {
                if (confirm("Are you sure you want to remove this item?")) {
                  deleteCartItemMutation.mutate(itemId, {
                    onError: (err) => {
                      console.error("Delete failed:", err);
                    },
                  });
                }
              }}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>

        <div className="w-full md:w-88 shadow-md p-5 rounded-xl h-fit">
          <h2 className="text-lg font-bold mb-3">Total Shopping</h2>
          <div className="flex items-center justify-between mb-3 text-md md:text-lg">
            <span>Total</span>
            <span className="font-bold">
              Rp{cartData?.grandTotal?.toLocaleString("id-ID")}
            </span>
          </div>

          <Link href="/checkout" passHref>
            <Button className="w-full cursor-pointer" size={"sm"}>
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartNotEmpty;
