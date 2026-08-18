"use client";

import { useTransition } from "react";

import {
  createTestimonialAction,
  deleteTestimonialAction,
  updateTestimonialAction,
} from "@/actions/testimonials";

import { Testimonial } from "@/types/testimonial";

import TestimonialCard from "./TestimonialCard";
import TestimonialsPreview from "./TestimonialsPreview";

type Props = {
  testimonials: Testimonial[];
};

export default function TestimonialsForm({
  testimonials,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const handleCreate = () => {
    startTransition(async () => {
      await createTestimonialAction();
    });
  };

  const handleUpdate = (
    id: string,
    updates: Partial<Testimonial>
  ) => {
    startTransition(async () => {
      await updateTestimonialAction(id, updates);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this testimonial?")) return;

    startTransition(async () => {
      await deleteTestimonialAction(id);
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Testimonials
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Manage client testimonials displayed on your portfolio.
          </p>
        </div>

        <button
          onClick={handleCreate}
          disabled={isPending}
          className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50"
        >
          + Add Testimonial
        </button>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {testimonials.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-700 py-16 text-center text-zinc-500">
            No testimonials yet.
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              disabled={isPending}
            />
          ))
        )}
      </div>

      {/* Live Preview */}
      <TestimonialsPreview testimonials={testimonials} />
    </div>
  );
}