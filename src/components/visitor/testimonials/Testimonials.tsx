import Reveal from "@/components/shared/Reveal";

import { getTestimonials } from "@/services/testimonials/testimonials.service";

import TestimonialsHeader from "./TestimonialsHeader";
import TestimonialsGrid from "./TestimonialsGrid";
import TrustedBy from "./TrustedBy";

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  const activeTestimonials = testimonials
    .filter((item) => item.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);

  if (!activeTestimonials.length) return null;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-white py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <TestimonialsHeader />
        </Reveal>

        <Reveal delay={0.15}>
          <TestimonialsGrid
            testimonials={activeTestimonials}
          />
        </Reveal>

        <Reveal delay={0.3}>
          <TrustedBy />
        </Reveal>
      </div>
    </section>
  );
}