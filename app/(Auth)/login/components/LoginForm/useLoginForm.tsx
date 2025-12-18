import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/validation/auth.validation";
import type { UserAuthTypes } from "@/types/Auth.type";
import type { AxiosError } from "axios";
import type { ApiError } from "@/types/Api.type";
import { loginUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

const useLoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserAuthTypes>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending, isError, error } = useMutation<
    Awaited<ReturnType<typeof loginUser>>,
    AxiosError<ApiError>,
    UserAuthTypes
  >({
    mutationFn: (data: UserAuthTypes) => loginUser(data.email, data.password),
    onSuccess: (data) => {
      if (!data.token) {
        console.error("Login succeeded but token is null");
        return;
      }
      login(data.token); // ✅ update state & localStorage
      reset();

      router.push("/");
    },
  });

  const onSubmit = (data: UserAuthTypes) => {
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

export default useLoginForm;
