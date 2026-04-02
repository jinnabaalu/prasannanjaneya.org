"use client";

import Image from "next/image";

interface EventImageCollageProps {
  images: string[];
  title: string;
}

// 6-image masonry pattern: large, small, tall, small, wide, small
const sizeClasses = [
  "col-span-2 row-span-2", // large featured
  "col-span-1 row-span-1", // small square
  "col-span-1 row-span-2", // tall vertical
  "col-span-1 row-span-1", // small square
  "col-span-2 row-span-1", // wide horizontal
  "col-span-1 row-span-1", // small square
];

export default function EventImageCollage({
  images,
  title,
}: EventImageCollageProps) {
  return (
    <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-3 md:gap-4 lg:auto-rows-[240px]">
      {images.map((src, index) => (
        <div
          key={index}
          className={`${sizeClasses[index % sizeClasses.length]} group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl`}
        >
          <Image
            src={src}
            alt={`${title} - Photo ${index + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
