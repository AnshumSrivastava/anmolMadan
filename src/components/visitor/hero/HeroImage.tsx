import Image from "next/image";
import { Hero } from "@/types/hero";

type Props = {
  hero: Hero;
};

export default function HeroImage({ hero }: Props) {
  return (
    <div
      className="
      relative

       h-[1500px]
    w-[900px]
    "
    >
      {/* Glow */}

      <div
        className="
        absolute

        inset-0

        rounded-full

        bg-black/[0.03]

        blur-[160px]
      "
      />

      {hero.hero_image && (
        <Image
          src={hero.hero_image}
          alt={hero.title_line_1}
          fill
          priority
          sizes="900px"
          className="
          object-contain

          object-bottom
scale-[1.45]

    drop-shadow-[0_60px_120px_rgba(0,0,0,.18)]
        "
        />
      )}
    </div>
  );
}