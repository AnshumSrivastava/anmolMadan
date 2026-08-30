"use client";

import { useState, useTransition } from "react";

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
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [isPending, startTransition] = useTransition();

  const pendingCount = testimonials.filter(
    (t) => t.status === "pending" || (!t.is_active && t.status !== "rejected")
  ).length;

  const filteredTestimonials = testimonials.filter((t) => {
    const status = t.status ?? (t.is_active ? "approved" : "pending");
    if (filter === "all") return true;
    return status === filter;
  });

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-semibold text-white">
              Testimonials & Reviews
            </h2>
            {pendingCount > 0 && (
              <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-300 border border-amber-500/30">
                {pendingCount} Pending Review
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-zinc-400">
            Manage and moderate client testimonials and public submissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 rounded-xl bg-zinc-900 p-1 border border-zinc-800">
            {(["all", "pending", "approved", "rejected"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${
                  filter === tab
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={handleCreate}
            disabled={isPending}
            className="rounded-xl bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50"
          >
            + Add New
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {filteredTestimonials.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-700 py-16 text-center text-zinc-500">
            No {filter !== "all" ? filter : ""} testimonials found.
          </div>
        ) : (
          filteredTestimonials.map((testimonial) => (
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