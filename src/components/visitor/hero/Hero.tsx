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
              MAIN TITLE — BACK LAYER (behind image, z-20)
              This is the 'base' layer of the 3D WordArt depth.
          ==================================================== */}
          <div
            className="
              absolute
              left-1/2
              top-[100px]
              sm:top-[115px]
              lg:top-[130px]
              z-20
              w-[94%]
              -translate-x-1/2
              text-center
            "
          >
            <HeroTitle title={hero.pre_heading} />
          </div>

          {/* ====================================================
              MAIN TITLE — FRONT LAYER (in front of image, z-50)
              Clipped to ONLY show the bottom 40% of the letters.
              This makes the subject appear to emerge through
              the text — the classic 3D magazine-cover WordArt
              effect. The bottom of each letter peeks in front
              of the subject's waist/lower-body.
          ==================================================== */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[100px]
              sm:top-[115px]
              lg:top-[130px]
              z-50
              w-[94%]
              -translate-x-1/2
              text-center
            "
            style={{
              clipPath: "inset(55% 0 0 0)",
              WebkitClipPath: "inset(55% 0 0 0)",
            }}
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
              top-[265px]
              xl:top-[285px]
              z-25
              hidden
              w-[min(1100px,88vw)]
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
                    text-[clamp(1.35rem,2.1vw,2.2rem)]
                    font-normal
                    uppercase
                    leading-none
                    tracking-[-0.025em]
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
                    text-[clamp(1.35rem,2.1vw,2.2rem)]
                    font-normal
                    uppercase
                    leading-none
                    tracking-[-0.025em]
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
              HERO IMAGE  (z-40 — between the two title layers)
              Back title: z-20 | Image: z-40 | Front title: z-50
          ==================================================== */}
          <div
            className="
              pointer-events-none
              absolute
              bottom-[-60px]
              sm:bottom-[-80px]
              lg:bottom-[-120px]
              left-1/2
              z-40
              h-[92vh]
              max-h-[1100px]
              w-[min(94vw,640px)]
              lg:w-[clamp(640px,52vw,1000px)]
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
              left-[6%]
              top-[68%]
              z-50
              w-[min(380px,88vw)]
              -translate-y-1/2
              hidden
              md:block
              xl:left-[8%]
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
              right-[6%]
              top-[60%]
              z-50
              w-[280px]
              -translate-y-1/2
              hidden
              lg:block
              xl:right-[8%]
              xl:w-[320px]
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
              top-[195px]
              sm:top-[225px]
              z-30
              px-6
              text-center
              lg:hidden
            "
          >
            <Reveal delay={0.2}>
              <p
                className="
                  text-sm
                  sm:text-base
                  font-medium
                  uppercase
                  tracking-[0.18em]
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