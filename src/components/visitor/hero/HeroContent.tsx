import { Hero } from "@/types/hero";
import { ArrowRight } from "lucide-react";

type Props = {
  hero: Hero;
};

export default function HeroContent({ hero }: Props) {
  return (
    <div className="max-w-[360px] pt-10">

      {/* Label */}

      <span
        className="
          text-xs
          font-semibold
          uppercase
          tracking-[0.45em]
          text-neutral-400
        "
      >
        About
      </span>

      {/* Description */}

      <p
        className="
          mt-8

          text-[18px]
          leading-[2]

          text-neutral-600
        "
      >
        {hero.description}
      </p>

      {/* Buttons */}

      <div className="mt-12 flex gap-5">

        <a
          href="#contact"
          className="
            inline-flex
            items-center
            gap-3

            rounded-full

            bg-black

            px-8
            py-4

            text-sm
            font-semibold
            uppercase
            tracking-[0.08em]

            text-white

            transition-all
            duration-300

            hover:-translate-y-1
          "
        >
          Book A Call

          <ArrowRight size={18} />
        </a>

        <a
  href="#about"
  className="
    inline-flex
    items-center
    justify-center

    rounded-full

    border
    border-black/20

    bg-white

    px-8
    py-4

    text-sm
    font-semibold
    uppercase
    tracking-[0.08em]

    text-black

    transition-all
    duration-300

    hover:bg-black
    hover:text-white
    hover:border-black
  "
>
  Learn More
</a>
      </div>

      <div className="mt-16 h-px w-24 bg-neutral-300" />
    </div>
  );
}