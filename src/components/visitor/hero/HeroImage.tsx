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
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full max-h-[82vh] w-full items-end justify-center lg:justify-end select-none pointer-events-none pb-3 sm:pb-6 pr-2 sm:pr-6"
    >
      {/* Dynamic Responsive Container based on viewport height & width */}
      <div className="relative flex h-[clamp(320px,56vh,480px)] w-[clamp(270px,46vh,410px)] items-end justify-center">

        {/* Ambient Depth Glow */}
        <div
          aria-hidden="true"
          className="
            absolute
            bottom-0
            left-1/2
            -translate-x-1/2
            h-[90%]
            w-[90%]
            rounded-full
            bg-radial
            from-neutral-400/20
            via-neutral-300/5
            to-transparent
            dark:from-black/70
            dark:via-neutral-900/30
            dark:to-transparent
            blur-2xl
          "
        />

        {/* =========================================================
            1. VISIBLE DIV: FULL CIRCLE BACKGROUND
            - Dynamically scales with viewport height (aspect-square)
            - Anchored at bottom-0 with clean border and natural shadow
        ========================================================= */}
        <div
          className="
            absolute
            bottom-15
            left-1/2
            -translate-x-1/2
            w-full
            aspect-square
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
          {/* Subtle radial lighting on the circular surface */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-radial from-white/20 via-transparent to-black/30 dark:from-white/5 dark:to-black/60 pointer-events-none"
          />
        </div>

        {/* =========================================================
            2. INVISIBLE DIV: TALL CLIPPING CONTAINER
            - Same width & bottom-0 as the circle
            - Generous top headroom (-top-[35%]) scaling dynamically
            - Circular at bottom (rounded-b-full), Rectangular at top (rounded-t-none)
        ========================================================= */}
        <div
          className="
            absolute
            -top-[40%]
            bottom-15
            left-1/2
            -translate-x-1/2
            w-full
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