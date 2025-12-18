// route.ts
import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/services/apiClient.service"; // absolute backend URL
import { ApiError } from "@/types/Api.type";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const categoryId = parseInt(searchParams.get("categoryId") ||"0", 10);
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort") || "newest";
    const order = searchParams.get("order") || "desc";

    const authHeader = req.headers.get("authorization");

    const params: Record<string, string | number> = { page, limit, sort, order };
    if (categoryId) params.categoryId = categoryId;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;

    const { data } = await apiClient.get("/products", {
      params,
      headers: { Authorization: authHeader || "" },
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    let message = "Something went wrong";
    if (typeof error === "object" && error !== null && "response" in error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      message = axiosError.response?.data?.message ?? message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ message } as ApiError, { status: 400 });
  }
}
