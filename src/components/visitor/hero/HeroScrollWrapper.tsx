"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function HeroScrollWrapper({ children }: Props) {
  const { scrollY } = useScroll();

  // Transition mapped smoothly over the first 0 - 85vh of scroll
  const blurVal = useTransform(scrollY, [0, 480], [0, 20]);
  const filter = useMotionTemplate`blur(${blurVal}px)`;
  const opacity = useTransform(scrollY, [0, 260, 560], [1, 0.9, 0]);
  const scale = useTransform(scrollY, [0, 560], [1, 0.94]);
  const y = useTransform(scrollY, [0, 560], [0, -45]);

  return (
    <motion.div
      style={{
        filter,
        opacity,
        scale,
        y,
        transformOrigin: "center center",
      }}
      className="relative h-full w-full will-change-transform"
    >
      {children}
    </motion.div>
  );
}
