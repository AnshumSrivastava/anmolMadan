"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Gallery } from "@/types/gallery";

interface GalleryCardProps {
  item: Gallery;
  isActive: boolean;
}

export default function GalleryCard({
  item,
  isActive,
}: GalleryCardProps) {
  return (
    <motion.div
      data-card
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      animate={{
        scale: isActive ? 1 : 0.94,
        opacity: isActive ? 1 : 0.55,
        filter: isActive ? "blur(0px)" : "blur(1px)",
      }}
      className="gallery-card flex-shrink-0"
    >
      <div
        className={`
          relative
          overflow-hidden
          rounded-3xl
          bg-zinc-900
          transition-all
          duration-700
          ease-out

          ${
            isActive
              ? "shadow-[0_25px_90px_rgba(255,255,255,0.08)]"
              : "shadow-[0_15px_50px_rgba(0,0,0,0.35)]"
          }

          w-[45vw]
          h-[55vh]

          max-w-[700px]
          min-w-[340px]
        `}
      >
        <Image
          src={item.image}
          alt={item.caption ?? "Gallery"}
          fill
          priority={isActive}
          sizes="(max-width:768px) 90vw, (max-width:1200px) 55vw, 45vw"
          className={`
            object-cover
            transition-all
            duration-700
            ease-out
            ${isActive ? "scale-100" : "scale-105"}
            hover:scale-110
          `}
        />
      </div>

      {item.caption && (
        <motion.p
          animate={{
            opacity: isActive ? 1 : 0.4,
            y: isActive ? 0 : 5,
          }}
          transition={{
            duration: 0.4,
          }}
          className="mt-5 text-center text-xs uppercase tracking-[0.35em] text-zinc-400"
        >
          {item.caption}
        </motion.p>
      )}
    </motion.div>
  );
}