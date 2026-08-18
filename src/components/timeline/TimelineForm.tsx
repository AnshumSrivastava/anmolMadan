"use client";

import { useState } from "react";

import {
  createTimeline,
  updateTimeline,
} from "@/actions/timeline";

import type { Timeline } from "@/types/timeline";

type Props = {
  timeline?: Timeline | null;
};

export default function TimelineForm({
  timeline,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState<string | null>(
    timeline?.image ?? null
  );

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    try {
      if (timeline?.id) {
        formData.append("id", timeline.id);
        await updateTimeline(formData);
      } else {
        await createTimeline(formData);
      }

      window.location.reload();

    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-6"
    >

      <div className="grid gap-5 lg:grid-cols-2">

        <div>

  <label className="mb-2 block text-sm">
    Year
  </label>

  <input
    type="number"
    name="year"
    defaultValue={timeline?.year}
    placeholder="2026"
    min={1900}
    max={2100}
    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
    required
  />

</div>

      </div>

      <div>

        <label className="mb-2 block text-sm">
          Title
        </label>

        <input
          name="title"
          defaultValue={timeline?.title}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
          required
        />

      </div>

      <div>

        <label className="mb-2 block text-sm">
          Company/School
        </label>

        <input
          name="company"
          defaultValue={timeline?.company}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
          required
        />

      </div>

      <div>

        <label className="mb-2 block text-sm">
          Description
        </label>

        <textarea
          rows={5}
          name="description"
          defaultValue={timeline?.description}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        />

      </div>

      <div>

  <label className="mb-3 block text-sm font-medium">
    Timeline Image
  </label>

  <label
    htmlFor="timeline-image"
    className="flex h-56 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900 transition hover:border-white"
  >

    {preview ? (

      <img
        src={preview}
        alt="Preview"
        className="h-full w-full rounded-2xl object-cover"
      />

    ) : (

      <div className="text-center">

        <p className="text-lg font-semibold">
          Click to Upload
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          PNG • JPG • WEBP
        </p>

      </div>

    )}

  </label>

  <input
    hidden
    id="timeline-image"
    type="file"
    name="image"
    accept="image/*"
    onChange={(e) => {

      if (!e.target.files?.length) return;

      setPreview(
        URL.createObjectURL(
          e.target.files[0]
        )
      );

    }}
  />

</div>

      <button
        type="submit"
        disabled={loading}
     className="mt-4 h-14 w-full rounded-xl bg-white text-lg font-semibold text-black transition hover:opacity-90"
      >

        {loading
          ? "Saving..."
          : timeline
          ? "Update Timeline"
          : "Create Timeline"}

      </button>

    </form>
  );
}