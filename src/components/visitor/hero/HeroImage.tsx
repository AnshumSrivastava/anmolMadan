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

          Desktop/tablet sizing is based primarily on WIDTH.

          This prevents a shorter laptop viewport from making
          the avatar unnecessarily tiny.

          Internal proportions remain completely fixed.
      ===================================================== */}

      <div
        className="
          relative
          aspect-square
          shrink-0

          w-[clamp(360px,28vw,540px)]

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

            dark:from-black/70
            dark:via-neutral-900/30
            dark:to-transparent
          "
        />

        {/* =====================================================
            CIRCLE
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

            bg-[#beb49e]
            dark:bg-[#2c2a26]

            border
            border-neutral-400/40
            dark:border-neutral-700/80

            shadow-[0_20px_45px_rgba(0,0,0,0.18)]
            dark:shadow-[0_25px_55px_rgba(0,0,0,0.85)]

            overflow-hidden
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute
              inset-0

              bg-radial
              from-white/20
              via-transparent
              to-black/30

              dark:from-white/5
              dark:to-black/60

              pointer-events-none
            "
          />
        </div>

        {/* =====================================================
            PERSON

            IMPORTANT:

            This geometry stays fixed relative to the stage.

            Therefore:
              circle/body ratio = same
              head/circle ratio = same
              body overlap = same

            Only the whole stage scales.
        ===================================================== */}

        <div
          className="
            absolute

            left-1/2
            bottom-0

            -translate-x-1/2

            w-[84%]
            h-[118%]

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
            className="
              absolute

              left-1/2
              bottom-0

              -translate-x-1/2

              h-[120%]
              w-auto

              max-w-none

              scale-[1.22]

              origin-bottom

              translate-y-[calc(8%+65px)]

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