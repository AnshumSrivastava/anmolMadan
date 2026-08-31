import Reveal from "@/components/shared/Reveal";
import { getGallery } from "@/services/gallery/gallery.service";
import VideoTestimonial from "./VideoTestimonial";

const fallbackVideos = [
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
];

export default async function Testimonials() {
  const gallery = await getGallery();
  const validVideos = gallery.map(item => item.video).filter(Boolean);
  const displayVideos = validVideos.length > 0 ? validVideos : fallbackVideos;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#fafafa] dark:bg-neutral-950 py-20 lg:py-24 text-black dark:text-white"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <VideoTestimonial videos={displayVideos} />
        </Reveal>
      </div>
    </section>
  );
}