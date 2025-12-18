"use client";

import LoginForm from "@/app/(Auth)/login/components/LoginForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-dvh bg-neutral-100">
      <Card className="w-full md:w-113">
        <CardHeader>
          <CardTitle>
            <span className="display-xs font-bold text-black">Shirt</span>
          </CardTitle>
          <CardDescription>
            <span className="display-xs font-bold text-black">Login</span>
            <p className="text-sm md:text-md">
              Access your account and start shopping in seconds
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <p className="text-sm font-regular text-neutral-950">
            Don&apos;t have an account?{" "}
            <Link href={"/register"} className="font-bold underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
