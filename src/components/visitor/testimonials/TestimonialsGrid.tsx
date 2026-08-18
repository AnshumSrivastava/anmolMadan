import Reveal from "@/components/shared/Reveal";

import { Testimonial } from "@/types/testimonial";

import TestimonialCard from "./TestimonialCard";

type Props = {
  testimonials: Testimonial[];
};

export default function TestimonialsGrid({
  testimonials,
}: Props) {
  return (
    <div className="grid border-t border-l border-black/10 md:grid-cols-2 xl:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <Reveal
          key={testimonial.id}
          delay={index * 0.06}
        >
          <div className="h-full border-r border-b border-black/10">
            <TestimonialCard testimonial={testimonial} />
          </div>
        </Reveal>
      ))}
    </div>
  );
}