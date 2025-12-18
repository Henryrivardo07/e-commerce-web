import apiClient from "@/services/apiClient.service";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ApiResponse, ApiError } from "@/types/Api.type";
import type { Cart } from "@/types/Cart.type";

// ✅ PATCH /api/cart/items/:itemId
export async function PATCH(
  req: NextRequest,
    context: { params: Promise<{ itemId: string }> }
) {
  const { itemId } = await context.params;
  try {
    const authHeader = req.headers.get("authorization");
    const body = await req.json(); // { qty }

    const { data } = await apiClient.patch<ApiResponse<Cart>>(
      `/cart/items/${itemId}`,
      body,
      {
        headers: { Authorization: authHeader || "" },
      }
    );

    return NextResponse.json<ApiResponse<Cart>>(data, { status: 200 });
  } catch (error: unknown) {
    let message = "Something went wrong";
    if (typeof error === "object" && error !== null && "response" in error) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      message = axiosError.response?.data?.message ?? message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json<ApiError>({ message }, { status: 400 });
  }
}

// ✅ DELETE /api/cart/items/:itemId
export async function DELETE(
  req: NextRequest,
context: { params: Promise<{ itemId: string }> }
) {
  try {
    const authHeader = req.headers.get("authorization");
    const { itemId } = await context.params;

    const { data } = await apiClient.delete<ApiResponse<Cart>>(
      `/cart/items/${itemId}`,
      {
        headers: { Authorization: authHeader || "" },
      }
    );

    return NextResponse.json<ApiResponse<Cart>>(data, { status: 200 });
  } catch (error: unknown) {
    let message = "Something went wrong";
    if (typeof error === "object" && error !== null && "response" in error) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      message = axiosError.response?.data?.message ?? message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json<ApiError>({ message }, { status: 400 });
  }
}
