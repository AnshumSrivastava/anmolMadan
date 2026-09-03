import { getHero } from "@/services/hero/hero.service";

import Reveal from "@/components/shared/Reveal";
import CalButton from "@/components/shared/CalButton";

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
     ROLE
  ========================================================== */

  const roleSubtitle =
    "Cybersecurity SPECIALIST · Motivational Speaker";

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
        w-full
        overflow-hidden
        bg-white
        dark:bg-black
      "
    >
      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <HeroBackground />

      {/* ======================================================
          HERO SCROLL CONTAINER
      ====================================================== */}

      <HeroScrollWrapper>
        {/* ==================================================
            FIXED PROPORTIONAL CANVAS
        ================================================== */}

        <div
          className="
            relative
            mx-auto
            h-full
            w-full
            max-w-[1560px]
            px-[5.5vw]
            lg:px-[5vw]
            xl:px-[4.5vw]
          "
        >
          <div
            className="
              relative
              flex
              h-full
              w-full
              items-center
            "
          >
            {/* ==================================================
                LEFT CONTENT
            ================================================== */}

            <div
              className="
                relative
                z-20
                flex
                w-[55%]
                flex-col
                text-left
              "
            >
              {/* ==================================================
                  NAME + ROLE
              ================================================== */}

              <Reveal delay={0.08}>
                <div className="w-fit">
                  {/* ==================================================
                      NAME
                  ================================================== */}

                  <HeroTitle
                    title={
                      hero.pre_heading ||
                      "ANMOL MADAN"
                    }
                  />

                  {/* ==================================================
                      ROLE

                      ZERO GAP AFTER NAME
                      EXTENDED HORIZONTAL LENGTH
                  ================================================== */}

                  <p
                    className="
                      mt-0
                      whitespace-nowrap
                      pl-[3px]
                      text-[clamp(12px,0.9vw,15px)]
                      font-semibold
                      uppercase
                      leading-[1]
                      tracking-[0.34em]
                      text-neutral-500
                      dark:text-neutral-400
                    "
                  >
                    Cybersecurity SPECIALIST
                    <span className="mx-[8px]">·</span>
                    Motivational Speaker
                  </p>
                </div>
              </Reveal>

              {/* ==================================================
                  DESCRIPTION

                  CLEAR SPACE AFTER ROLE
              ================================================== */}

              <Reveal delay={0.2}>
                <p
                  className="
                    mt-[32px]
                    max-w-[clamp(430px,31vw,580px)]
                    text-[clamp(13px,0.95vw,17px)]
                    leading-[1.6]
                    text-neutral-600
                    dark:text-neutral-400
                    [text-align:justify]
                    [text-justify:inter-word]
                  "
                >
                  {hero.description}
                </p>
              </Reveal>

              {/* ==================================================
                  STATS

                  CLEAR SPACE AFTER DESCRIPTION
              ================================================== */}

              <Reveal delay={0.26}>
                <div className="mt-[14px]">
                  <HeroStats stats={stats} />
                </div>
              </Reveal>

              {/* ==================================================
                  BUTTONS

                  CLEAR SPACE AFTER STATS
              ================================================== */}

              <Reveal delay={0.32}>
                <div
                  className="
                    mt-[14px]
                    flex
                    items-center
                    gap-[clamp(10px,1vw,16px)]
                  "
                >
                  {/* ==================================================
                      BOOK A CALL
                  ================================================== */}

                  <CalButton
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-full
                      bg-neutral-950
                      px-[clamp(20px,1.8vw,28px)]
                      py-[clamp(10px,0.9vh,14px)]
                      text-[clamp(10px,0.65vw,12px)]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-white
                      shadow-sm
                      transition-all
                      duration-200
                      hover:bg-neutral-800
                      active:scale-95
                      dark:bg-white
                      dark:text-black
                      dark:hover:bg-neutral-200
                    "
                  >
                    Book a Call
                  </CalButton>

                  {/* ==================================================
                      LEARN MORE
                  ================================================== */}

                  <a
                    href="#about"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-neutral-300
                      bg-transparent
                      px-[clamp(20px,1.8vw,28px)]
                      py-[clamp(10px,0.9vh,14px)]
                      text-[clamp(10px,0.65vw,12px)]
                      font-medium
                      uppercase
                      tracking-[0.12em]
                      text-neutral-700
                      transition-all
                      duration-200
                      hover:border-black
                      hover:text-black
                      active:scale-95
                      dark:border-neutral-700
                      dark:text-neutral-300
                      dark:hover:border-white
                      dark:hover:text-white
                    "
                  >
                    Learn More
                  </a>
                </div>
              </Reveal>
            </div>

            {/* ==================================================
                RIGHT IMAGE AREA
            ================================================== */}

            <div
              className="
                absolute
                right-[2%]
                top-1/2
                z-10
                h-[82%]
                w-[45%]
                -translate-y-1/2
              "
            >
              <HeroImage hero={hero} />
            </div>
          </div>
        </div>
      </HeroScrollWrapper>
    </section>
  );
}