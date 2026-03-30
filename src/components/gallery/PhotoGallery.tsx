"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/types/gallery";

interface PhotoGalleryProps {
  images: GalleryImage[];
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            onClick={() => setSelectedIndex(index)}
            className="group relative overflow-hidden rounded-lg"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute right-4 top-4 text-3xl text-white hover:text-saffron-300"
            onClick={() => setSelectedIndex(null)}
          >
            ✕
          </button>

          {/* Previous */}
          {selectedIndex > 0 && (
            <button
              className="absolute left-4 text-4xl text-white hover:text-saffron-300"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex - 1);
              }}
            >
              ‹
            </button>
          )}

          <Image
            src={images[selectedIndex].src}
            alt={images[selectedIndex].alt}
            width={images[selectedIndex].width}
            height={images[selectedIndex].height}
            className="max-h-[80vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {selectedIndex < images.length - 1 && (
            <button
              className="absolute right-4 text-4xl text-white hover:text-saffron-300"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex + 1);
              }}
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
