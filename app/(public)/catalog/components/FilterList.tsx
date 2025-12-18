"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useCategories } from "@/hooks/useCategory";
import Image from "next/image";
import React, { ChangeEvent } from "react";

interface FilterListProps {
  selected: number[];
  onChange: (id: number, checked: boolean) => void;
  valueMinPrice: string; // controlled value must be string
  onChangeMinPrice: (e: ChangeEvent<HTMLInputElement>) => void;
  valueMaxPrice: string;
  onChangeMaxPrice: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FilterList: React.FC<FilterListProps> = ({
  onChange,
  selected,
  onChangeMinPrice,
  onChangeMaxPrice,
  valueMinPrice,
  valueMaxPrice,
}) => {
  const { data: categories, isLoading: loadingCategories } = useCategories();
  return (
    <div className="w-full md:w-67 rounded-xl border border-neutral-300">
      <div className="flex flex-col px-4 mt-3">
        <div className="text-md font-bold mb-3">FILTER</div>
        <div className="text-md font-semibold mb-3">Categories</div>

        {/* "All" option */}
        {/* <div className="flex items-center gap-2 text-md">
          <Checkbox
            checked={selected.length === categories?.categories.length}
            onCheckedChange={(checked) => {
              if (checked) {
                // select all
                categories?.categories.forEach((c) => onChange(c.id, true));
              } else {
                // deselect all
                categories?.categories.forEach((c) => onChange(c.id, false));
              }
            }}
          />
          <span>All</span>
        </div> */}

        {/* Category list */}
        {!loadingCategories &&
          categories?.categories.map((c) => (
            <div className="flex items-center gap-2 text-md" key={c.id}>
              <Checkbox
                className="cursor-pointer"
                checked={selected.includes(c.id)}
                onCheckedChange={(checked) => onChange(c.id, !!checked)}
              />
              <span>{c.name}</span>
            </div>
          ))}
      </div>

      <hr className="border my-3 md:my-6" />

      <div className="flex flex-col px-4">
        <div className="text-md font-semibold mb-3">Price</div>
        <div className="relative mb-3">
          <input
            type="number"
            className="h-12 border border-neutral-300 rounded-md w-full ps-13"
            placeholder="Minimum Price"
            onChange={(e) => onChangeMinPrice?.(e)} // safe optional call
            value={valueMinPrice ?? ""}
          />
          <div className="absolute top-1.5 left-1.5 w-[38px] h-[38px] bg-neutral-200 rounded-xs flex items-center justify-center">
            Rp
          </div>
        </div>
        <div className="relative">
          <input
            type="number"
            className="h-12 border border-neutral-300 rounded-md w-full ps-13"
            placeholder="Maximum Price"
            onChange={(e) => onChangeMaxPrice?.(e)} // safe optional call
            value={valueMaxPrice ?? ""}
          />
          <div className="absolute top-1.5 left-1.5 w-[38px] h-[38px] bg-neutral-200 rounded-xs flex items-center justify-center">
            Rp
          </div>
        </div>
      </div>

      <hr className="border my-3 md:my-6" />

      <div className="flex flex-col px-4">
        <div className="text-md font-semibold mb-3">Price</div>

        <div className="flex items-center center gap-2 h-12 px-2">
          <Checkbox className="me-1" />
          <Image src="/icons/Star.svg" width={15} height={15} alt="star" />
          <span className="text-sm md:text-md">5</span>
        </div>
        <div className="flex items-center center gap-2 h-12 px-2">
          <Checkbox className="me-1" />
          <Image src="/icons/Star.svg" width={15} height={15} alt="star" />
          <span className="text-sm md:text-md">4</span>
        </div>
        <div className="flex items-center center gap-2 h-12 px-2">
          <Checkbox className="me-1" />
          <Image src="/icons/Star.svg" width={15} height={15} alt="star" />
          <span className="text-sm md:text-md">3</span>
        </div>
        <div className="flex items-center center gap-2 h-12 px-2">
          <Checkbox className="me-1" />
          <Image src="/icons/Star.svg" width={15} height={15} alt="star" />
          <span className="text-sm md:text-md">2</span>
        </div>
        <div className="flex items-center center gap-2 h-12 px-2 mb-3">
          <Checkbox className="me-1" />
          <Image src="/icons/Star.svg" width={15} height={15} alt="star" />
          <span className="text-sm md:text-md">1</span>
        </div>
      </div>
    </div>
  );
};

export default FilterList;
