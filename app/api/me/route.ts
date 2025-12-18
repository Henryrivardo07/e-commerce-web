import apiClient from "@/services/apiClient.service";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ApiResponse, ApiError } from "@/types/Api.type";
import type { User } from "@/types/User.type";

export async function GET(req: NextRequest) {
  try {
    // ✅ Ambil token dari header request (frontend -> Next API)
    const authHeader = req.headers.get("authorization");
    

    const { data } = await apiClient.get<ApiResponse<User>>("/me", {
      headers: {
        Authorization: authHeader || "",
      },
    });

    return NextResponse.json<ApiResponse<User>>(data, { status: 200 });
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
