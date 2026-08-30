"use client";

import { motion } from "framer-motion";
import { Josefin_Sans } from "next/font/google";

const heroFont = Josefin_Sans({
  subsets: ["latin"],
  weight: "400",
});

type Props = {
  title: string;
};

export default function HeroTitle({ title }: Props) {
  const letters = title.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.032,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 18,
        stiffness: 140,
      },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`
        ${heroFont.className}
        inline-flex
        flex-wrap
        justify-center
        whitespace-nowrap
        text-[clamp(3.4rem,8.2vw,9.5rem)]
        font-normal
        uppercase
        leading-[0.82]
        tracking-[-0.085em]
        text-black
        select-none
      `}
    >
      {letters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letterVariants}
          className="inline-block"
          style={{ willChange: "transform, opacity" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}
