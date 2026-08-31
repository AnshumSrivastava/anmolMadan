"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 120], [1, 0]);
  const y = useTransform(scrollY, [0, 120], [0, 20]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.button
      type="button"
      onClick={scrollToAbout}
      style={{ opacity, y }}
      className="
        group
        absolute
        bottom-6
        left-1/2
        z-50
        -translate-x-1/2
        flex
        flex-col
        items-center
        gap-2.5
        cursor-pointer
        border-none
        bg-transparent
        p-2
        outline-none
      "
      aria-label="Scroll to about section"
    >
      <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-neutral-400 transition-colors duration-300 group-hover:text-black">
        Scroll
      </span>
      <div className="relative h-9 w-5 rounded-full border border-neutral-300 p-1 transition-colors duration-300 group-hover:border-black">
        <motion.div
          animate={{
            y: [0, 14, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-1.5 w-1.5 rounded-full bg-neutral-600 group-hover:bg-black"
        />
      </div>
    </motion.button>
  );
}
