import type { User } from "@/types/User.type";
import type { ApiResponse } from "@/types/Api.type";
import { AxiosError } from "axios";
import apiClient from "./apiClient.service";

// GetMe
export async function GetMe(): Promise<User> {
 try {
    const { data } = await apiClient.get<ApiResponse<User>>("/me");
    return data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Get Me Failed"
      );
    }
    throw error;
  }
}

// PostMe
export async function PostMe(name: string, phone: string, avatarUrl: string) {
 try {
    const { data } = await apiClient.post<ApiResponse<User>>("/auth/login", {
      name,
      phone,
      avatarUrl
    });
    return data.data;
  } catch (error: unknown) {
if (error instanceof AxiosError) {
      // Now you’ll actually see backend message
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Profile Update failed"
      );
    }
    throw error;
  }
}

