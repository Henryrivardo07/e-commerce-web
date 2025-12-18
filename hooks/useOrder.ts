import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  PostOrderCheckout, 
  GetMyOrders, 
  getOrdersById, 
  PatchOrderItemsComplete 
} from "@/services/order.service";
import { Order, OrderResponse } from "@/types/Order.type";
import { Address } from "@/types/Address.type";

// ✅ Checkout Order
export function useCheckoutOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ address, shippingMethod }: { address: Address, shippingMethod:string }) => PostOrderCheckout(address, shippingMethod),
    onSuccess: () => {
      // Invalidate orders or cart if needed
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: unknown) => {
      console.error("Checkout failed:", error);
    },
  });
}

// ✅ Get My Orders
export function useMyOrders(page = 1, limit = 10) {
  return useQuery<OrderResponse, Error>({
    queryKey: ["orders", page, limit],
    queryFn: () => GetMyOrders(page, limit),
  });
}

// ✅ Get Order by ID
export function useOrderById(id: number) {
  return useQuery<Order, Error>({
    queryKey: ["order", id],
    queryFn: () => getOrdersById(id),
  });
}

// ✅ Mark Order Item Complete
export function useCompleteOrderItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: number) => PatchOrderItemsComplete(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: unknown) => {
      console.error("Failed to complete item:", error);
    },
  });
}
