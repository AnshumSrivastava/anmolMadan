import Image from "next/image";

import { getAbout } from "@/services/about/about.service";
import Reveal from "@/components/shared/Reveal";

import AboutContent from "./AboutContent";
import Credentials from "./Credentials";
import Audience from "./Audience";
import CTA from "./CTA";

export default async function About() {
  const about = await getAbout();

  if (!about) return null;

  return (
    <section
      id="about"
      className="
        relative
        overflow-hidden
        bg-[#fafafa]
        py-28
        text-black
        lg:py-36
      "
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* =====================================================
            MAIN ABOUT
        ===================================================== */}

        <Reveal>
          <div
            className="
              grid
              items-center
              gap-16

              lg:grid-cols-[0.9fr_1.1fr]
              lg:gap-20
              xl:gap-28
            "
          >

            {/* ================= LEFT — CONTENT ================= */}

            <div className="relative z-10">
              <AboutContent about={about} />
            </div>

            {/* ================= RIGHT — IMAGE ================= */}

            <div
              className="
                relative

                flex
                min-h-[520px]

                items-center
                justify-center

                lg:min-h-[650px]
              "
            >

              {/* Soft background glow */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  left-1/2
                  top-1/2

                  h-[420px]
                  w-[420px]

                  -translate-x-1/2
                  -translate-y-1/2

                  rounded-full

                  bg-black/[0.035]

                  blur-[100px]
                "
              />

              {about.image_url ? (
                <div
                  className="
                    relative
                    z-10

                    h-[520px]
                    w-full

                    max-w-[520px]

                    overflow-hidden
                  "
                >
                  <Image
                    src={about.image_url}
                    alt={about.main_heading || "About"}
                    fill
                    priority={false}
                    sizes="
                      (max-width: 1024px) 90vw,
                      520px
                    "
                    className="
                      object-contain

                      transition-transform
                      duration-700

                      hover:scale-[1.02]
                    "
                  />
                </div>
              ) : (
                <div
                  className="
                    relative
                    z-10

                    flex
                    h-[520px]
                    w-full
                    max-w-[520px]

                    items-center
                    justify-center

                    border
                    border-dashed
                    border-neutral-300

                    text-sm
                    text-neutral-400
                  "
                >
                  No About Image
                </div>
              )}

            </div>
          </div>
        </Reveal>


        {/* =====================================================
            CREDENTIALS
        ===================================================== */}

        <Reveal delay={0.1}>
          <div className="mt-28 lg:mt-36">
            <Credentials about={about} />
          </div>
        </Reveal>


        {/* =====================================================
            AUDIENCE
        ===================================================== */}

        <Reveal delay={0.2}>
          <div className="mt-28 lg:mt-36">
            <Audience about={about} />
          </div>
        </Reveal>


        {/* =====================================================
            CTA
        ===================================================== */}

        <Reveal delay={0.3}>
          <div className="mt-28 lg:mt-36">
            <CTA />
          </div>
        </Reveal>

      </div>
    </section>
  );
}