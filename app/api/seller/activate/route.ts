

import apiClient from "@/services/apiClient.service";
import { ApiError, ApiResponse } from "@/types/Api.type";
import { Shop } from "@/types/Shop.type";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

// ==========================================================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, address, logo } = body;
    const authHeader = req.headers.get("authorization");

    const { data } = await apiClient.post<ApiResponse<Shop>>(
  "/seller/activate",
  { name, slug, address, logo },
  {
    headers: {
      Authorization: authHeader || "",
    },
  }
);

    return NextResponse.json<ApiResponse<Shop>>(data, { status: 200 });
  } catch (error: unknown) {
    let status = 500;
    let message = "Seller add failed";

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