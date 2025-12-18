"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { InputComp } from "@/components/ui/input";
import { toast } from "sonner";
import useOpenStoreForm from "./useOpenStoreForm";
import { TextareaComp } from "@/components/ui/TextareaComp";

const OpenStoreForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    error,
    isPending,
    isError,
  } = useOpenStoreForm();

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message);
    }
  }, [isError, error]);

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <h2 className="text-sm md:text-md font-bold mb-2">STORE PROFILE</h2>
        <div className="">
          <InputComp
            label="Store Name"
            {...register("name")}
            error={errors && errors.name && errors.name.message}
          />
        </div>
        <div className="">
          <InputComp
            label="Store Domain"
            {...register("slug")}
            error={errors && errors.slug && errors.slug.message}
          />
        </div>
      </div>
      <hr className="border border-neutral-300 my-5 md:my-6" />
      <div className="flex flex-col">
        <h2 className="text-sm md:text-md font-bold mb-2">STORE ADDRESS</h2>
        <div className="">
          <InputComp label="City" />
        </div>
        <div className="">
          <InputComp label="Postal Code" />
        </div>
        <div className="">
          <TextareaComp
            label="Detail Address"
            {...register("address")}
            error={errors && errors.address && errors.address.message}
          />
        </div>
      </div>
      <Button
        className="w-full cursor-pointer"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Submiting..." : "Submit"}
      </Button>
    </form>
  );
};

export default OpenStoreForm;
