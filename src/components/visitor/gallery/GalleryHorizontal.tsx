"use client";

import { useEffect, useRef, useState } from "react";
import { Gallery } from "@/types/gallery";
import GalleryCard from "./GalleryCard";

interface GalleryHorizontalProps {
  items: Gallery[];
}

const CARD_WIDTH = 720; // approx card width + gap
const GAP = 32;

export default function GalleryHorizontal({
  items,
}: GalleryHorizontalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);

  const duplicated = [...items, ...items, ...items];

  useEffect(() => {
    if (!items.length) return;

    let frame: number;
    let last = performance.now();

    const speed = 0.15;

    const animate = (time: number) => {
      const delta = time - last;
      last = time;

      if (!paused) {
        setOffset((prev) => {
          let next = prev + speed * delta;

          const totalWidth = items.length * (CARD_WIDTH + GAP);

          if (next >= totalWidth) {
            next -= totalWidth;
          }

          return next;
        });
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [paused, items.length]);

  if (!items.length) return null;

  const center =
    Math.round(offset / (CARD_WIDTH + GAP)) % items.length;

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex items-center gap-8"
        style={{
          transform: `translateX(calc(50vw - ${CARD_WIDTH / 2}px - ${offset}px))`,
          width: "max-content",
          willChange: "transform",
        }}
      >
        {duplicated.map((item, index) => (
          <GalleryCard
            key={`${item.id}-${index}`}
            item={item}
            isActive={index % items.length === center}
          />
        ))}
      </div>
    </section>
  );
}