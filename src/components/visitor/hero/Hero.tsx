import { getHero } from "@/services/hero/hero.service";
import Reveal from "@/components/shared/Reveal";

import { Josefin_Sans } from "next/font/google";

import HeroImageScroll from "./HeroImageScroll";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroStats from "./HeroStats";

/* ==========================================================
   HERO DISPLAY FONT
========================================================== */

const heroFont = Josefin_Sans({
  subsets: ["latin"],
  weight: "400",
});

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

  const subtitle =
    hero.title_line_1?.trim() || "";

  const subtitleParts =
    subtitle.split(/\s+/);

  const specialistIndex =
    subtitleParts.findIndex((item) =>
      item
        .toLowerCase()
        .startsWith("specialist")
    );

  const cybersecurity =
    specialistIndex > 0
      ? subtitleParts
          .slice(0, specialistIndex)
          .join(" ")
      : subtitle;

  const specialist =
    specialistIndex > 0
      ? subtitleParts
          .slice(specialistIndex)
          .join(" ")
      : "";

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <section
      id="hero"
      className="
        relative
        h-[100dvh]
        min-h-[700px]
        w-full
        overflow-hidden
        bg-white
      "
    >
      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <HeroBackground />

      {/* ======================================================
          HERO CANVAS
      ====================================================== */}

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
            MAIN TITLE
        ==================================================== */}

        <Reveal>
          <div
            className="
              absolute
              left-1/2
              top-[105px]
              z-20
              w-[92%]
              -translate-x-1/2
              text-center
            "
          >
            <h1
              className={`
                ${heroFont.className}

                whitespace-nowrap

                text-[clamp(5rem,8.5vw,9.5rem)]

                font-normal

                uppercase

                leading-[0.82]

                tracking-[-0.085em]

                text-black
              `}
            >
              {hero.pre_heading}
            </h1>
          </div>
        </Reveal>

        {/* ====================================================
            SUBTITLE ROW
        ==================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-[250px]
            z-30
            hidden
            w-[min(1100px,90vw)]
            -translate-x-1/2
            items-center
            justify-between
            lg:flex
          "
        >

          {/* ==================================================
              CYBERSECURITY
          ================================================== */}

          <Reveal delay={0.1}>
            <div
              className="
                flex
                items-center
                gap-5
              "
            >
              <span
                className="
                  h-px
                  w-10
                  bg-neutral-300
                "
              />

              <p
                className="
                  whitespace-nowrap

                  text-[clamp(1.5rem,2.35vw,2.4rem)]

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

          {/* ==================================================
              SPECIALIST
          ================================================== */}

          <Reveal delay={0.15}>
            <div
              className="
                flex
                items-center
                justify-end
                gap-5
              "
            >
              <p
                className="
                  whitespace-nowrap

                  text-[clamp(1.5rem,2.35vw,2.4rem)]

                  font-normal

                  uppercase

                  leading-none

                  tracking-[-0.025em]

                  text-neutral-500
                "
              >
                {specialist}
              </p>

              <span
                className="
                  h-px
                  w-10
                  bg-neutral-300
                "
              />
            </div>
          </Reveal>

        </div>

        {/* ====================================================
            HERO IMAGE

            SHARP
              ↓
            BLUR
              ↓
            FADE
              ↓
            GONE
        ==================================================== */}

        <div
          className="
            pointer-events-none
            fixed
            bottom-[-200px]
            left-1/2
            z-40
            h-full
            w-[clamp(650px,58vw,1050px)]
            -translate-x-1/2
          "
        >
          <Reveal
            delay={0.2}
            className="
              relative
              h-full
              w-full
            "
          >
            <HeroImageScroll>
              <HeroImage hero={hero} />
            </HeroImageScroll>
          </Reveal>
        </div>

        {/* ====================================================
            HERO ABOUT / INTRO
        ==================================================== */}

        <div
          className="
            absolute
            left-[7%]
            top-[68%]
            z-50
            w-[380px]
            -translate-y-1/2

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
            STATS
        ==================================================== */}

        <div
          className="
            absolute
            right-[7%]
            top-[58%]
            z-50
            w-[300px]
            -translate-y-1/2

            xl:right-[8%]
            xl:w-[330px]

            2xl:right-[9%]
          "
        >
          <Reveal delay={0.4}>
            <HeroStats stats={stats} />
          </Reveal>
        </div>

        {/* ====================================================
            MOBILE SUBTITLE
        ==================================================== */}

        <Reveal delay={0.15}>
          <div
            className="
              absolute
              inset-x-0
              top-[215px]
              z-30
              px-6
              text-center
              lg:hidden
            "
          >
            <p
              className="
                text-lg
                font-normal
                uppercase
                tracking-[0.08em]
                text-neutral-500
              "
            >
              {subtitle}
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}