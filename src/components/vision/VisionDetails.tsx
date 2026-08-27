"use client";

import { Vision } from "@/types/vision";

type Props = {
  data: Vision;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => void;
};

export default function VisionDetails({
  data,
  onChange,
}: Props) {
  return (
    <div
      className="
        space-y-6

        rounded-2xl
        border
        border-zinc-800

        bg-zinc-900

        p-6
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>
        <h2 className="text-xl font-semibold text-white">
          Vision Details
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Manage the main content of your Vision / USP
          section.
        </p>
      </div>

      {/* =====================================================
          SECTION HEADING
      ===================================================== */}

      <div>
        <label
          htmlFor="section_heading"
          className="
            mb-2
            block

            text-sm
            font-medium

            text-zinc-300
          "
        >
          Section Heading
        </label>

        <input
          id="section_heading"
          type="text"
          name="section_heading"
          value={
            data.section_heading ?? ""
          }
          onChange={onChange}
          placeholder="VISION"
          className="
            w-full

            rounded-xl
            border
            border-zinc-700

            bg-zinc-950

            px-4
            py-3

            text-white

            outline-none

            transition

            placeholder:text-zinc-600

            focus:border-white
          "
        />
      </div>

      {/* =====================================================
          MAIN HEADING
      ===================================================== */}

      <div>
        <label
          htmlFor="main_heading"
          className="
            mb-2
            block

            text-sm
            font-medium

            text-zinc-300
          "
        >
          Main Heading
        </label>

        <input
          id="main_heading"
          type="text"
          name="main_heading"
          value={
            data.main_heading ?? ""
          }
          onChange={onChange}
          placeholder="Cybersecurity Should Be Understood."
          className="
            w-full

            rounded-xl
            border
            border-zinc-700

            bg-zinc-950

            px-4
            py-3

            text-white

            outline-none

            transition

            placeholder:text-zinc-600

            focus:border-white
          "
        />
      </div>

      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <div>
        <label
          htmlFor="description"
          className="
            mb-2
            block

            text-sm
            font-medium

            text-zinc-300
          "
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows={6}
          value={
            data.description ?? ""
          }
          onChange={onChange}
          placeholder="Describe your vision and approach..."
          className="
            w-full

            resize-none

            rounded-xl
            border
            border-zinc-700

            bg-zinc-950

            px-4
            py-3

            text-white

            outline-none

            transition

            placeholder:text-zinc-600

            focus:border-white
          "
        />
      </div>
    </div>
  );
}