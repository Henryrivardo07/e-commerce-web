import { ApiResponse } from "@/types/Api.type";
import { Cart } from "@/types/Cart.type";
import { AxiosError } from "axios";
import apiClient from "./apiClient.service";

export async function getCart(): Promise<Cart> {
  try {
    const { data } = await apiClient.get<ApiResponse<Cart>>("/cart");
    return data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Failed to fetch cart"
      );
    }
    throw error;
  }
}

// Delete Cart
export async function deleteCart(): Promise<Cart> {
  try {
    const { data } = await apiClient.delete<ApiResponse<Cart>>("/cart");
    return data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Failed to delete all carts"
      );
    }
    throw error;
  }
}

// Post Cart
export async function PostCartItems(productId: number, qty:number) {
 try {
    const { data } = await apiClient.post<ApiResponse<Cart>>("/cart/items", {
     productId,
     qty
    });
    return data.data;
  } catch (error: unknown) {
if (error instanceof AxiosError) {
      // Now you’ll actually see backend message
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Cart add failed"
      );
    }
    throw error;
  }
}

// Patch Cart
export async function PatchCartItems(itemId: number, qty:number) {
 try {
    const { data } = await apiClient.patch<ApiResponse<Cart>>(`/cart/items/${itemId}`, {
     qty
    });
    return data.data;
  } catch (error: unknown) {
if (error instanceof AxiosError) {
      // Now you’ll actually see backend message
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Cart edit qty failed"
      );
    }
    throw error;
  }
}

// Delete Cart Items
export async function deleteCartItems(itemId: number): Promise<Cart> {
  try {
    const { data } = await apiClient.delete<ApiResponse<Cart>>(`/cart/items/${itemId}`);
    return data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Failed to delete cart by id"
      );
    }
    throw error;
  }
}