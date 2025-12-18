"use client";

import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="md:flex justify-between md:w-full md:gap-45 py-10 md:py-20">
      <div className="">
        <div className="flex items-center gap-2 mb-6">
          <Image
            src="/icons/Logo.svg"
            alt="logo"
            className="w-8 md:w-11 mr-1"
            width={45}
            height={10}
          />
          <div className="display-xs font-bold">Shirt</div>
        </div>
        <p className="text-sm mb-4 md:mb-10">
          Explore a realm of style with our fashion e-commerce platform, where
          shopping is effortless. Experience a smooth journey with an extensive
          selection of trendy apparel, all delivered directly to your home.
        </p>
        <span className="text-sm font-bold">Follow on Social Media</span>

        <div className="flex items-center mt-5 gap-3 mb-4">
          <a
            href="#"
            className="flex justify-center h-10 w-10 border rounded-full"
          >
            <div className="relative w-full h-full">
              <Image src="/icons/fb.svg" fill alt="fb" className="p-2" />
            </div>
          </a>
          <a
            href="#"
            className="flex justify-center items-center h-10 w-10 border rounded-full"
          >
            <div className="relative w-full h-full">
              <Image
                src="/icons/instagram.svg"
                fill
                alt="instagram"
                className="p-2"
              />
            </div>
          </a>
          <a
            href="#"
            className="flex justify-center h-10 w-10 border rounded-full"
          >
            <div className="relative w-full h-full">
              <Image
                src="/icons/linkedin.svg"
                fill
                alt="linkedin"
                className="p-2"
              />
            </div>
          </a>
          <a
            href="#"
            className="flex justify-center h-10 w-10 border rounded-full"
          >
            <div className="relative w-full h-full">
              <Image
                src="/icons/tiktok.svg"
                fill
                alt="tiktok"
                className="p-2"
              />
            </div>
          </a>
        </div>
      </div>
      <div className="mb-4 w-full">
        <p className="font-bold mb-5">E-Commerce</p>
        <ul>
          <li className="mb-5">
            <a href="#">About Us</a>
          </li>
          <li className="mb-5">
            <a href="#">Terms &amp; Condition</a>
          </li>
          <li className="mb-5">
            <a href="#">Privacy Policy</a>
          </li>
          <li className="mb-5">
            <a href="#">Blog</a>
          </li>
        </ul>
      </div>
      <div className="w-full">
        <p className="font-bold mb-5">Help</p>
        <ul>
          <li className="mb-5">
            <a href="#">How to Transact</a>
          </li>
          <li className="mb-5">
            <a href="#">Payment Method</a>
          </li>
          <li className="mb-5">
            <a href="#">How to Register</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
