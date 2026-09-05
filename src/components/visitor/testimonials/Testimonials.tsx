import Reveal from "@/components/shared/Reveal";
import { getGallery } from "@/services/gallery/gallery.service";
import { Gallery } from "@/types/gallery";
import VideoTestimonial from "./VideoTestimonial";

interface TestimonialsProps {
  gallery?: Gallery[];
}

export default async function Testimonials({ gallery: initialGallery }: TestimonialsProps = {}) {
  const gallery = initialGallery !== undefined ? initialGallery : await getGallery();
  const validGallery = (gallery || []).filter((item) => Boolean(item.video));

  if (validGallery.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#fafafa] dark:bg-neutral-950 py-20 lg:py-24 text-black dark:text-white"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <VideoTestimonial
            items={validGallery}
            videos={validGallery.map((item) => item.video)}
          />
        </Reveal>
      </div>
    </section>
  );
}