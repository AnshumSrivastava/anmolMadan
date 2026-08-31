"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import type { Project } from "@/types/project";

import ExperienceGallery from "./ExperienceGallery";
import ExperienceTestimonials from "./ExperienceTestimonials";
import ExperienceComments from "./ExperienceComments";

type Props = {
  experience: Project;
  onClose: () => void;
};

export default function ExperienceModal({
  experience,
  onClose,
}: Props) {
  const [mounted, setMounted] = useState(false);

  /* ==========================================================
     MOUNT
  ========================================================== */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ==========================================================
     ESCAPE KEY
  ========================================================== */

  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mounted, onClose]);

  /* ==========================================================
     LOCK PAGE SCROLL
  ========================================================== */

  useEffect(() => {
    if (!mounted) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted]);

  /* ==========================================================
     DON'T RENDER PORTAL DURING SSR
  ========================================================== */

  if (!mounted) {
    return null;
  }

  /* ==========================================================
     MODAL
  ========================================================== */

  return createPortal(
    <div
      className="
        fixed
        inset-0
        z-[99999]

        flex
        items-center
        justify-center

        overflow-hidden

        bg-black/60
        p-3
        backdrop-blur-md

        sm:p-5
        lg:p-8
      "
      style={{
        width: "100vw",
        height: "100dvh",
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {/* ======================================================
          MODAL CONTAINER
      ====================================================== */}

      <div
        className="
          relative

          flex
          min-h-0
          min-w-0

          overflow-hidden

          rounded-[28px]

          bg-white dark:bg-black

          shadow-[0_40px_120px_rgba(0,0,0,0.30)]

          sm:rounded-[30px]
        "
        style={{
          width: "min(1400px, 92vw)",
          height: "min(900px, 92dvh)",
        }}
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        {/* ====================================================
            CLOSE
        ==================================================== */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close experience"
          className="
            absolute
            right-5
            top-5
            z-[100]

            flex
            h-11
            w-11
            shrink-0

            items-center
            justify-center

            rounded-full

            bg-black

            text-[20px]
            leading-none
            text-white

            shadow-lg

            transition-all
            duration-300

            hover:scale-105
            hover:bg-neutral-800

            active:scale-95
          "
        >
          ×
        </button>

        {/* ====================================================
            LEFT — GALLERY
        ==================================================== */}

        <div
          className="
            relative
            hidden

            min-h-0
            min-w-0
            shrink-0

            overflow-hidden

            bg-neutral-100 dark:bg-neutral-800

            lg:block
          "
          style={{
            width: "55%",
          }}
        >
          <ExperienceGallery
            experience={experience}
          />
        </div>

        {/* ====================================================
            RIGHT — CONTENT
        ==================================================== */}

        <div
          className="
            min-h-0
            min-w-0
            shrink-0

            overflow-y-auto
            overflow-x-hidden

            bg-white dark:bg-black
          "
          style={{
            width: "45%",
          }}
        >
          <div
            className="
              w-full
              min-w-0

              px-7
              pb-12
              pt-20

              sm:px-9

              lg:px-10
              lg:pb-14
              lg:pt-12

              xl:px-12
            "
          >
            {/* ==================================================
                INSTITUTION
            ================================================== */}

            {experience.institution_name && (
              <p
                className="
                  max-w-full

                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  leading-relaxed

                  text-neutral-400

                  sm:text-xs
                "
              >
                {experience.institution_name}
              </p>
            )}

            {/* ==================================================
                TITLE
            ================================================== */}

            <h2
              className="
                mt-4

                w-full
                max-w-full

                text-4xl
                font-semibold
                leading-[0.98]
                tracking-[-0.055em]

                text-black dark:text-white

                sm:text-5xl
                xl:text-[3.5rem]

                break-words
              "
            >
              {experience.lesson_title}
            </h2>

            {/* ==================================================
                DURATION
            ================================================== */}

            {experience.duration && (
              <div
                className="
                  mt-6

                  inline-flex
                  max-w-full

                  rounded-full

                  bg-neutral-100 dark:bg-neutral-800

                  px-4
                  py-2

                  text-xs
                  leading-5
                  text-neutral-600 dark:text-neutral-400

                  sm:text-sm
                "
              >
                {experience.duration}
              </div>
            )}

            {/* ==================================================
                INSTITUTION BADGE
            ================================================== */}

            {experience.institution_logo_url && (
              <div
                className="
                  mt-7

                  flex
                  h-[68px]
                  w-[68px]
                  shrink-0

                  items-center
                  justify-center

                  overflow-hidden

                  rounded-2xl

                  border
                  border-neutral-200 dark:border-neutral-800

                  bg-white dark:bg-black

                  p-3

                  shadow-[0_8px_30px_rgba(0,0,0,0.08)]

                  transition-transform
                  duration-300

                  hover:scale-105
                "
              >
                <Image
                  src={experience.institution_logo_url}
                  alt={
                    experience.institution_name ||
                    "Institution logo"
                  }
                  width={48}
                  height={48}
                  className="
                    h-full
                    w-full
                    object-contain
                  "
                />
              </div>
            )}

            {/* ==================================================
                DESCRIPTION
            ================================================== */}

            {experience.description && (
              <div className="mt-7 w-full">
                <p
                  className="
                    w-full
                    max-w-[620px]

                    whitespace-pre-line

                    text-[15px]
                    leading-7

                    text-neutral-600 dark:text-neutral-400

                    sm:text-base
                    sm:leading-8
                  "
                >
                  {experience.description}
                </p>
              </div>
            )}

            {/* ==================================================
                MOBILE GALLERY
            ================================================== */}

            <div
              className="
                mt-9
                w-full
                lg:hidden
              "
            >
              <ExperienceGallery
                experience={experience}
              />
            </div>

            {/* ==================================================
                TESTIMONIALS
            ================================================== */}

            {experience.testimonials &&
              experience.testimonials.length > 0 && (
                <div
                  className="
                    mt-12
                    w-full

                    border-t
                    border-neutral-100 dark:border-neutral-800

                    pt-10
                  "
                >
                  <p
                    className="
                      mb-6

                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.35em]

                      text-neutral-400

                      sm:text-xs
                    "
                  >
                    Student Testimonials
                  </p>

                  <div className="w-full min-w-0">
                    <ExperienceTestimonials
                      testimonials={
                        experience.testimonials
                      }
                    />
                  </div>
                </div>
              )}

            {/* ==================================================
                FACEBOOK-STYLE COMMENTS & DISCUSSIONS
            ================================================== */}
            <ExperienceComments projectId={experience.id} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}