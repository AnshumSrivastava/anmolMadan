import Reveal from "@/components/shared/Reveal";
import { getPublicApprovedTestimonials } from "@/services/testimonials/testimonials.service";
import TestimonialsHeader from "./TestimonialsHeader";
import TestimonialsGrid from "./TestimonialsGrid";
import TrustedBy from "./TrustedBy";
import TestimonialSubmitForm from "./TestimonialSubmitForm";
import { Testimonial } from "@/types/testimonial";

const fallbackTestimonials: Testimonial[] = [
  {
    id: "test-1",
    client_name: "Vikram Sharma",
    designation: "Head of Information Security",
    company: "Apex Global Tech",
    photo: null,
    message:
      "Anmol delivered an unforgettable session on modern social engineering vectors. His presentation style was engaging, energetic, and completely transformed our team's day-to-day security posture.",
    sort_order: 1,
    is_active: true,
    status: "approved",
  },
  {
    id: "test-2",
    client_name: "Dr. Ananya Roy",
    designation: "Associate Dean & Professor",
    company: "Institute of Technology",
    photo: null,
    message:
      "Rarely do you find a speaker who bridges technical depth with such charisma. The students were captivated for two hours straight, and the feedback has been phenomenal.",
    sort_order: 2,
    is_active: true,
    status: "approved",
  },
  {
    id: "test-3",
    client_name: "Rajesh Malhotra",
    designation: "VP, Engineering",
    company: "CloudCore Networks",
    photo: null,
    message:
      "Working with Anmol was seamless. His insights into practical cybersecurity drills gave our enterprise actionable takeaways we implemented immediately.",
    sort_order: 3,
    is_active: true,
    status: "approved",
  },
];

export default async function Testimonials() {
  let activeTestimonials: Testimonial[] = [];

  try {
    const testimonials = await getPublicApprovedTestimonials();
    activeTestimonials =
      testimonials && testimonials.length > 0
        ? testimonials
        : fallbackTestimonials;
  } catch {
    activeTestimonials = fallbackTestimonials;
  }

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#fafafa] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <TestimonialsHeader />
        </Reveal>

        <Reveal delay={0.15}>
          <TestimonialsGrid testimonials={activeTestimonials} />
        </Reveal>

        <Reveal delay={0.25}>
          <TrustedBy />
        </Reveal>

        <Reveal delay={0.3}>
          <TestimonialSubmitForm />
        </Reveal>
      </div>
    </section>
  );
}