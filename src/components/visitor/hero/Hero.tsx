import { getHero } from "@/services/hero/hero.service";

import Reveal from "@/components/shared/Reveal";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroStats from "./HeroStats";

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
    {
      number: hero.stat_4_number,
      label: hero.stat_4_label,
    },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white"
    >
      <HeroBackground />

      <div
        className="
          relative

          mx-auto
          max-w-[1700px]

          h-[1150px]

          px-8
          lg:px-20

          pt-32
        "
      >
        {/* BIG TITLE */}

        <Reveal>
          <div
            className="
              absolute

              inset-x-0

              top-0

              z-30

              text-center
            "
          >
          <h1
  className="
    text-[clamp(6rem,11vw,10rem)]

    font-black
    uppercase

    tracking-[-0.08em]
    leading-[0.82]

    text-black
  "
>
  {hero.pre_heading}
</h1>

            <h2
              className="
                mt-5

                text-[clamp(1.3rem,2vw,2.15rem)]

                font-light

                text-neutral-600
              "
            >
              {hero.title_line_1}
            </h2>
          </div>
        </Reveal>

        {/* IMAGE */}

        <Reveal delay={0.2}>
          <div
            className="
              absolute

              left-1/2

              top-[-600px]

              z-20

              -translate-x-[48%]
            "
          >
            <HeroImage hero={hero} />
          </div>
        </Reveal>

        {/* LEFT */}

        <Reveal delay={0.15}>
          <div
            className="
              absolute

              left-0

              top-[360px]

              z-40

              w-[360px]
            "
          >
            <HeroContent hero={hero} />
          </div>
        </Reveal>

        {/* RIGHT */}

        <Reveal delay={0.3}>
          <div
            className="
              absolute

              right-0

              top-[390px]

              z-40
            "
          >
            <HeroStats stats={stats} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}