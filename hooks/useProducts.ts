import { getProductById, getProducts, getSellerProducts, getShopProductBySlug, postSellerProducts } from "@/services/product.service";
import { Product, ProductListResponse } from "@/types/Product";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShopProductsResponse } from "@/types/Shop.type";

export function useProducts(
  page: number = 1,
  limit: number = 10,
  categoryId?: number,
  minPrice?: number | null,
  maxPrice?: number | null,
  sort: "--" | "newest" | "price" | "rating" | "popular" = "newest",
  order: "asc" | "desc" = "desc"
) {
  return useQuery<ProductListResponse, Error>({
    queryKey: ["products", page, limit, categoryId, minPrice, maxPrice, sort, order],
    queryFn: () => getProducts(page, limit, categoryId, minPrice, maxPrice, sort, order),
    placeholderData: keepPreviousData,
  });
}


export function useProductById(id: number) {
  return useQuery<Product, Error>({
    queryKey: ["product", id], // unique cache key
    queryFn: () => getProductById(id),
    enabled: !!id, // only run if id is not empty
  });
}

export function useShopBySlug(
  page: number = 1,
  limit: number = 10,
  slug: string,
) {
  return useQuery<ShopProductsResponse, Error>({
    queryKey: ["Shop", page, limit, slug],
    queryFn: () => getShopProductBySlug(page, limit, slug),
    placeholderData: keepPreviousData,
  });
}


export function useSellerProducts(
  page: number = 1,
  limit: number = 10,
  isActive?: boolean,
  q?: string,
) {
  return useQuery<ProductListResponse, Error>({
    queryKey: ["sellerProducts", page, limit, isActive, q],
    queryFn: () => getSellerProducts(page, limit, isActive, q),
    placeholderData: keepPreviousData,
  });
}


 export function usePostSeller() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => postSellerProducts(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sellerProducts"] });
    },
    onError: (error: unknown) => {
      console.error("Failed to post seller product:", error);
    },
  });
}
