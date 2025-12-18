import apiClient from "@/services/apiClient.service";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ApiResponse, ApiError } from "@/types/Api.type";
import type { Order } from "@/types/Order.type";

export async function GET(
  req: NextRequest,
   context: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = req.headers.get("authorization");
    const { id } = await context.params;

    const { data } = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`, {
      headers: { Authorization: authHeader || "" },
    });

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
    return NextResponse.json<ApiError>({ message }, { status: 400 });
  }
}
