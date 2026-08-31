"use client";

import Reveal from "@/components/shared/Reveal";
import { Josefin_Sans } from "next/font/google";

const displayFont = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

type Props = {
  line1: string;
  line2?: string;
  italic?: boolean;
};

export default function StatementBreaker({ line1, line2, italic = false }: Props) {
  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-black py-16 sm:py-20 flex items-center justify-center">
      {/* Subtle ambient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-40 bg-gradient-to-b from-neutral-100/0 via-neutral-100/60 to-neutral-100/0 dark:via-neutral-900/40 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p
            className={`
              ${displayFont.className}
              text-3xl sm:text-4xl md:text-[2.8rem] lg:text-5xl
              leading-[1.18]
              tracking-[-0.015em]
              text-neutral-900 dark:text-neutral-100
            `}
          >
            <span className="block font-light opacity-75">{line1}</span>
            {line2 && (
              <span className={`block font-semibold opacity-100 mt-1 ${italic ? "italic" : ""}`}>
                {line2}
              </span>
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
