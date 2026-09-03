import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Reveal from "@/components/shared/Reveal";

export default function CTA() {
  return (
    <Reveal delay={0.15}>
      <section
        className="
          mt-32
          overflow-hidden
          rounded-[40px]
          border
          border-zinc-200
          bg-zinc-50
          dark:border-neutral-800
          dark:bg-neutral-900/60
        "
      >
        <div className="mx-auto max-w-5xl px-8 py-20 text-center md:px-16">
          {/* Section Label */}
          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-[0.35em]
              text-zinc-500
              dark:text-neutral-400
            "
          >
            LET&apos;S CONNECT
          </p>

          {/* Heading */}
          <h2
            className="
              mt-6
              text-4xl
              font-semibold
              tracking-tight
              text-black
              dark:text-white
              md:text-6xl
            "
          >
            Ready to Build
            <br />
            Something Exceptional?
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-justify
              [text-justify:inter-word]
              text-lg
              leading-8
              text-zinc-600
              dark:text-neutral-300
            "
          >
            Whether you're building a company, growing a brand, or looking
            for long-term strategic guidance, I'd love to hear about your
            vision.
          </p>

          {/* CTA Button */}
          <Link
            href="#contact"
            className="
              group
              mt-12
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-black
              bg-black
              px-8
              py-4
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-white
              transition-all
              duration-300
              hover:px-10
              dark:border-white
              dark:bg-white
              dark:text-black
            "
          >
            Let's Work Together

            <ArrowRight
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-2
              "
            />
          </Link>
        </div>
      </section>
    </Reveal>
  );
}