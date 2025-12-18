import apiClient from "@/services/apiClient.service";
import { ApiError, ApiResponse } from "@/types/Api.type";
import { User } from "@/types/User.type";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
 
  try {
    const body = await req.json();
    const { name, email, password, avatarUrl } = body;

    const { data } = await apiClient.post<ApiResponse<User>>("/auth/register", {
      name,
      email,
      password,
      avatarUrl
    });

    return NextResponse.json<ApiResponse<User>>(data);
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
