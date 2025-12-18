import { ApiResponse } from "@/types/Api.type";
import { AxiosError } from "axios";
import { Order, OrderResponse } from "@/types/Order.type";
import { Address } from "@/types/Address.type";
import apiClient from "./apiClient.service";


// Post Order
export async function PostOrderCheckout(address:Address, shippingMethod:string) {
 try {
    const { data } = await apiClient.post<ApiResponse<Order>>("/orders/checkout", {
     address,
     shippingMethod
    });
    return data.data;
  } catch (error: unknown) {
if (error instanceof AxiosError) {
      // Now you’ll actually see backend message
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Order Checkout failed"
      );
    }
    throw error;
  }
}


// Get Order
export async function GetMyOrders(
    page: number = 1,
  limit: number = 10,
): Promise<OrderResponse> {
 try {
     const params: Record<string, string | number> = { page, limit };
    const { data } = await apiClient.get<ApiResponse<OrderResponse>>(`/orders/my`, {
      params,
    });
    return data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Get My Orders Failed"
      );
    }
    throw error;
  }
}


// Get Order By Id
export async function getOrdersById(id: number): Promise<Order> {
  try {
    const { data } = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`);
    return data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Failed to get orders"
      );
    }
    throw error;
  }
}

// Patch order when items is completed
export async function PatchOrderItemsComplete(id: number) {
 try {
    const { data } = await apiClient.patch<ApiResponse<Order>>(`/orders/items/${id}/complete`);
    return data.data;
  } catch (error: unknown) {
if (error instanceof AxiosError) {
      // Now you’ll actually see backend message
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Order update complete failed"
      );
    }
    throw error;
  }
}