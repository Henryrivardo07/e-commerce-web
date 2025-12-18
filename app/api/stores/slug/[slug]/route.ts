import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/services/apiClient.service";
import { ApiError } from "@/types/Api.type";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
     const { slug } = await context.params;
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const authHeader = req.headers.get("authorization");

    const { data } = await apiClient.get(`/stores/slug/${slug}`, {
      params: { page, limit },
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
