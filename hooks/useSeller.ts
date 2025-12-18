import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSellerShop,
  PostSellerActivate,
  PatchSellerShop,
} from "@/services/seller.service";
import { Shop } from "@/types/Shop.type";

// 🟢 Get Seller Shop Info
export function useSellerShop() {
  return useQuery<Shop>({
    queryKey: ["sellerShop"],
    queryFn: getSellerShop,
  });
}

// 🟢 Create or Activate Seller Shop
export function usePostSellerActivate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      slug,
      address,
      logo,
    }: {
      name: string;
      slug: string;
      address?: string;
      logo?: string;
    }) => PostSellerActivate(name, slug, address, logo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sellerShop"] });
    },
    onError: (error: unknown) => {
      console.error("Failed to activate seller:", error);
    },
  });
}

// 🟢 Update Seller Shop Info
export function usePatchSellerShop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      address,
      isActive,
    }: {
      name: string;
      address: string;
      isActive: boolean;
    }) => PatchSellerShop(name, address, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sellerShop"] });
    },
    onError: (error: unknown) => {
      console.error("Failed to update seller shop:", error);
    },
  });
}
