"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

import type { Project } from "@/types/project";

import ExperienceModal from "./ExperienceModal";

type Props = {
  experience: Project;
};

export default function ExperienceCard({
  experience,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  /* ==========================================================
     GALLERY

     First gallery image = MAIN EXPERIENCE IMAGE

     sort_order decides which gallery image
     should appear first.
  ========================================================== */

  const galleryImages = [
    ...(experience.images ?? []),
  ].sort(
    (a, b) =>
      a.sort_order - b.sort_order
  );

  const mainImage =
    galleryImages[0]?.image_url ??
    experience.image_url;

  return (
    <>
      {/* ======================================================
          CARD
      ====================================================== */}

      <motion.article
        onClick={() => setIsOpen(true)}
        initial={{
          boxShadow:
            "0 0 0 rgba(0,0,0,0)",
        }}
        whileHover={{
          y: -6,
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.08)",
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          group
          relative
          flex
          h-full
          cursor-pointer
          flex-col
          overflow-hidden
          rounded-[28px]
          border
          border-neutral-200
          bg-[#f7f7f7]
        "
      >
        {/* ====================================================
            IMAGE
        ==================================================== */}

        <div
          className="
            relative
            aspect-[4/3]
            overflow-hidden
            bg-neutral-200
          "
        >
          {mainImage ? (
            <motion.div
              initial={{
                scale: 1.06,
                filter: "blur(5px)",
              }}
              whileInView={{
                scale: 1,
                filter: "blur(0px)",
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                inset-0
              "
            >
              <Image
                src={mainImage}
                alt={experience.lesson_title}
                fill
                sizes="
                  (max-width: 768px) 100vw,
                  (max-width: 1280px) 50vw,
                  33vw
                "
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.05]
                "
              />
            </motion.div>
          ) : (
            <div
              className="
                flex
                h-full
                items-center
                justify-center
                text-sm
                uppercase
                tracking-[0.2em]
                text-neutral-400
              "
            >
              No Image
            </div>
          )}

          {/* ==================================================
              IMAGE OVERLAY
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/35
              via-black/5
              to-transparent
            "
          />

          {/* ==================================================
              DURATION
          ================================================== */}

          {experience.duration && (
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.55,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                bottom-5
                left-5
                rounded-full
                bg-white/95
                px-4
                py-2
                text-xs
                font-medium
                text-black
                shadow-sm
              "
            >
              {experience.duration}
            </motion.div>
          )}
        </div>

        {/* ====================================================
            CONTENT
        ==================================================== */}

        <div
          className="
            relative
            flex
            flex-1
            flex-col
            p-7
          "
        >
          {/* ==================================================
              INSTITUTION
          ================================================== */}

          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.55,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mb-4
              pr-16
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-neutral-400
            "
          >
            {experience.institution_name}
          </motion.p>

          {/* ==================================================
              LESSON TITLE
          ================================================== */}

          <motion.h3
            initial={{
              opacity: 0,
              y: 18,
              filter: "blur(5px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              pr-16
              text-2xl
              font-semibold
              leading-tight
              tracking-[-0.03em]
              text-neutral-950
            "
          >
            {experience.lesson_title}
          </motion.h3>

          {/* ==================================================
              INSTITUTION LOGO / BADGE

              Positioned beside the title.
          ================================================== */}

          {experience.institution_logo_url && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.65,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
                delay: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                right-7
                top-[58px]

                flex
                h-12
                w-12

                items-center
                justify-center

                overflow-hidden
                rounded-full

                border
                border-neutral-200

                bg-white

                p-2

                shadow-sm

                transition-all
                duration-300

                group-hover:scale-110
                group-hover:shadow-md
              "
            >
              <Image
                src={
                  experience.institution_logo_url
                }
                alt={
                  experience.institution_name
                }
                width={40}
                height={40}
                className="
                  h-full
                  w-full
                  object-contain
                "
              />
            </motion.div>
          )}

          {/* ==================================================
              DESCRIPTION
          ================================================== */}

          {experience.description && (
            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.65,
                delay: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-4
                line-clamp-3
                text-[15px]
                leading-7
                text-neutral-500
              "
            >
              {experience.description}
            </motion.p>
          )}

          {/* ==================================================
              FOOTER
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-auto
              flex
              items-center
              justify-between
              pt-7
            "
          >
            {/* View */}

            <span
              className="
                text-sm
                font-medium
                text-black
              "
            >
              View experience
            </span>

            {/* Arrow */}

            <motion.span
              whileHover={{
                rotate: -45,
              }}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-neutral-200
                text-lg
                text-black
                transition-all
                duration-300
                group-hover:bg-black
                group-hover:text-white
              "
            >
              →
            </motion.span>
          </motion.div>
        </div>
      </motion.article>

      {/* ======================================================
          MODAL
      ====================================================== */}

      {isOpen && (
        <ExperienceModal
          experience={experience}
          onClose={() =>
            setIsOpen(false)
          }
        />
      )}
    </>
  );
}