import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getCart, 
  deleteCart, 
  PostCartItems, 
  PatchCartItems, 
  deleteCartItems 
} from "@/services/cart.service";
import { Cart } from "@/types/Cart.type";

// ✅ Get Cart
export function useCart() {
  return useQuery<Cart, Error>({
    queryKey: ["cart"],
    queryFn: getCart,
  });
}

// ✅ Delete All Cart Items
export function useDeleteCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

// ✅ Add Item to Cart
export function useAddCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, qty }: { productId: number; qty: number }) =>
      PostCartItems(productId, qty),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
     onError: (error: unknown) => {
      console.error("Failed to update cart:", error);
      // ⚡ optionally show toast message
    },
  });
}

// ✅ Update Cart Item Quantity
export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, qty }: { itemId: number; qty: number }) =>
      PatchCartItems(itemId, qty),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

// ✅ Delete Item from Cart
export function useDeleteCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: number) => deleteCartItems(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
