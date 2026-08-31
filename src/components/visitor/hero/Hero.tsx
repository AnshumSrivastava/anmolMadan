import { getHero } from "@/services/hero/hero.service";
import Reveal from "@/components/shared/Reveal";
import HeroScrollWrapper from "./HeroScrollWrapper";
import HeroBackground from "./HeroBackground";
import HeroImage from "./HeroImage";
import HeroStats from "./HeroStats";
import HeroTitle from "./HeroTitle";

/* ==========================================================
   STRUCTURED 2-COLUMN HERO
========================================================== */

export default async function Hero() {
  const hero = await getHero();

  if (!hero) return null;

  /* ==========================================================
     STATS DATA
  ========================================================== */

  const stats = [
    {
      number: hero.stat_1_number,
      label: hero.stat_1_label,
    },
    {
      number: hero.stat_2_number,
      label: hero.stat_2_label,
    },
    {
      number: hero.stat_3_number,
      label: hero.stat_3_label,
    },
  ];

  const roleSubtitle = "Cybersecurity Expert · Motivational Speaker";

  return (
    <section
      id="hero"
      className="
        fixed
        inset-0
        z-0
        h-[100dvh]
        w-full
        overflow-hidden
        bg-white
        dark:bg-black
      "
    >
      {/* Background Atmosphere */}
      <HeroBackground />

      {/* Hero Scroll Container */}
      <HeroScrollWrapper>
        <div className="relative mx-auto flex h-full w-full max-w-[1560px] items-center px-6 sm:px-10 md:px-14 lg:px-18 xl:px-20">
          <div className="grid h-full w-full grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-8 xl:gap-14">

            {/* ==================================================
                LEFT COLUMN (55-60% width): Unified Left-Aligned Stack
            ================================================== */}
            <div className="flex flex-col gap-6 sm:gap-7 lg:col-span-7 text-left my-auto py-12 lg:py-0">
              
              {/* 1. Name */}
              <Reveal delay={0.08}>
                <HeroTitle title={hero.pre_heading || "ANMOL MADAN"} />
              </Reveal>

              {/* 2. Role Line */}
              <Reveal delay={0.14}>
                <p className="text-[clamp(13px,1.05vw,16px)] font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                  {roleSubtitle}
                </p>
              </Reveal>

              {/* 3. Quote */}
              <Reveal delay={0.2}>
                <p className="max-w-[580px] text-[clamp(14px,1.05vw,17px)] leading-[1.65] text-neutral-600 dark:text-neutral-400">
                  {hero.description}
                </p>
              </Reveal>

              {/* 4. Stats Row */}
              <Reveal delay={0.26}>
                <HeroStats stats={stats} />
              </Reveal>

              {/* 5. Buttons Row */}
              <Reveal delay={0.32}>
                <div className="flex items-center gap-4 pt-1">
                  {/* Primary Action */}
                  <a
                    href="#contact"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-full
                      bg-neutral-950
                      dark:bg-white
                      px-7
                      py-3.5
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-white
                      dark:text-black
                      shadow-sm
                      transition-all
                      duration-200
                      hover:bg-neutral-800
                      dark:hover:bg-neutral-200
                      active:scale-95
                    "
                  >
                    Book a Call
                  </a>

                  {/* Secondary Action */}
                  <a
                    href="#about"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-neutral-300
                      dark:border-neutral-700
                      bg-transparent
                      px-7
                      py-3.5
                      text-xs
                      font-medium
                      uppercase
                      tracking-[0.12em]
                      text-neutral-700
                      dark:text-neutral-300
                      transition-all
                      duration-200
                      hover:border-black
                      dark:hover:border-white
                      hover:text-black
                      dark:hover:text-white
                      active:scale-95
                    "
                  >
                    Learn More
                  </a>
                </div>
              </Reveal>

            </div>

            {/* ==================================================
                RIGHT COLUMN (40-45% width): Large Portrait Touching Bottom
            ================================================== */}
            <div className="flex items-end justify-center lg:justify-end lg:col-span-5 h-full w-full self-end pointer-events-none">
              <HeroImage hero={hero} />
            </div>

          </div>
        </div>
      </HeroScrollWrapper>
    </section>
  );
}