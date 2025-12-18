"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import useLoginForm from "./useLoginForm";
import { InputComp } from "@/components/ui/input";
import { toast } from "sonner";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isPending,
    isError,
    error,
  } = useLoginForm();

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message);
    }
  }, [isError, error]);

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div className="">
          <InputComp
            label="Email"
            type="email"
            {...register("email")}
            error={errors && errors.email && errors.email.message}
          />
        </div>
        <div className="">
          <InputComp
            label="Password"
            type="password"
            {...register("password")}
            error={errors && errors.password && errors.password.message}
          />
        </div>
      </div>
      <Button
        className="w-full cursor-pointer"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
