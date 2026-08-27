"use client";

import Image from "next/image";
import { useState } from "react";

import type { Project } from "@/types/project";

type Props = {
  experience: Project;
};

export default function ExperienceGallery({
  experience,
}: Props) {
  /* ==========================================================
     GALLERY

     The FIRST uploaded gallery image is the
     MAIN EXPERIENCE IMAGE.

     sort_order determines upload/order position.
  ========================================================== */

  const images = [...(experience.images ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  const [currentIndex, setCurrentIndex] =
    useState(0);

  /* ==========================================================
     NO GALLERY IMAGES
  ========================================================== */

  if (images.length === 0) {
    return (
      <div
        className="
          flex
          h-full
          min-h-[400px]
          w-full
          items-center
          justify-center
          bg-neutral-100
          text-xs
          font-medium
          uppercase
          tracking-[0.25em]
          text-neutral-400
        "
      >
        No photos available
      </div>
    );
  }

  /* ==========================================================
     NAVIGATION
  ========================================================== */

  const goNext = () => {
    setCurrentIndex((index) =>
      index === images.length - 1
        ? 0
        : index + 1
    );
  };

  const goPrevious = () => {
    setCurrentIndex((index) =>
      index === 0
        ? images.length - 1
        : index - 1
    );
  };

  const currentImage =
    images[currentIndex];

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div
      className="
        relative
        h-full
        min-h-[400px]
        w-full
        overflow-hidden
        bg-neutral-100
      "
    >
      {/* ======================================================
          CURRENT IMAGE
      ====================================================== */}

      <Image
        key={currentImage.id}
        src={currentImage.image_url}
        alt={`${experience.lesson_title} — photo ${
          currentIndex + 1
        }`}
        fill
        sizes="
          (max-width: 1024px) 100vw,
          58vw
        "
        className="object-cover"
        priority={currentIndex === 0}
      />

      {/* ======================================================
          BOTTOM GRADIENT
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-40
          bg-gradient-to-t
          from-black/40
          via-black/5
          to-transparent
        "
      />

      {/* ======================================================
          IMAGE COUNTER
      ====================================================== */}

      {images.length > 1 && (
        <div
          className="
            absolute
            bottom-6
            left-6
            rounded-full
            bg-black/60
            px-4
            py-2
            text-xs
            font-medium
            text-white
            backdrop-blur-md
          "
        >
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* ======================================================
          NAVIGATION
      ====================================================== */}

      {images.length > 1 && (
        <>
          {/* Previous */}

          <button
            type="button"
            onClick={goPrevious}
            aria-label="Previous photo"
            className="
              absolute
              left-5
              top-1/2

              flex
              h-12
              w-12

              -translate-y-1/2

              items-center
              justify-center

              rounded-full

              bg-white/90

              text-xl
              text-black

              shadow-lg
              backdrop-blur-md

              transition-all
              duration-300

              hover:scale-105
              hover:bg-white
            "
          >
            ←
          </button>

          {/* Next */}

          <button
            type="button"
            onClick={goNext}
            aria-label="Next photo"
            className="
              absolute
              right-5
              top-1/2

              flex
              h-12
              w-12

              -translate-y-1/2

              items-center
              justify-center

              rounded-full

              bg-white/90

              text-xl
              text-black

              shadow-lg
              backdrop-blur-md

              transition-all
              duration-300

              hover:scale-105
              hover:bg-white
            "
          >
            →
          </button>
        </>
      )}
    </div>
  );
}