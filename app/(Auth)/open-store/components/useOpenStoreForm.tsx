import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { AxiosError } from "axios";
import type { ApiError } from "@/types/Api.type";
import { useRouter } from "next/navigation";
import {
  openStoreSchema,
  TOpenStoreSchema,
} from "@/lib/validation/seller.validation";
import { PostSellerActivate } from "@/services/seller.service";
import { OpenStoreTypes } from "@/types/Seller.type";

const useOpenStore = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OpenStoreTypes>({
    resolver: zodResolver(openStoreSchema),
  });

  const { mutate, isPending, isError, error } = useMutation<
    Awaited<ReturnType<typeof PostSellerActivate>>,
    AxiosError<ApiError>,
    OpenStoreTypes
  >({
    mutationFn: (data: OpenStoreTypes) =>
      PostSellerActivate(data.name, data.slug, data.address),
    onSuccess: () => {
      router.push("/");
      reset();
    },
  });

  const onSubmit = (data: TOpenStoreSchema) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    reset,
    onSubmit,
    isPending,
    isError,
    error,
  };
};

export default useOpenStore;
