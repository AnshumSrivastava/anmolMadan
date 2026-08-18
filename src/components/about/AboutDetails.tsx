"use client";

import { About } from "@/types/about";

type Props = {
  data: About;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function AboutDetails({ data, onChange }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Basic Information
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Update your About section content.
        </p>
      </div>

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

      {/* Paragraph 1 */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Paragraph 1
        </label>

        <textarea
          rows={4}
          name="paragraph_1"
          value={data.paragraph_1}
          onChange={onChange}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none resize-none focus:border-white"
        />
      </div>

      {/* Paragraph 2 */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Paragraph 2
        </label>

        <textarea
          rows={4}
          name="paragraph_2"
          value={data.paragraph_2}
          onChange={onChange}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none resize-none focus:border-white"
        />
      </div>

      {/* Paragraph 3 */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Paragraph 3
        </label>

        <textarea
          rows={4}
          name="paragraph_3"
          value={data.paragraph_3}
          onChange={onChange}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none resize-none focus:border-white"
        />
      </div>
    </div>
  );
}