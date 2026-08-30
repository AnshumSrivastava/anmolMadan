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
        py-24
        text-black
        lg:py-32
      "
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* =====================================================
            MAIN ABOUT (Two-column layout)
        ===================================================== */}

        <Reveal>
          <div
            className="
              grid
              items-center
              gap-12
              lg:grid-cols-[1.1fr_0.9fr]
              lg:gap-16
              xl:gap-24
            "
          >
            {/* ================= LEFT — CONTENT ================= */}

            <div className="relative z-10">
              <AboutContent about={about} />
            </div>

            {/* ================= RIGHT — SIGNATURE / IMAGE ================= */}

            <div
              className="
                relative
                flex
                min-h-[380px]
                sm:min-h-[460px]
                items-center
                justify-center
                lg:min-h-[540px]
              "
            >
              {/* Soft background glow */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[360px]
                  w-[360px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-black/[0.025]
                  blur-[90px]
                "
              />

              {about.image_url ? (
                <div
                  className="
                    group
                    relative
                    z-10
                    h-[380px]
                    sm:h-[460px]
                    w-full
                    max-w-[480px]
                    rounded-3xl
                    border
                    border-zinc-200/80
                    bg-white/60
                    p-8
                    backdrop-blur-sm
                    shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                    transition-all
                    duration-500
                    hover:border-black/30
                    hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]
                    hover:-translate-y-1
                    flex
                    items-center
                    justify-center
                  "
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={about.image_url}
                      alt={about.main_heading || "Anmol Madan Signature"}
                      fill
                      priority={false}
                      sizes="(max-width: 1024px) 90vw, 480px"
                      className="
                        object-contain
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                      "
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="
                    relative
                    z-10
                    flex
                    h-[400px]
                    w-full
                    max-w-[480px]
                    items-center
                    justify-center
                    rounded-3xl
                    border
                    border-dashed
                    border-neutral-300
                    text-sm
                    text-neutral-400
                  "
                >
                  About Visual
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* =====================================================
            CREDENTIALS
        ===================================================== */}

        <Reveal delay={0.1}>
          <div className="mt-20 lg:mt-28">
            <Credentials about={about} />
          </div>
        </Reveal>

        {/* =====================================================
            AUDIENCE
        ===================================================== */}

        <Reveal delay={0.15}>
          <div className="mt-20 lg:mt-28">
            <Audience about={about} />
          </div>
        </Reveal>

        {/* =====================================================
            CTA
        ===================================================== */}

        <Reveal delay={0.2}>
          <div className="mt-20 lg:mt-28">
            <CTA />
          </div>
        </Reveal>
      </div>
    </section>
  );
}