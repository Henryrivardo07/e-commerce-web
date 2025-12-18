"use client";

import React, { useState } from "react";
import { useProductById, useProducts } from "@/hooks/useProducts";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import ProductStore from "./ProductStore";
import QuantityCount from "@/app/(public)/components/QuantityCount";
import Product from "@/app/(public)/components/Product";
import { useAddCartItem } from "@/hooks/useCart";
import { toast } from "sonner";
import { getValidImage } from "@/lib/getValidImage";

interface ProductDetailProps {
  productId: number;
  slug: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId, slug }) => {
  const { data: product, isLoading } = useProductById(productId);
  const [quantityCount, setQuantityCount] = useState<number>(1);
  const { data: productList, isLoading: isLoadingProducts } = useProducts(1, 4);
  const products = productList?.products ?? [];

  const addCartMutation = useAddCartItem();

  const handleAdd = () => {
    addCartMutation.mutate(
      { productId, qty: quantityCount }, // 👈 pass productId + qty
      {
        onSuccess: (e) => {
          toast.success("Added to cart");
        },
        onError: (err) => {
          console.error("❌ Failed to add to cart:", err);
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (!product) return notFound();

  return (
    <section className="px-4 md:px-30 py-7">
      {/* breadcrumb */}
      <div className="flex items-center font-semibold gap-2 text-xs md:text-md mb-3 md:mb-6">
        <span>Home</span>
        <span>&gt;</span>
        <span>Detail</span>
        <span>&gt;</span>
        <span className="overflow-hidden text-ellipsis line-clamp-1 font-normal">
          {product.title}
        </span>
      </div>

      {/* top content */}
      <div className="flex flex-col md:flex-row md:gap-7">
        {/* Left: Images */}
        <Image
          src={getValidImage(product.images[0])}
          alt={product.title}
          width={400}
          height={400}
          className="rounded object-cover"
          unoptimized
        />

        {/* Right: Info */}
        <div className="py-4 md:pb-5 w-full">
          <h3 className="text-md md:text-xl text-ellipsis">{product?.title}</h3>
          <div className="py-2 font-bold text-xl">
            Rp{product.price.toLocaleString("id-ID")}
          </div>

          <div className="text-sm flex items-center gap-1 mb-2">
            <Image src="/icons/Star.svg" alt="star" width={20} height={20} />
            {product.rating === 0 ? "No rating yet" : `${product.rating} / 5`}
          </div>

          <hr className="border border-neutral-300 my-4" />
          <h4 className="text-md md:text-lg font-bold mb-1">Deskripsi</h4>
          <p className="text-sm md:text-md">{product?.description}</p>
          <hr className="border border-neutral-300 my-4" />

          <ProductStore productShop={product.shop} />

          <hr className="border border-neutral-300 my-4" />

          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm md:text-md">Quantity</span>
            <QuantityCount initial={1} onChange={setQuantityCount} />
          </div>

          <Button className="w-full md:w-80 cursor-pointer" onClick={handleAdd}>
            <Plus />
            <span>
              {addCartMutation.isPending ? "Adding..." : "Add to Cart"}
            </span>
          </Button>
        </div>
      </div>

      <hr className="border border-neutral-300 my-4" />

      {/* Recommendations */}
      <h1 className="font-bold mb-4">Related Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-10">
        {isLoadingProducts
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-100 w-full rounded-lg" />
            ))
          : products.map((p) => (
              <Link key={p.id} href={`/detail/${p.slug}/${p.id}`} passHref>
                <Product
                  productImg={p.images[0]}
                  title={p.title}
                  price={p.price}
                  rating={p.rating}
                  qtySold={p.soldCount}
                  isVerified={true}
                  MarketName={p.shop.name}
                />
              </Link>
            ))}
      </div>
    </section>
  );
};

export default ProductDetail;
