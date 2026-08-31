"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Gallery } from "@/types/gallery";
import GalleryCard from "./GalleryCard";

interface GalleryHorizontalProps {
  items: Gallery[];
}

export default function GalleryHorizontal({ items }: GalleryHorizontalProps) {
  const normalizedItems = useMemo(
    () => [...items].sort((a, b) => a.sort_order - b.sort_order),
    [items]
  );

  const [isHovered, setIsHovered] = useState(false);

  if (!normalizedItems.length) {
    return null;
  }

  // Duplicate items to ensure a seamless infinite scrolling loop
  const repeatedItems = [...normalizedItems, ...normalizedItems, ...normalizedItems, ...normalizedItems];

  return (
    <section className="relative w-full overflow-hidden py-16 select-none bg-neutral-50/50 mt-12 mb-12 border-y border-black/[0.03]">
      <div 
        className="flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={{ x: isHovered ? undefined : ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: Math.max(normalizedItems.length * 6, 20),
              ease: "linear",
            },
          }}
          className="flex gap-10 px-5 w-max"
          style={{ x: 0 }}
        >
          {repeatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[85vw] sm:w-[50vw] lg:w-[32vw] max-w-[480px] flex-shrink-0 transition-transform duration-500 hover:scale-[1.02]"
            >
              <GalleryCard
                item={item}
                isActive={true}
                unmuted={false} // Ensure videos stay muted
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}