"use client";

import Image from "next/image";
import { Hero } from "@/types/hero";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

type Props = {
  hero: Hero;
};

export default function HeroImage({ hero }: Props) {
  if (!hero.hero_image) return null;

  /* ==========================================================
     MAGNETIC MOUSE TILT (Desktop Only)
     Stronger tilt range (±7°) for a more pronounced 3D pop.
  ========================================================== */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Stronger tilt — more dramatic 3D depth perception
  const rotateX = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.15 });
  const rotateY = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.15 });

  // Separate glow position — moves at different speed than image for parallax
  const glowX = useSpring(mouseX, { stiffness: 40, damping: 18, mass: 0.3 });
  const glowY = useSpring(mouseY, { stiffness: 40, damping: 18, mass: 0.3 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;  // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      mouseX.set(x * 7);   // rotateY ±7°
      mouseY.set(-y * 5);  // rotateX ±5°
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      /* Entrance: slides up + scales in from slightly smaller */
      initial={{ y: 60, opacity: 0, scale: 0.94 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        delay: 0.5,
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative h-full w-full overflow-visible [transform-style:preserve-3d]"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1400,
      }}
    >
      {/* Parallax ambient glow — moves slower than image for depth */}
      <motion.div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[40%]
          h-[70%]
          w-[70%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-neutral-200/60
          blur-[120px]
        "
        style={{
          x: glowX,
          y: glowY,
        }}
      />

      {/* SUBJECT IMAGE */}
      <Image
        src={hero.hero_image}
        alt={hero.title_line_1 || "Anmol Madan"}
        width={1050}
        height={1400}
        priority
        sizes="(min-width: 1536px) 950px, (min-width: 1024px) 52vw, 90vw"
        className="
          absolute
          bottom-0
          left-1/2
          h-full
          w-auto
          max-w-none
          -translate-x-1/2
          object-contain
          object-bottom
          scale-[1.32]
          lg:scale-[1.48]
          origin-bottom
          drop-shadow-[0_60px_120px_rgba(0,0,0,0.18)]
          select-none
          pointer-events-none
        "
      />
    </motion.div>
  );
}