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
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-[70] h-[2px] bg-black/[0.06] backdrop-blur-sm" />

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

          h-[2.5px]

          origin-left

          rounded-r-full

          bg-black

          shadow-[0_1px_6px_rgba(0,0,0,0.25)]
        "
      />
    </>
  );
}