// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/services/apiClient.service"; 
import { ApiError } from "@/types/Api.type";

export async function GET(
  req: NextRequest,
   context: { params: Promise<{ id: string  }> }
) {
  try {
    const { id } = await context.params;
    const authHeader = req.headers.get("authorization");
    const { data } = await apiClient.get(`/products/${id}`,{
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
