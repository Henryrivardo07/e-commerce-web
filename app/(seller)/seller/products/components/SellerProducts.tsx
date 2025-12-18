import { Button } from "@/components/ui/button";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSellerProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { getValidImage } from "@/lib/getValidImage";
import Link from "next/link";

const SellerProducts: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);

  const { data, isLoading, isError, isPending } = useSellerProducts(
    page,
    limit
  );

  if (isError)
    return <div className="p-10 text-red-500">Failed to load products</div>;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <Link href="/seller/products/form" passHref>
          <Button className="w-full md:w-45" size={`sm`}>
            <Plus width={12} /> Add Product
          </Button>
        </Link>

        <div className="relative mr-2 w-full md:w-65">
          <input
            type="text"
            placeholder="Search"
            className="border border-neutral-300 py-2 px-10 rounded-xl w-full bg-white"
          />
          <Search className="absolute text-neutral-500 top-2 left-3 w-5" />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold w-3">No</TableHead>
            <TableHead className="font-bold">Product Info</TableHead>
            <TableHead className="font-bold">Price</TableHead>
            <TableHead className="font-bold">Stock</TableHead>
            <TableHead className="font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableCell className="font-medium" key={i}>
                  <Skeleton key={i} className="h-10 w-full rounded-lg" />
                </TableCell>
              ))}
            </TableRow>
          ) : data?.products.length == 0 ? (
            <TableRow>
              <TableCell className="font-medium text-center" colSpan={5}>
                <div>No products yet</div>
              </TableCell>
            </TableRow>
          ) : (
            data?.products.map((p, i) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      src={getValidImage(p.images[0])}
                      alt={p.title}
                      width={50}
                      height={80}
                      className="object-cover rounded-sm"
                      unoptimized
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{p.title}</span>
                      <span className="text-sm text-neutral-600">
                        {p.category.name}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>Rp{p.price.toLocaleString("id-ID")}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Eye width={16} className="cursor-pointer" />
                    <Pencil width={16} className="cursor-pointer" />
                    <Trash2
                      width={16}
                      className="text-accent-red cursor-pointer"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-neutral-800 text-sm">
              Showing 1 to 10 of 60 entries
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-between">
                <span className="text-sm flex items-center gap-2">
                  <ChevronLeft width={15} />
                  Previous
                </span>
                <span>1</span>
                <span>2</span>
                <span className="text-sm flex items-center gap-2">
                  Next <ChevronRight width={15} />
                </span>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default SellerProducts;
