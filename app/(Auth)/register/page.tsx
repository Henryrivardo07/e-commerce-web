"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import RegisterForm from "./components/RegisterForm";

const Register = () => {
  return (
    <div className="flex justify-center items-center h-dvh bg-neutral-100">
      <Card className="w-full md:w-113 mx-6">
        <CardHeader>
          <CardTitle>
            <span className="display-xs font-bold text-black">Shirt</span>
          </CardTitle>
          <CardDescription>
            <span className="display-xs font-bold text-black">Register</span>
            <p className="text-sm md:text-md">
              Just a few steps away from your next favorite purchase
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Register Form */}
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <p className="text-sm font-regular text-neutral-950">
            Already have an account?{" "}
            <Link href={"/login"} className="font-bold underline">
              Log In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
