"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion } from "framer-motion";

import type { Gallery } from "@/types/gallery";

import GalleryCard from "./GalleryCard";

interface GalleryHorizontalProps {
  items: Gallery[];
}

/* =========================================================
   COMPONENT
========================================================= */

export default function GalleryHorizontal({
  items,
}: GalleryHorizontalProps) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  /* =======================================================
     NORMALIZE

     Keep original order from Supabase.
  ======================================================= */

  const normalizedItems = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          a.sort_order - b.sort_order
      ),
    [items]
  );

  /* =======================================================
     NEXT
  ======================================================= */

  const goNext = useCallback(() => {
    setActiveIndex((current) => {
      if (!normalizedItems.length) {
        return 0;
      }

      return (
        (current + 1) %
        normalizedItems.length
      );
    });
  }, [normalizedItems.length]);

  /* =======================================================
     PREVIOUS
  ======================================================= */

  const goPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (!normalizedItems.length) {
        return 0;
      }

      return (
        (current -
          1 +
          normalizedItems.length) %
        normalizedItems.length
      );
    });
  }, [normalizedItems.length]);

  /* =======================================================
     KEYBOARD NAVIGATION
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "ArrowRight") {
        goNext();
      }

      if (event.key === "ArrowLeft") {
        goPrevious();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [goNext, goPrevious]);

  /* =======================================================
     EMPTY
  ======================================================= */

  if (!normalizedItems.length) {
    return null;
  }

  /* =======================================================
     BUILD 3 CARD WINDOW

     Previous | Active | Next

     We don't need to render all videos at once.
  ======================================================= */

  const previousIndex =
    (activeIndex -
      1 +
      normalizedItems.length) %
    normalizedItems.length;

  const nextIndex =
    (activeIndex + 1) %
    normalizedItems.length;

  const visibleCards =
    normalizedItems.length === 1
      ? [
          {
            item: normalizedItems[0],
            position: "active" as const,
          },
        ]
      : normalizedItems.length === 2
        ? [
            {
              item: normalizedItems[
                previousIndex
              ],
              position: "side" as const,
            },
            {
              item: normalizedItems[
                activeIndex
              ],
              position: "active" as const,
            },
            {
              item: normalizedItems[
                nextIndex
              ],
              position: "side" as const,
            },
          ]
        : [
            {
              item: normalizedItems[
                previousIndex
              ],
              position: "side" as const,
            },
            {
              item: normalizedItems[
                activeIndex
              ],
              position: "active" as const,
            },
            {
              item: normalizedItems[
                nextIndex
              ],
              position: "side" as const,
            },
          ];

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      className="
        relative
        w-full
      "
    >
      {/* ===================================================
          TOP CONTROLS
      =================================================== */}

      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1500px]
          items-center
          justify-between
          px-6
          lg:px-10
        "
      >
        {/* Counter */}

        <motion.div
          key={activeIndex}
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.3em]
            text-neutral-400
          "
        >
          {String(
            activeIndex + 1
          ).padStart(2, "0")}
          {" "}
          /{" "}
          {String(
            normalizedItems.length
          ).padStart(2, "0")}
        </motion.div>

        {/* Arrows */}

        {normalizedItems.length > 1 && (
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            {/* PREVIOUS */}

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
                bg-black
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:bg-neutral-800
                active:scale-95
              "
            >
              <ChevronLeft
                size={16}
                strokeWidth={1.8}
              />
            </button>

            {/* NEXT */}

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
                bg-black
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:bg-neutral-800
                active:scale-95
              "
            >
              <ChevronRight
                size={16}
                strokeWidth={1.8}
              />
            </button>
          </div>
        )}
      </div>

      {/* ===================================================
          VIDEO STAGE
      =================================================== */}

      <div
        className="
          relative
          mt-8
          w-full
          overflow-hidden
        "
      >
        <div
          className="
            mx-auto
            flex
            w-full
            items-center
            justify-center
            gap-5
            px-0
            lg:gap-8
          "
        >
          {visibleCards.map(
            ({
              item,
              position,
            }) => {
              const isActive =
                position === "active";

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: isActive
                      ? 1
                      : 0.55,
                    scale: isActive
                      ? 1
                      : 0.9,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className={`
                    flex-shrink-0

                    ${
                      isActive
                        ? `
                          w-[72vw]
                          sm:w-[68vw]
                          lg:w-[52vw]
                          xl:w-[48vw]
                          max-w-[720px]
                        `
                        : `
                          hidden
                          sm:block
                          w-[26vw]
                          lg:w-[27vw]
                          xl:w-[25vw]
                          max-w-[420px]
                        `
                    }
                  `}
                  onClick={() => {
                    if (!isActive) {
                      if (
                        position === "side"
                      ) {
                        if (
                          item.id ===
                          normalizedItems[
                            previousIndex
                          ].id
                        ) {
                          goPrevious();
                        } else {
                          goNext();
                        }
                      }
                    }
                  }}
                >
                  <GalleryCard
                    item={item}
                    isActive={isActive}
                    onEnded={
                      isActive
                        ? goNext
                        : undefined
                    }
                  />
                </motion.div>
              );
            }
          )}
        </div>
      </div>

      {/* ===================================================
          DOTS
      =================================================== */}

      {normalizedItems.length > 1 && (
        <div
          className="
            mt-7
            flex
            items-center
            justify-center
            gap-2
          "
        >
          {normalizedItems.map(
            (item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to testimonial ${
                  index + 1
                }`}
                onClick={() =>
                  setActiveIndex(index)
                }
                className="
                  group
                  flex
                  h-5
                  items-center
                  justify-center
                "
              >
                <span
                  className={`
                    block
                    h-1
                    rounded-full
                    transition-all
                    duration-500

                    ${
                      index ===
                      activeIndex
                        ? "w-8 bg-black"
                        : "w-1.5 bg-neutral-300 group-hover:bg-neutral-500"
                    }
                  `}
                />
              </button>
            )
          )}
        </div>
      )}

      {/* ===================================================
          DRAG / NAVIGATION HINT
      =================================================== */}

      <div
        className="
          mt-4
          text-center
          text-[9px]
          font-medium
          uppercase
          tracking-[0.3em]
          text-neutral-300
        "
      >
        Use arrows to explore
      </div>
    </section>
  );
}