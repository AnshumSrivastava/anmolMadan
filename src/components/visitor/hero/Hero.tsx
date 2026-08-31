import { getHero } from "@/services/hero/hero.service";
import Reveal from "@/components/shared/Reveal";

import HeroScrollWrapper from "./HeroScrollWrapper";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroStats from "./HeroStats";
import HeroTitle from "./HeroTitle";
import HeroScrollIndicator from "./HeroScrollIndicator";

/* ==========================================================
   HERO
========================================================== */

export default async function Hero() {
  const hero = await getHero();

  if (!hero) return null;

  /* ==========================================================
     STATS
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

  /* ==========================================================
     SUBTITLE
  ========================================================== */

  const subtitle = hero.title_line_1?.trim() || "";
  const subtitleParts = subtitle.split(/\s+/);

  const specialistIndex = subtitleParts.findIndex((item: string) =>
    item.toLowerCase().startsWith("specialist")
  );

  const cybersecurity =
    specialistIndex > 0
      ? subtitleParts.slice(0, specialistIndex).join(" ")
      : subtitle;

  const specialist =
    specialistIndex > 0 ? subtitleParts.slice(specialistIndex).join(" ") : "";

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <section
      id="hero"
      className="
        fixed
        inset-0
        z-0
        h-[100dvh]
        min-h-[680px]
        w-full
        overflow-hidden
        bg-white
      "
    >
      {/* BACKGROUND */}
      <HeroBackground />

      {/* HERO SCROLL WRAPPER (Smooth hardware-accelerated blur & fade of whole hero) */}
      <HeroScrollWrapper>
        {/* HERO CANVAS */}
        <div
          className="
            relative
            mx-auto
            h-full
            w-full
            max-w-[1920px]
          "
        >
          {/* ====================================================
              MAIN TITLE (Behind Subject, z-20)
          ==================================================== */}
          <div
            className="
              absolute
              left-1/2
              top-[95px]
              sm:top-[105px]
              lg:top-[115px]
              z-20
              w-[94%]
              -translate-x-1/2
              text-center
            "
          >
            <HeroTitle title={hero.pre_heading} />
          </div>

          {/* ====================================================
              SUBTITLE ROW (Desktop)
          ==================================================== */}
          <div
            className="
              absolute
              left-1/2
              top-[215px]
              sm:top-[230px]
              lg:top-[245px]
              z-20
              hidden
              w-[min(1280px,90vw)]
              -translate-x-1/2
              items-center
              justify-between
              lg:flex
            "
          >
            {/* CYBERSECURITY */}
            <Reveal delay={0.2}>
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-neutral-300" />
                <p
                  className="
                    whitespace-nowrap
                    text-[clamp(1.1rem,1.7vw,1.8rem)]
                    font-normal
                    uppercase
                    leading-none
                    tracking-[0.05em]
                    text-neutral-500
                  "
                >
                  {cybersecurity}
                </p>
              </div>
            </Reveal>

            {/* SPECIALIST */}
            <Reveal delay={0.25}>
              <div className="flex items-center justify-end gap-4">
                <p
                  className="
                    whitespace-nowrap
                    text-[clamp(1.1rem,1.7vw,1.8rem)]
                    font-normal
                    uppercase
                    leading-none
                    tracking-[0.05em]
                    text-neutral-500
                  "
                >
                  {specialist}
                </p>
                <span className="h-px w-8 bg-neutral-300" />
              </div>
            </Reveal>
          </div>

          {/* ====================================================
              HERO IMAGE (z-30 — stands prominently in front of title)
          ==================================================== */}
          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-1/2
              z-30
              h-[85vh]
              max-h-[920px]
              w-[min(94vw,560px)]
              lg:w-[clamp(560px,44vw,800px)]
              -translate-x-1/2
            "
          >
            <HeroImage hero={hero} />
          </div>

          {/* ====================================================
              HERO ABOUT / INTRO (Left)
          ==================================================== */}
          <div
            className="
              absolute
              left-[5%]
              top-[60%]
              z-40
              w-[min(380px,88vw)]
              -translate-y-1/2
              hidden
              md:block
              xl:left-[7%]
              xl:w-[400px]
              2xl:left-[9%]
            "
          >
            <Reveal delay={0.3}>
              <HeroContent hero={hero} />
            </Reveal>
          </div>

          {/* ====================================================
              STATS (Right)
          ==================================================== */}
          <div
            className="
              absolute
              right-[5%]
              top-[60%]
              z-40
              w-[260px]
              -translate-y-1/2
              hidden
              lg:block
              xl:right-[7%]
              xl:w-[300px]
              2xl:right-[9%]
            "
          >
            <Reveal delay={0.35}>
              <HeroStats stats={stats} />
            </Reveal>
          </div>

          {/* ====================================================
              MOBILE SUBTITLE & CTA
          ==================================================== */}
          <div
            className="
              absolute
              inset-x-0
              top-[180px]
              sm:top-[200px]
              z-20
              px-6
              text-center
              lg:hidden
            "
          >
            <Reveal delay={0.2}>
              <p
                className="
                  text-xs
                  sm:text-sm
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-neutral-500
                "
              >
                {subtitle}
              </p>
            </Reveal>
          </div>

          {/* Mobile bottom actions */}
          <div
            className="
              absolute
              inset-x-0
              bottom-20
              z-50
              flex
              justify-center
              px-6
              md:hidden
            "
          >
            <Reveal delay={0.35}>
              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  className="
                    rounded-full
                    bg-black
                    px-6
                    py-3
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-white
                    shadow-lg
                  "
                >
                  Book a Call →
                </a>
                <a
                  href="#about"
                  className="
                    rounded-full
                    border
                    border-black/20
                    bg-white/80
                    backdrop-blur-sm
                    px-6
                    py-3
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-black
                  "
                >
                  Learn More
                </a>
              </div>
            </Reveal>
          </div>

          {/* ====================================================
              SCROLL INDICATOR
          ==================================================== */}
          <HeroScrollIndicator />
        </div>
      </HeroScrollWrapper>
    </section>
  );
}