"use client";

import { Hero } from "@/types/hero";
import HeroStats from "./HeroStats";

type Props = {
  form: Hero;
  preview: string | null;
};

export default function HeroPreview({ form, preview }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-white shadow-sm">
      <div className="grid min-h-[700px] lg:grid-cols-2">
        {/* Left */}
        <div className="flex flex-col justify-center p-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {form.pre_heading || "Cybersecurity Trainer"}
          </p>

          <h1 className="max-w-xl text-5xl font-bold leading-tight text-black">
            {form.title_line_1 || "I Make Cybersecurity Simple."}
          </h1>

          <p className="mt-8 max-w-xl leading-8 text-zinc-600">
            {form.description ||
              "Your description will appear here while editing the Hero section."}
          </p>

          {/* Static Buttons */}

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-zinc-800">
              Book A Call
            </button>

            <button className="rounded-xl border border-zinc-300 px-6 py-3 font-semibold text-black transition hover:bg-zinc-100">
              Learn More
            </button>
          </div>

          {/* Stats */}

          <HeroStats
            stats={[
              {
                number: form.stat_1_number,
                label: form.stat_1_label,
              },
              {
                number: form.stat_2_number,
                label: form.stat_2_label,
              },
              {
                number: form.stat_3_number,
                label: form.stat_3_label,
              },
              {
                number: form.stat_4_number,
                label: form.stat_4_label,
              },
            ]}
          />
        </div>

        {/* Right */}

        <div className="relative bg-zinc-100">
          {preview ? (
            <img
              src={preview}
              alt="Hero Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-400">
              Hero Image Preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}