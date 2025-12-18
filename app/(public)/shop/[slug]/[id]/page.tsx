"use client";

import Product from "@/app/(public)/components/Product";
import { Product as ProductType } from "@/types/Product";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useShopBySlug } from "@/hooks/useProducts";

interface ShopDetailProps {
  params: Promise<{ slug: string; id: number }>;
}

const ShopDetail: React.FC<ShopDetailProps> = ({ params }) => {
  const { id, slug } = React.use(params);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const { data, isLoading, isPending } = useShopBySlug(page, limit, slug);
  const products = data?.products ?? [];
  const totalPages = data?.pagination.totalPages ?? 1;

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="px-4 md:px-30 py-7">
      <div className="flex justify-between items-center rounded-xl border border-neutral-300 w-full p-3 mb-4 md:mb-8">
        <div className="flex items-center gap-4">
          <Image
            src={data?.shop.logo || "/icons/Store.svg"}
            width={50}
            height={50}
            alt="shop-logo"
            className="rounded-full"
          />
          <div className="">
            <h1 className="text-sm md:text-md font-bold mb-2">
              {data?.shop.name}
            </h1>
            <h1 className="text-sm md:text-md">{data?.shop.address}</h1>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="text-sm flex items-center gap-1 mb-2">
            <Image
              src="/icons/Star.svg"
              alt="svg"
              className="w-4"
              width={20}
              height={20}
            />
            <span className="text-md md:text-xl">4.9</span>
          </div>
          <span className="text-xs md:text-md">Reviews dan Rating</span>
        </div>
      </div>

      <div className="w-full">
        <h1 className="font-bold mb-6">
          <span className="inline md:hidden display-xs">Products</span>
          <span className="hidden md:inline display-md">Products</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-4 md:mb-10">
        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-100 w-full rounded-lg" />
            ))}
          </>
        ) : (
          products.map((p: ProductType) => (
            <Link key={p.id} href={`/detail/${p.slug}/${p.id}`} passHref>
              <Product
                key={p.id}
                productImg={p.images[0]}
                title={p.title}
                price={p.price}
                rating={p.rating}
                qtySold={p.soldCount}
                isVerified={true}
                MarketName={p.shop?.name}
              />
            </Link>
          ))
        )}
      </div>

      {/* Load More */}
      {page < totalPages && (
        <div className="mb-10 md:mb-25 flex justify-center">
          <Button
            onClick={() => setLimit((prev) => prev + 4)}
            className="dark border border-neutral-300 hover:bg-neutral-100 rounded-xl w-40 md:w-55 cursor-pointer"
          >
            {isPending ? "Loading" : "Load More"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default ShopDetail;
