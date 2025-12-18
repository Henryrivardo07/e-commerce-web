import apiClient from "@/services/apiClient.service";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ApiResponse, ApiError } from "@/types/Api.type";
import type { Order } from "@/types/Order.type";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const body = await req.json();
    const { address, shippingMethod } = body;

    if (!address || !shippingMethod) {
      return NextResponse.json<ApiError>(
        { message: "Address and shipping method are required" },
        { status: 400 }
      );
    }

    const { data } = await apiClient.post<ApiResponse<Order>>(
      "/orders/checkout",
      { address, shippingMethod },
      {
        headers: { Authorization: authHeader || "" },
      }
    );

    return NextResponse.json<ApiResponse<Order>>(data, { status: 200 });
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

    const err: ApiError = { message };
    return NextResponse.json(err, { status: 400 });
  }
}
