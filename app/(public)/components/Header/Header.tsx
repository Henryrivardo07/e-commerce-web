"use client";

import Image from "next/image";
import React, { useState } from "react";
import BtnUnprotected from "./components/BtnUnprotected";
import BtnProtected from "./components/BtnProtected";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { Search, X } from "lucide-react";

const Header: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data, isLoading } = useCart();

  return (
    <div>
      <nav className="flex justify-between items-center px-4 md:px-30 py-3 md:py-5 shadow-sm shadow-[#CBCACA40]">
        <Link href="/" className="flex items-center gap-2 md:w-40">
          <Image
            src="/icons/Logo.svg"
            alt="logo"
            className="w-8 md:w-11 mr-1"
            width={45}
            height={10}
          />
          <div className="hidden md:inline display-xs font-bold">Shirt</div>
        </Link>
        <div className="flex gap-2 md:gap-3 md:w-162">
          <Link
            href="/catalog"
            passHref
            className="border border-neutral-300 rounded-xl flex items-center gap-2 p-3"
          >
            <Image
              src="/icons/Category-box.svg"
              alt="logo"
              className="w-5"
              width={10}
              height={10}
            />
            <span className="hidden md:inline text-sm me-4">Catalog</span>
          </Link>
          <div className="relative mr-2 w-full">
            <input
              type="text"
              placeholder="Search"
              className="border border-neutral-300 py-2 px-10 rounded-xl w-full"
            />
            <Search className="absolute text-neutral-500 top-2 left-3 w-5" />
          </div>
        </div>
        {!isLoading && user && (
          <Link href="/cart" className="relative py-3 pr-2" passHref>
            <Image
              src="/icons/Shopping-cart.svg"
              alt="shoping-cart"
              className="w-5"
              width={10}
              height={10}
            />
            {data && data.items && data.items.length > 0 && (
              <div className="w-5 h-5 rounded-full bg-red-500 text-white flex justify-center items-center absolute top-0 right-0">
                {data.items.length}
              </div>
            )}
          </Link>
        )}
        {/* Icon Menu Mobile */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <Image
            src="/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button>

        {/* Button Menu Desktop */}
        <div className="hidden md:inline ">
          {user == null ? <BtnUnprotected /> : <BtnProtected />}
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-white dark:bg-black ">
            <div className="flex justify-between items-center px-4 h-16 mb-4 shadow-sm">
              <span className="text-lg font-bold">Menu</span>
              <div onClick={() => setIsOpen(false)} aria-label="Close menu">
                <X width={20} height={20} />
              </div>
            </div>

            {/* Menu items */}
            <div className="px-4">
              {user == null ? (
                <BtnUnprotected />
              ) : (
                <>
                  <BtnProtected />
                  <div className="py-4">
                    <ul className="text-sm w-full">
                      <li className="rounded-md hover:bg-neutral-100 h-12 flex items-center px-4 py-2">
                        <div className="relative w-4 h-4 me-2">
                          <Image src="/icons/order.svg" fill alt="order" />
                        </div>
                        Order List
                      </li>
                      <li className="rounded-md hover:bg-neutral-100 h-12 flex items-center px-4 py-2">
                        <div className="relative w-4 h-4 me-2">
                          <Image src="/icons/review.svg" fill alt="review" />
                        </div>
                        Review
                      </li>
                      <li className="rounded-md hover:bg-neutral-100 h-12 flex items-center px-4 py-2">
                        <div className="relative w-4 h-4 me-2">
                          <Image src="/icons/logout.svg" fill alt="logout" />
                        </div>
                        <span className="text-accent-red">Logout</span>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
