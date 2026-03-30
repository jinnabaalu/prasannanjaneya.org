"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    titleKey: "slide1Title" as const,
    subtitleKey: "slide1Subtitle" as const,
    image: "/images/gallery/bakthi.png",
  },
  {
    titleKey: "slide2Title" as const,
    subtitleKey: "slide2Subtitle" as const,
    image: "/images/gallery/bajana.png",
  },
  {
    titleKey: "slide3Title" as const,
    subtitleKey: "slide3Subtitle" as const,
    image: "/images/gallery/veera.jpg",
  },
  {
    titleKey: "slide4Title" as const,
    subtitleKey: "slide4Subtitle" as const,
    image: "/images/gallery/vijayam.png",
  },
];

export default function HeroBanner() {
  const t = useTranslations("home");
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden">
      {/* Background images - truly responsive, scales with viewport */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          } ${i === 0 ? "relative" : "absolute inset-0"}`}
        >
          <Image
            src={s.image}
            alt=""
            width={1920}
            height={600}
            className="block w-full h-auto"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-black/40" />

      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        {/* Previous button */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40 sm:left-6 sm:p-3"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Slide content */}
        <div className="text-center">
          <h1
            key={`title-${current}`}
            className="text-3xl font-bold text-white drop-shadow-lg animate-[fadeInUp_0.6s_ease-out_0.1s_both] sm:text-5xl lg:text-6xl"
          >
            {t(slide.titleKey)}
          </h1>
          <p
            key={`sub-${current}`}
            className="mt-4 text-lg text-white/90 drop-shadow-md animate-[fadeInUp_0.6s_ease-out_0.2s_both] sm:text-xl lg:text-2xl"
          >
            {t(slide.subtitleKey)}
          </p>
          <div
            key={`line-${current}`}
            className="mx-auto mt-6 h-1 w-24 rounded bg-white/60 animate-[scaleIn_0.5s_ease-out_0.3s_both]"
          />
        </div>

        {/* Next button */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40 sm:right-6 sm:p-3"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
