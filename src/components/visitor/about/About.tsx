import Image from "next/image";

import { getAbout } from "@/services/about/about.service";
import { getServiceItems } from "@/services/services/services.service";
import Reveal from "@/components/shared/Reveal";

import AboutContent from "./AboutContent";
import Audience from "./Audience";
import CTA from "./CTA";

export default async function About() {
  const about = await getAbout();
  const services = await getServiceItems();

  if (!about) return null;

  return (
    <section
      id="about"
      className="
        relative
        overflow-hidden
        bg-white
        dark:bg-black
        py-20
        text-black
        dark:text-white
        lg:py-24
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
                items-center
                justify-center
                sm:min-h-[460px]
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
                  dark:bg-white/[0.02]
                "
              />

              {about.image_url ? (
                <div
                  className="
                    group
                    relative
                    z-10
                    flex
                    h-[380px]
                    w-full
                    max-w-[480px]
                    items-center
                    justify-center
                    rounded-3xl
                    border
                    border-zinc-200/80
                    bg-white
                    p-8
                    shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                    backdrop-blur-sm
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:border-black/30
                    hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]
                    dark:border-neutral-800
                    dark:bg-black/60
                    dark:hover:border-white/30
                    sm:h-[460px]
                  "
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={about.image_url}
                      alt={
                        about.main_heading ||
                        "Anmol Madan Signature"
                      }
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
                    overflow-hidden
                    rounded-3xl
                    border
                    border-neutral-200/80
                    bg-gradient-to-br
                    from-neutral-50
                    to-neutral-100
                    dark:border-neutral-800
                    dark:from-neutral-900
                    dark:to-neutral-800
                  "
                >
                  {/* Decorative dot grid */}
                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      inset-0
                      opacity-[0.06]
                      dark:opacity-[0.09]
                    "
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                      backgroundSize: "32px 32px",
                    }}
                  />

                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      h-48
                      w-48
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-gradient-to-br
                      from-neutral-200/80
                      to-transparent
                      blur-3xl
                      dark:from-neutral-700/60
                    "
                  />

                  <div className="relative px-8 text-center">
                    <div
                      className="
                        select-none
                        text-5xl
                        font-bold
                        tracking-[-0.05em]
                        text-neutral-200
                        dark:text-neutral-700
                      "
                    >
                      AM
                    </div>

                    <div
                      className="
                        mx-auto
                        mt-3
                        h-px
                        w-12
                        bg-neutral-300
                        dark:bg-neutral-700
                      "
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}