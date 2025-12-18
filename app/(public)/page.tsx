"use client";

import { Button } from "@/components/ui/button";
import Hero from "./components/Hero";
import Product from "./components/Product";
import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { type Product as ProductType } from "@/types/Product";

export default function Home() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const { data, isLoading, isError, isPending } = useProducts(page, limit);

  if (isError)
    return <div className="p-10 text-red-500">Failed to load products</div>;

  const products = data?.products ?? [];
  const totalPages = data?.pagination.totalPages ?? 1;

  return (
    <section className="px-4 md:px-30">
      <Hero />
      <div className="py-1 font-bold">
        <span className="inline md:hidden display-xs">Featured Product</span>
        <span className="hidden md:inline display-lg">Featured Product</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 my-4 md:my-10">
        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-100 w-full rounded-lg" />
            ))}
          </>
        ) : products.length > 0 ? (
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
                MarketName={p.shop.name}
              />
            </Link>
          ))
        ) : (
          <div>No Products Yet</div>
        )}
      </div>

      {/* Load More */}
      {page < totalPages && (
        <div className="mb-10 md:mb-25 flex justify-center">
          <Button
            onClick={() => setLimit((prev) => prev + 8)}
            className="rounded-xl w-40 md:w-55 cursor-pointer"
            variant={"outline"}
          >
            {isPending ? "Loading" : "Load More"}
          </Button>
        </div>
      )}
    </section>
  );
}
