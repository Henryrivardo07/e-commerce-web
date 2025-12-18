
import { GetCategories } from "@/services/categories.service";
import { CategoriesResponse } from "@/types/Category.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useCategories(
  page: number = 1,
  limit: number = 10,
) {
  return useQuery<CategoriesResponse, Error>({
    queryKey: ["category", page, limit],
    queryFn: () => GetCategories(page, limit),
    placeholderData: keepPreviousData,
  });
}