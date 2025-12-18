import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { ApiError } from "@/types/Api.type";
import { productSchema } from "@/lib/validation/product.validation";
import z from "zod";
import { postSellerProducts } from "@/services/product.service"; // ✅ Import direct service

const useSellerProductForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<z.input<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: 0,
      images: [],
    },
  });

  const onSubmit: SubmitHandler<z.input<typeof productSchema>> = async (
    data
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description || "");
      formData.append("price", data.price.toString());
      formData.append("stock", data.stock.toString());
      formData.append("categoryId", data.categoryId.toString());

      data.images?.forEach((file) => formData.append("images", file));

      // ✅ Directly call your backend API
      await postSellerProducts(formData);

      reset();
      router.push("/seller/products");
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      console.error("Failed to add product:", err.response?.data?.message);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    reset,
    onSubmit,
    setValue,
    watch,
  };
};

export default useSellerProductForm;
