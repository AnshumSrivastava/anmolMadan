"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.2,
  });

  return (
    <>
      {/* Track */}
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-[70] h-[3px] bg-black/10 backdrop-blur-sm" />

      {/* Progress */}
      <motion.div
        style={{ scaleX }}
        className="
          pointer-events-none
          fixed
          left-0
          right-0
          top-0
          z-[71]

          h-[3px]

          origin-left

          rounded-r-full

          bg-white

          shadow-[0_0_12px_rgba(255,255,255,0.65)]
        "
      />
    </>
  );
}