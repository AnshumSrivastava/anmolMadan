import { getGallery } from "@/services/gallery/gallery.service";
import Reveal from "@/components/shared/Reveal";
import GalleryHorizontal from "./GalleryHorizontal";
import { Gallery as GalleryType } from "@/types/gallery";

const fallbackGallery: GalleryType[] = [
  {
    id: "gal-1",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    caption: "Cybersecurity Workshop Feedback · Tech Conclave",
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "gal-2",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    caption: "Keynote Response · Leadership Summit",
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "gal-3",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    caption: "Corporate Training Delegate Reflections",
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default async function Gallery() {
  let items: GalleryType[] = [];
  try {
    const fetched = await getGallery();
    items = fetched && fetched.length > 0 ? fetched : fallbackGallery;
  } catch {
    items = fallbackGallery;
  }

  return (
    <section
      id="gallery"
      className="
        relative
        overflow-hidden
        bg-white
        py-24
        lg:py-32
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
          gap-10
          px-6
          sm:px-8
          lg:grid-cols-[1fr_0.65fr]
          lg:gap-20
          lg:px-12
        "
      >
        {/* ===================================================
            LEFT
        =================================================== */}

        <div>
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-6 bg-neutral-400" />
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  text-neutral-400
                "
              >
                Video Gallery
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              className="
                max-w-[760px]
                text-4xl
                font-medium
                leading-[0.95]
                tracking-[-0.05em]
                text-black
                sm:text-5xl
                lg:text-6xl
              "
            >
              Stories that speak for themselves.
            </h2>
          </Reveal>
        </div>

        {/* ===================================================
            RIGHT
        =================================================== */}

        <div className="flex items-end lg:justify-end">
          <Reveal delay={0.16} className="w-full max-w-[380px] lg:pb-2">
            <div>
              <div className="mb-5 h-px w-12 bg-black" />
              <p className="text-sm sm:text-base leading-relaxed text-neutral-500">
                A collection of real experiences, live audience feedback, and
                perspectives from teams and institutions I have worked with.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* =====================================================
          VIDEO CAROUSEL
      ===================================================== */}

      <Reveal delay={0.2} className="mt-14 w-full lg:mt-20">
        <GalleryHorizontal items={items} />
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
          lg:px-12
        "
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-400">
          Real people · Real experiences
        </p>

        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-400">
          Video highlights
        </p>
      </Reveal>
    </section>
  );
}