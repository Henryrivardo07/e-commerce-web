import { getValidImage } from "@/lib/getValidImage";
import Image from "next/image";
import React, { useState } from "react";

type ImageDetailProps = {
  images: string[];
};

const ImageDetail: React.FC<ImageDetailProps> = ({ images }) => {
  const [imgCount, setImgCount] = useState<number>(0);
  return (
    <div className="w-full md:w-110">
      {/* Main Image */}
      <div className="relative w-full aspect-square mb-4">
        <Image
          src={getValidImage(images[imgCount])}
          alt={`Product image ${imgCount + 1}`}
          fill
          className="object-cover rounded-xl"
          unoptimized
        />
      </div>

      {/* Thumbnails */}
      <div className="flex items-center gap-3 overflow-x-auto max-w-full scrollbar-none">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setImgCount(i)} // ✅ move click handler here
            className={`relative flex-shrink-0 w-20 h-20 rounded-xl cursor-pointer border ${
              imgCount === i ? "border-neutral-950" : "border-transparent"
            }`}
          >
            <Image
              src={getValidImage(img)}
              alt={`${img} thumbnail ${i + 1}`}
              fill
              className="object-cover rounded-xl p-1"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageDetail;
