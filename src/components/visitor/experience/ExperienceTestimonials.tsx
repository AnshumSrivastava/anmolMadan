"use client";

import { useState } from "react";

import type {
  ProjectTestimonial,
} from "@/types/project";

type Props = {
  testimonials: ProjectTestimonial[];
};

export default function ExperienceTestimonials({
  testimonials,
}: Props) {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  if (
    !testimonials ||
    testimonials.length === 0
  ) {
    return null;
  }

  const current =
    testimonials[currentIndex];

  const goNext = () => {
    setCurrentIndex((index) =>
      index === testimonials.length - 1
        ? 0
        : index + 1
    );
  };

  const goPrevious = () => {
    setCurrentIndex((index) =>
      index === 0
        ? testimonials.length - 1
        : index - 1
    );
  };

  return (
    <div className="relative">
      {/* ==================================================
          TESTIMONIAL CARD
      ================================================== */}

      <div
        className="
          rounded-[22px]
          border
          border-neutral-200 dark:border-neutral-800
          bg-neutral-50 dark:bg-neutral-900
          p-6
          sm:p-7
        "
      >
        {/* Quote */}

        <p
          className="
            text-[15px]
            leading-7
            text-neutral-700 dark:text-neutral-300
          "
        >
          “{current.quote}”
        </p>

        {/* ==================================================
            AUTHOR
        ================================================== */}

        {(current.author_name ||
          current.author_role) && (
          <div className="mt-6">
            {current.author_name && (
              <p
                className="
                  text-sm
                  font-semibold
                  text-black dark:text-white
                "
              >
                {current.author_name}
              </p>
            )}

            {current.author_role && (
              <p
                className="
                  mt-1
                  text-xs
                  text-neutral-400
                "
              >
                {current.author_role}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ==================================================
          CONTROLS
      ================================================== */}

      {testimonials.length > 1 && (
        <div
          className="
            mt-5
            flex
            items-center
            justify-between
          "
        >
          {/* Counter */}

          <p
            className="
              text-xs
              font-medium
              text-neutral-400
            "
          >
            {currentIndex + 1} /{" "}
            {testimonials.length}
          </p>

          {/* Arrows */}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous testimonial"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-neutral-200 dark:border-neutral-800
                bg-white dark:bg-black
                text-black dark:text-white
                transition-all
                duration-300
                hover:bg-black
                hover:text-white
              "
            >
              ←
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-neutral-200 dark:border-neutral-800
                bg-white dark:bg-black
                text-black dark:text-white
                transition-all
                duration-300
                hover:bg-black
                hover:text-white
              "
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}