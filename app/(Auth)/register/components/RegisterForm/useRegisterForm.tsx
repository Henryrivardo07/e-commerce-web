import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  TRegisterSchema,
} from "@/lib/validation/auth.validation";
import type { AxiosError } from "axios";
import type { ApiError } from "@/types/Api.type";
import { registerUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const useRegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending, isError, error } = useMutation<
    Awaited<ReturnType<typeof registerUser>>,
    AxiosError<ApiError>,
    Omit<TRegisterSchema, "confirmPassword">
  >({
    mutationFn: (data) => registerUser(data.name, data.email, data.password),
    onSuccess: () => {
      router.push("/login");
      reset();
    },
  });

  const onSubmit = (data: TRegisterSchema) => {
    // drop confirmPassword before sending
    const { confirmPassword, ...rest } = data;
    mutate(rest);
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

export default useRegisterForm;
