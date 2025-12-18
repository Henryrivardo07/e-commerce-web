import type { User } from "@/types/User.type";
import type { ApiResponse } from "@/types/Api.type";
import type { AuthResponse } from "@/types/Auth.type";
import { AxiosError } from "axios";
import apiClient from "./apiClient.service";

// login
export async function loginUser(email: string, password: string) {
 try {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>("/auth/login", {
      email,
      password,
    });
    return data.data;
  } catch (error: unknown) {
if (error instanceof AxiosError) {
      // Now you’ll actually see backend message
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Login failed"
      );
    }
    throw error;
  }
}

// register
export async function registerUser(name: string, email: string, password: string) {
const avatarUrl = "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
    try {
    const { data } = await apiClient.post<ApiResponse<User>>("/auth/register", {
      name,
      email,
      password,
      avatarUrl
    });
    return data.data;
  } catch (error: unknown) {
     if (error instanceof AxiosError) {
      // Now you’ll actually see backend message
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Login failed"
      );
    }
    throw error;
  }
}
