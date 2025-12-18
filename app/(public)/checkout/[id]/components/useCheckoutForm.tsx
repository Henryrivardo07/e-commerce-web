import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { AxiosError } from "axios";
import type { ApiError } from "@/types/Api.type";
import { PostOrderCheckout } from "@/services/order.service";
import { checkoutOrderSchema } from "@/lib/validation/order.validation";
import type { CheckoutFormData } from "@/types/Checkout.type";

const useCheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutOrderSchema),
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      postalCode: "",
      address: "",
      shippingMethod: "",
    },
  });

  const { mutate, isPending, isError, error, isSuccess, data } = useMutation<
    Awaited<ReturnType<typeof PostOrderCheckout>>,
    AxiosError<ApiError>,
    CheckoutFormData
  >({
    mutationFn: async (formData) => {
      const { shippingMethod, ...address } = formData;
      return await PostOrderCheckout(address, shippingMethod);
    },
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => mutate(data);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    setValue,
    watch,
    isPending,
    isError,
    error,
    isSuccess,
    data,
  };
};

export default useCheckoutForm;
