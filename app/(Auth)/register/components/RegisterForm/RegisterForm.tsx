"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import useRegisterForm from "./useRegisterForm";
import { InputComp } from "@/components/ui/input";
import { toast } from "sonner";

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isPending,
    isError,
    error,
  } = useRegisterForm();

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message);
    }
  }, [isError, error]);

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div className="grid gap-2">
          <InputComp
            label="Name"
            type="text"
            {...register("name")}
            error={errors && errors.name && errors.name.message}
          />
        </div>
        <div className="grid gap-2">
          <InputComp
            label="Email"
            type="email"
            {...register("email")}
            error={errors && errors.email && errors.email.message}
          />
        </div>
        <div className="grid gap-2">
          <InputComp
            label="Password"
            type="password"
            {...register("password")}
            error={errors && errors.password && errors.password.message}
          />
        </div>
        <div className="grid gap-2">
          <InputComp
            label="Confirm Password"
            type="password"
            {...register("confirmPassword")}
            error={
              errors && errors.confirmPassword && errors.confirmPassword.message
            }
          />
        </div>
      </div>
      <Button
        className="w-full cursor-pointer"
        type="submit"
        disabled={isPending}
      >
        Submit
      </Button>
    </form>
  );
};

export default RegisterForm;
