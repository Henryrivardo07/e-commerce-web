import apiClient from "@/services/apiClient.service";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ApiResponse, ApiError } from "@/types/Api.type";
import type { Cart } from "@/types/Cart.type";

// ✅ POST /api/cart/items
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const body = await req.json(); // { productId, qty }

    const { data } = await apiClient.post<ApiResponse<Cart>>(
      "/cart/items",
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
