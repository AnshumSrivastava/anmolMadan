import Image from "next/image";
import { Hero } from "@/types/hero";

type Props = {
  hero: Hero;
};

export default function HeroImage({ hero }: Props) {
  if (!hero.hero_image) return null;

  return (
    <div
      className="
        relative
        h-full
        w-full
        overflow-visible
      "
    >
      {/* Soft glow */}

      <div
        className="
          pointer-events-none
          absolute

          left-1/2
          top-[35%]

          h-[70%]
          w-[70%]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-black/[0.025]

          blur-[120px]
        "
      />

      {/* Person */}

      <Image
        src={hero.hero_image}
        alt={hero.title_line_1 || "Anmol Madan"}
        width={1200}
        height={1600}
        priority
        sizes="
          (min-width: 1536px) 1050px,
          (min-width: 1024px) 58vw,
          100vw
        "
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

          scale-[1.28]

          origin-bottom

          drop-shadow-[0_60px_120px_rgba(0,0,0,0.16)]
        "
      />
    </div>
  );
}