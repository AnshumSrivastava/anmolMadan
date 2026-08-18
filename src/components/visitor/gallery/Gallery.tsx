import Reveal from "@/components/shared/Reveal";
import { getGallery } from "@/services/gallery/gallery.service";
import GalleryHorizontal from "./GalleryHorizontal";

export default async function Gallery() {
  const gallery = await getGallery();

  if (!gallery || gallery.length === 0) return null;

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#fafafa] py-28 text-black"
    >
      {/* Content */}

      <div className="relative z-10">
        <Reveal>
          <div className="mx-auto mb-20 max-w-7xl px-6 text-center">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-zinc-400">
              Gallery
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
              Moments &
              <span className="block italic font-normal text-zinc-500">
                Experiences
              </span>
            </h2>
          </div>
        </Reveal>

        <GalleryHorizontal items={gallery} />
      </div>
    </section>
  );
}