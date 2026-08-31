"use client";

import { Hero } from "@/types/hero";

type Props = {
  hero: Hero;
};

export default function HeroContent({ hero }: Props) {
  return (
    <div className="relative z-30 max-w-[360px] sm:max-w-[420px] lg:max-w-[470px]">
      {/* Micro-scrim subtle backdrop */}
      <div className="relative rounded-2xl bg-white/20 dark:bg-black/25 backdrop-blur-[4px] p-4 sm:p-5">
        {/* Kicker line */}
        <div className="mb-2.5 flex items-center gap-2">
          <span className="h-px w-4 bg-neutral-500" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">
            In His Own Words
          </span>
        </div>

        {/* Coverline Quote */}
        <p className="text-[clamp(1.15rem,1.7vw,1.6rem)] font-medium leading-[1.3] tracking-tight text-neutral-900 dark:text-neutral-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.05)] dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          <span className="font-bold text-black dark:text-white">
            &ldquo;Staying safe isn&apos;t an option
          </span>
          , and instead of relying on others, I wanted to understand it. Once you know the power, controlling it is the{" "}
          <span className="font-bold text-black dark:text-white">
            biggest responsibility.&rdquo;
          </span>
        </p>

        {/* Issue attribution tagline */}
        <div className="mt-3 pt-2.5 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
          <span>Keynote Dossier</span>
          <span>Vol. 2026</span>
        </div>
      </div>
    </div>
  );
}