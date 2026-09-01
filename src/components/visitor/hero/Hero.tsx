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

  const roleSubtitle =
    "Cybersecurity Expert · Motivational Speaker";

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
      <HeroBackground />

      <HeroScrollWrapper>
        {/* ==================================================
            FIXED PROPORTIONAL CANVAS

            Everything inside this container uses the same
            16:9-ish proportional structure regardless of
            viewport resolution.
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

                gap-[clamp(14px,1.5vh,24px)]

                text-left
              "
            >

              {/* NAME */}

              <Reveal delay={0.08}>
                <HeroTitle
                  title={
                    hero.pre_heading ||
                    "ANMOL MADAN"
                  }
                />
              </Reveal>


              {/* ROLE */}

              <Reveal delay={0.14}>
                <p
                  className="
                    text-[clamp(12px,1.05vw,17px)]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-neutral-500
                    dark:text-neutral-400
                  "
                >
                  {roleSubtitle}
                </p>
              </Reveal>


              {/* DESCRIPTION */}

              <Reveal delay={0.2}>
                <p
                  className="
                    max-w-[clamp(430px,31vw,580px)]

                    text-[clamp(13px,0.95vw,17px)]

                    leading-[1.6]

                    text-neutral-600
                    dark:text-neutral-400
                  "
                >
                  {hero.description}
                </p>
              </Reveal>


              {/* STATS */}

              <Reveal delay={0.26}>
                <HeroStats stats={stats} />
              </Reveal>


              {/* BUTTONS */}

              <Reveal delay={0.32}>
                <div
                  className="
                    flex
                    items-center
                    gap-[clamp(10px,1vw,16px)]
                    pt-1
                  "
                >

                  <a
                    href="https://cal.com/anmolmadan"
                    target="_blank"
                    rel="noopener noreferrer"
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
                  </a>


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

                IMPORTANT:
                This is positioned relative to the SAME hero
                canvas instead of independently using viewport
                dimensions.
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