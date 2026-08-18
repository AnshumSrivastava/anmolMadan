"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createProject,
  updateProject,
} from "@/actions/projects";

import type { Project } from "@/types/project";

type Props = {
  project?: Project | null;
  onSuccess?: () => void;
};

export default function ProjectForm({
  project,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    try {
      if (project?.id) {
        formData.append("id", project.id);
        await updateProject(formData);
      } else {
        await createProject(formData);
      }

      onSuccess?.();

      router.refresh();

    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-6"
    >
      {/* Title */}

      <div>

        <label className="mb-2 block text-sm">
          Project Title
        </label>

        <input
          id="title"
          name="title"
          required
          defaultValue={project?.title}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
          onChange={(e) => {

            const slug =
              document.getElementById(
                "slug"
              ) as HTMLInputElement;

            slug.value = slugify(
              e.target.value
            );

          }}
        />

      </div>

      {/* Slug */}

      <div>

        <label className="mb-2 block text-sm">
          Slug
        </label>

        <input
          id="slug"
          name="slug"
          required
          defaultValue={project?.slug}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        />

      </div>

      {/* Category + Year */}

      <div className="grid gap-5 lg:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm">
            Category
          </label>

          <select
            name="category"
            defaultValue={project?.category}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
          >
            <option>Web App</option>
            <option>Website</option>
            <option>SaaS</option>
            <option>Mobile App</option>
            <option>AI</option>
            <option>Open Source</option>
            <option>Other</option>
          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm">
            Year
          </label>

          <input
            type="number"
            name="year"
            required
            defaultValue={project?.year}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
          />

        </div>

      </div>

      {/* Description */}

      <div>

        <label className="mb-2 block text-sm">
          Description
        </label>

        <textarea
          rows={5}
          name="description"
          defaultValue={project?.description}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        />

      </div>

      {/* Github */}

      <div>

        <label className="mb-2 block text-sm">
          Github
        </label>

        <input
          name="github"
          defaultValue={project?.github ?? ""}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        />

      </div>

      {/* Live Link */}

      <div>

        <label className="mb-2 block text-sm">
          Live Link
        </label>

        <input
          name="live_link"
          defaultValue={project?.live_link ?? ""}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        />

      </div>

      {/* Featured */}

      <div className="flex items-center gap-3">

        <input
          id="featured"
          type="checkbox"
          name="featured"
          defaultChecked={project?.featured}
        />

        <label htmlFor="featured">
          Featured Project
        </label>

      </div>

      {/* Sort Order */}

      <div>

        <label className="mb-2 block text-sm">
          Sort Order
        </label>

        <input
          type="number"
          name="sort_order"
          defaultValue={project?.sort_order ?? 1}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        />

      </div>

      {/* Button */}

      <button
        type="submit"
        disabled={loading}
        className="h-14 w-full rounded-xl bg-white text-lg font-semibold text-black transition hover:opacity-90"
      >
        {loading
          ? "Saving..."
          : project
          ? "Update Project"
          : "Create Project"}
      </button>

    </form>
  );
}