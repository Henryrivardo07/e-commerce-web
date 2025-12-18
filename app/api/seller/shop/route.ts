import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AxiosError } from "axios";
import apiClient from "@/services/apiClient.service";
import { ApiResponse, ApiError } from "@/types/Api.type";
import { Shop } from "@/types/Shop.type";

// ==========================================================
// GET /api/seller/shop  →  Get Seller Shop Profile
// ==========================================================
export async function GET() {
  try {
    const { data } = await apiClient.get<ApiResponse<Shop>>("/seller/shop");
    return NextResponse.json<ApiResponse<Shop>>(data);
  } catch (error: unknown) {
    let status = 500;
    let message = "Failed to fetch Shop Profile";

    if (error instanceof AxiosError) {
      status = error.response?.status ?? 500;
      message =
        (error.response?.data as { message?: string })?.message ??
        error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    const err: ApiError = { message };
    return NextResponse.json(err, { status });
  }
}

// ==========================================================
// PATCH /api/seller/shop  →  Update Seller Shop Info
// ==========================================================
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, address, isActive } = body;

    const { data } = await apiClient.patch<ApiResponse<Shop>>("/seller/shop", {
      name,
      address,
      isActive,
    });

    return NextResponse.json<ApiResponse<Shop>>(data);
  } catch (error: unknown) {
    let status = 500;
    let message = "Seller update failed";

    if (error instanceof AxiosError) {
      status = error.response?.status ?? 500;
      message =
        (error.response?.data as { message?: string })?.message ??
        error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    const err: ApiError = { message };
    return NextResponse.json(err, { status });
  }
}
