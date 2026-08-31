import Image from "next/image";
import { Quote } from "lucide-react";

import { Testimonial } from "@/types/testimonial";

type Props = {
  testimonial: Testimonial;
};

export default function TestimonialCard({
  testimonial,
}: Props) {
  return (
    <article className="group flex h-full flex-col border border-black/10 bg-[#fafafa] p-7 transition-colors duration-300 hover:bg-white md:p-8">

      {/* Quote */}
      <Quote className="h-7 w-7 text-zinc-300 transition-colors duration-300 group-hover:text-black" />

      {/* Message */}
      <p className="mt-7 text-[16px] leading-7 text-zinc-600">
        "{testimonial.message}"
      </p>

      {/* Divider */}
      <div className="my-8 h-px bg-black/10" />

      {/* Client */}
      <div className="mt-auto flex items-center gap-4">
        {testimonial.photo ? (
          <Image
            src={testimonial.photo}
            alt={testimonial.client_name}
            width={52}
            height={52}
            className="h-13 w-13 rounded-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-13 w-13 items-center justify-center rounded-full bg-black text-sm font-medium text-white">
            {testimonial.client_name.charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          <h3 className="text-sm font-semibold tracking-tight text-black">
            {testimonial.client_name}
          </h3>

          <p className="mt-0.5 text-xs text-zinc-500">
            {testimonial.designation}
          </p>

          <p className="text-xs text-zinc-400">
            {testimonial.company}
          </p>
        </div>
      </div>
    </article>
  );
}