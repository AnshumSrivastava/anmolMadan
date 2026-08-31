"use client";

import { Hero } from "@/types/hero";
import { ArrowRight } from "lucide-react";

type Props = {
  hero: Hero;
};

export default function HeroContent({ hero }: Props) {
  return (
    <div className="w-full max-w-[430px]">
      {/* Description */}
      <p className="text-[clamp(15px,1.05vw,18px)] leading-[1.65] text-neutral-600">
        {hero.description}
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {/* BOOK A CALL */}
        <a
          href="#contact"
          className="
            inline-flex
            shrink-0
            items-center
            justify-center
            gap-2.5
            rounded-full
            bg-black
            px-7
            py-3.5
            text-xs
            font-semibold
            uppercase
            tracking-[0.1em]
            text-white
            shadow-md
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-neutral-800
            active:scale-95
          "
        >
          Book a Call
          <ArrowRight className="h-3.5 w-3.5" />
        </a>

        {/* LEARN MORE */}
        <a
          href="#about"
          className="
            inline-flex
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-neutral-300
            bg-white
            px-7
            py-3.5
            text-xs
            font-semibold
            uppercase
            tracking-[0.1em]
            text-neutral-800
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-black
            hover:text-black
            active:scale-95
          "
        >
          Learn More
        </a>
      </div>
    </div>
  );
}