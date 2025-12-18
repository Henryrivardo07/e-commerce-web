import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const BtnUnprotected = () => {
  return (
    <>
      <div className="grid grid-cols-2 md:flex items-center gap-3">
        <Button className="h-10 w-full md:w-35 p-0" variant={"outline"}>
          <Link
            href="/login"
            className="w-full h-full flex items-center justify-center"
          >
            Login
          </Link>
        </Button>
        <Button className="h-10 w-full md:w-35 p-0">
          <Link
            href="/register"
            className="w-full h-full flex items-center justify-center"
          >
            Register
          </Link>
        </Button>
      </div>
    </>
  );
};

export default BtnUnprotected;
