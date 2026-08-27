import { getGallery } from "@/services/gallery/gallery.service";

import Reveal from "@/components/shared/Reveal";

import GalleryHorizontal from "./GalleryHorizontal";

export default async function Gallery() {
  const items = await getGallery();

  if (!items.length) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="
        relative
        overflow-hidden
        bg-white
        py-28
        lg:py-36
      "
    >
      {/* =====================================================
          INTRO
      ===================================================== */}

      <div
        className="
          mx-auto
          grid
          w-full
          max-w-[1500px]
          grid-cols-1
          gap-12
          px-6
          sm:px-8
          lg:grid-cols-[1fr_0.65fr]
          lg:gap-20
          lg:px-10
        "
      >
        {/* ===================================================
            LEFT
        =================================================== */}

        <div>
          <Reveal>
            <p
              className="
                mb-6
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-neutral-400
              "
            >
              Testimonials
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              className="
                max-w-[760px]
                text-[clamp(3rem,6vw,6rem)]
                font-medium
                leading-[0.91]
                tracking-[-0.065em]
                text-black
              "
            >
              Stories that
              <br />
              speak for
              <br />
              themselves.
            </h2>
          </Reveal>
        </div>

        {/* ===================================================
            RIGHT
        =================================================== */}

        <div
          className="
            flex
            items-end
            lg:justify-end
          "
        >
          <Reveal
            delay={0.16}
            className="
              w-full
              max-w-[380px]
              lg:pb-2
            "
          >
            <div>
              <div
                className="
                  mb-6
                  h-px
                  w-12
                  bg-black
                "
              />

              <p
                className="
                  text-sm
                  leading-7
                  text-neutral-500
                  sm:text-[15px]
                "
              >
                A collection of real experiences,
                conversations and perspectives
                from the people I have had the
                opportunity to work with.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* =====================================================
          VIDEO CAROUSEL
      ===================================================== */}

      <Reveal
        delay={0.2}
        className="
          mt-20
          w-full
          lg:mt-24
        "
      >
        <GalleryHorizontal
          items={items}
        />
      </Reveal>

      {/* =====================================================
          BOTTOM LABEL
      ===================================================== */}

      <Reveal
        delay={0.28}
        className="
          mx-auto
          mt-8
          flex
          w-full
          max-w-[1500px]
          items-center
          justify-between
          px-6
          lg:px-10
        "
      >
        <p
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.3em]
            text-neutral-300
          "
        >
          Real people · Real experiences
        </p>

        <p
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.3em]
            text-neutral-300
          "
        >
          Video testimonials
        </p>
      </Reveal>
    </section>
  );
}