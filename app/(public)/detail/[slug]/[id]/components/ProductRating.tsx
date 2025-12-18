import Image from "next/image";
import React from "react";

// type ProductRatingProp = {
//     ratings:rating
// }

const ProductRating: React.FC = () => {
  return (
    <div className="my-4">
      <div className="flex items-center gap-3 mb-5">
        <Image
          src="/icons/Store.svg"
          width={50}
          height={50}
          alt="store"
          className="rounded-full"
        />
        <div>
          <h3 className="text-sm md:text-md font-bold">John Doe</h3>
          <h4 className="text-sm md:text-md">25 August 2025, 13:38</h4>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-2">
        <Image
          src="/icons/Star.svg"
          alt="svg"
          className="w-4"
          width={20}
          height={20}
        />
        <Image
          src="/icons/Star.svg"
          alt="svg"
          className="w-4"
          width={20}
          height={20}
        />
        <Image
          src="/icons/Star.svg"
          alt="svg"
          className="w-4"
          width={20}
          height={20}
        />
        <Image
          src="/icons/Star.svg"
          alt="svg"
          className="w-4"
          width={20}
          height={20}
        />
        <Image
          src="/icons/Star.svg"
          alt="svg"
          className="w-4"
          width={20}
          height={20}
        />
      </div>

      <p className="text-sm md:text-md">
        Lorem ipsum dolor sit amet consectetur. Pulvinar porttitor aliquam
        viverra nunc sed facilisis. Integer tristique nullam morbi mauris ante.
      </p>
    </div>
  );
};

export default ProductRating;
