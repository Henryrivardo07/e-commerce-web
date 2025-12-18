import { ApiResponse } from "@/types/Api.type";
import { NextResponse } from "next/server";

export async function POST() {
  // Example: If you had to notify external API, you could call apiClient.post("/auth/logout")
  const response: ApiResponse<null> = {
    success: true,
    message: "Logged out successfully",
    data: null,
  };

  return NextResponse.json(response);
}
