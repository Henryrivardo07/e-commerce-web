"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="py-7">
      <div className="bg-[#F3D7A4] rounded-xl pt-2 flex items-center">
        <Image
          src="/img/hero-img.png"
          alt="hero-img"
          className="h-46 md:h-94 mt-2 w-fit"
          width={376}
          height={376}
        />

        <div className="flex flex-col">
          <div className="text-[#553E32]">
            <span className="inline md:hidden text-md font-bold">
              NEW COLLECTION
            </span>
            <span className="hidden md:inline display-3xl font-bold">
              NEW COLLECTION
            </span>
          </div>
          <div className="md:py-4 text-[#553E32]">
            <span className="inline md:hidden text-xs font-semibold">
              Stylish men&apos;s apparel for every occasion
            </span>
            <span className="hidden md:inline display-xs font-semibold">
              Stylish men&apos;s apparel for every occasion
            </span>
          </div>
          <Button
            size={"sm"}
            className="w-23 md:w-45 h-7 md:h-12 md:12 mt-4 text-xs md:text-md"
          >
            Get Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
