import { getTestimonials } from "@/services/testimonials/testimonials.service";

import { TestimonialsForm } from "@/components/testimonials";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="mx-auto max-w-7xl p-6">
      <TestimonialsForm testimonials={testimonials} />
    </div>
  );
}