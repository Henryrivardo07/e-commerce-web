import apiClient from "@/services/apiClient.service";
import { ApiError, ApiResponse } from "@/types/Api.type";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AxiosError } from "axios";
import { AuthResponse } from "@/types/Auth.type";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      { email, password }
    );

    return NextResponse.json<ApiResponse<AuthResponse>>(data);
  } catch (error: unknown) {
    let status = 500;
    let message = "Something went wrong";

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
