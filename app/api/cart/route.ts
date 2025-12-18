import apiClient from "@/services/apiClient.service";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ApiResponse, ApiError } from "@/types/Api.type";
import type { Cart } from "@/types/Cart.type";

export async function GET(req: NextRequest) {
  try {
    // ✅ Ambil token dari header request (frontend -> Next API)
    const authHeader = req.headers.get("authorization");
    

    const { data } = await apiClient.get<ApiResponse<Cart>>("/cart", {
      headers: {
        Authorization: authHeader || "",
      },
    });

    return NextResponse.json<ApiResponse<Cart>>(data, { status: 200 });
  } catch (error: unknown) {
    let message = "Something went wrong";

    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error
    ) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      message = axiosError.response?.data?.message ?? message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    const err: ApiError = { message };
    return NextResponse.json(err, { status: 400 });
  }
}


// ✅ DELETE /api/cart (hapus semua cart items)
export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    const { data } = await apiClient.delete<ApiResponse<Cart>>("/cart", {
      headers: { Authorization: authHeader || "" },
    });

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