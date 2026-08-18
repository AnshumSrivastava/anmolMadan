"use client";

import Image from "next/image";
import { Quote } from "lucide-react";

import { Testimonial } from "@/types/testimonial";

type Props = {
  testimonials: Testimonial[];
};

export default function TestimonialsPreview({
  testimonials,
}: Props) {
  const activeTestimonials = testimonials
    .filter((item) => item.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white">
          Live Preview
        </h3>

        <p className="mt-1 text-sm text-zinc-400">
          This is how testimonials will appear on the visitor website.
        </p>
      </div>

      {activeTestimonials.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-700 py-16 text-center text-zinc-500">
          No active testimonials.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {activeTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-3xl border border-zinc-800 bg-black p-8"
            >
              <Quote className="h-8 w-8 text-zinc-600" />

              <p className="mt-6 leading-8 text-zinc-300">
                "{testimonial.message}"
              </p>

              <div className="mt-8 flex items-center gap-4">
                {testimonial.photo ? (
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.client_name}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-lg font-semibold text-white">
                    {testimonial.client_name.charAt(0)}
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-white">
                    {testimonial.client_name}
                  </h4>

                  <p className="text-sm text-zinc-400">
                    {testimonial.designation}
                  </p>

                  <p className="text-sm text-zinc-500">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}