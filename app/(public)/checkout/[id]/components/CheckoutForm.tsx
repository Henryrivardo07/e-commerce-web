"use client";

import React from "react";
import { InputComp } from "@/components/ui/input";
import { TextareaComp } from "@/components/ui/TextareaComp";
import { CheckoutFormData } from "@/types/Checkout.type";
import type {
  UseFormHandleSubmit,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";

interface CheckoutFormProps {
  handleSubmit: UseFormHandleSubmit<CheckoutFormData>;
  onSubmit: (data: CheckoutFormData) => void;
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  isPending?: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  isPending = false,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-3" noValidate>
      <InputComp
        {...register("name")}
        label="Name"
        error={errors?.name?.message}
      />
      <InputComp
        {...register("phone")}
        label="Phone"
        error={errors?.phone?.message}
      />
      <InputComp
        {...register("city")}
        label="City"
        error={errors?.city?.message}
      />
      <InputComp
        {...register("postalCode")}
        label="Postal Code"
        error={errors?.postalCode?.message}
      />
      <TextareaComp
        {...register("address")}
        label="Address"
        error={errors?.address?.message}
      />

      {/* Hidden submit so parent can trigger handleSubmit/onSubmit or user can press Enter */}
      <button type="submit" className="hidden" aria-hidden />
    </form>
  );
};

export default CheckoutForm;
