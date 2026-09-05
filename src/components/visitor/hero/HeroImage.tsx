"use client";

import Image from "next/image";
import { Hero } from "@/types/hero";
import { motion } from "framer-motion";

type Props = {
  hero: Hero;
};

export default function HeroImage({ hero }: Props) {
  if (!hero.hero_image) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.94,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        flex
        h-full
        w-full
        items-center
        justify-center
        lg:justify-end
        pointer-events-none
        select-none
      "
    >
      {/* =====================================================
          MASTER AVATAR STAGE
      ===================================================== */}

      <div
        className="
          relative
          aspect-square
          shrink-0
          w-[clamp(240px,30vw,540px)]
          max-w-[90vw]
          translate-y-[1vh]
        "
      >

        {/* =====================================================
            AMBIENT GLOW
        ===================================================== */}

        <div
          aria-hidden="true"
          className="
            absolute
            left-1/2
            top-[56%]

            h-[82%]
            w-[82%]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-radial
            from-neutral-400/20
            via-neutral-300/5
            to-transparent

            blur-2xl

            dark:from-white/20
            dark:via-neutral-900/30
            dark:to-transparent
          "
        />

        {/* =====================================================
            CIRCLE
            LIGHT MODE  → BLACK
            DARK MODE   → WHITE
        ===================================================== */}

        <div
          className="
            absolute

            left-1/2
            top-[58%]

            -translate-x-1/2
            -translate-y-1/2

            aspect-square
            w-[84%]

            rounded-full

            bg-black
            dark:bg-white

            border
            border-neutral-700/40
            dark:border-white/60

            shadow-[0_20px_45px_rgba(0,0,0,0.18)]
            dark:shadow-[0_25px_55px_rgba(255,255,255,0.15)]

            overflow-hidden
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute
              inset-0

              bg-radial
              from-white/10
              via-transparent
              to-black/30

              dark:from-black/5
              dark:via-transparent
              dark:to-black/10

              pointer-events-none
            "
          />
        </div>

        {/* =====================================================
            PERSON
        ===================================================== */}

        <div
          className="
            absolute

            left-1/2
            bottom-0

            -translate-x-1/2

            w-[84%]
            h-[135%]

            overflow-hidden

            rounded-b-full
            rounded-t-none

            pointer-events-none

            flex
            items-end
            justify-center
          "
        >
          <Image
            src={hero.hero_image}
            alt={hero.pre_heading || "Anmol Madan"}
            width={1000}
            height={1400}
            priority
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 380px, 540px"
            className="
              absolute

              left-1/2
              bottom-0

              -translate-x-1/2

              h-[125%]
              w-auto

              max-w-none

              scale-[1.12]

              origin-bottom

              translate-y-[calc(4%+68px)]

              object-contain
              object-bottom

              drop-shadow-[0_15px_25px_rgba(0,0,0,0.25)]
              dark:drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]
            "
          />
        </div>

      </div>
    </motion.div>
  );
}