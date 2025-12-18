import { CategoriesResponse } from "@/types/Category.type";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/Api.type";
import apiClient from "./apiClient.service";

// Get Categories
export async function GetCategories(
    page: number = 1,
  limit: number = 10,
): Promise<CategoriesResponse> {
 try {
     const params: Record<string, string | number> = { page, limit };
    const { data } = await apiClient.get<ApiResponse<CategoriesResponse>>(`/categories`, {
      params,
    });
    return data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        (error.response?.data as { message?: string })?.message ||
          "Get Categories Failed"
      );
    }
    throw error;
  }
}