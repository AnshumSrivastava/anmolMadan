"use client";

import { ServiceSection } from "@/types/service";

type Props = {
  data: ServiceSection;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function ServicesDetails({
  data,
  onChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Manage your Services section.
        </p>
      </div>

      <div className="space-y-6">
        {/* Section Heading */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Section Heading
          </label>

          <input
            type="text"
            name="section_heading"
            value={data.section_heading}
            onChange={onChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

        {/* Main Heading */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Main Heading
          </label>

          <input
            type="text"
            name="main_heading"
            value={data.main_heading}
            onChange={onChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Description
          </label>

          <textarea
            rows={4}
            name="description"
            value={data.description}
            onChange={onChange}
            className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>
      </div>
    </div>
  );
}