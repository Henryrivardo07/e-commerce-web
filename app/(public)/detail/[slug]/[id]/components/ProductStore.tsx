import { Button } from "@/components/ui/button";
import { getValidImage } from "@/lib/getValidImage";
import { Shop } from "@/types/Shop.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductStoreProp = {
  productShop: Shop;
};

const ProductStore: React.FC<ProductStoreProp> = ({ productShop }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Image
          src={getValidImage(productShop.logo!) || "/icons/Store.svg"}
          alt={getValidImage(productShop.logo!) || "/icons/Store.svg"}
          width={50}
          height={50}
          className="object-cover rounded-full"
          unoptimized
        />
        <div className="flex flex-col justify-center">
          <h4 className="text-sm md:text-md font-bold">{productShop.name}</h4>
          <h4 className="text-sm md:text-md font-normal">{productShop.slug}</h4>
        </div>
      </div>
      <Link href={`/shop/${productShop.slug}/${productShop.id}`} passHref>
        <Button className="cursor-pointer" variant={"outline"} size={"sm"}>
          See Store
        </Button>
      </Link>
    </div>
  );
};

export default ProductStore;
