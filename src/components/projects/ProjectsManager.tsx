"use client";

import { useMemo, useState } from "react";
import ProjectForm, {
  formDataFromProject,
  type ProjectFormData,
} from "./ProjectForm";
import { deleteProjectAction } from "@/actions/projects";

export type ProjectRecord = {
  id: string;
  lesson_title: string;
  description: string;
  institution_name: string;
  duration: string | null;
  image_url?: string | null;
  institution_logo_url?: string | null;
  sort_order?: number | null;
  created_at?: string;
  updated_at?: string;
  images?: Array<{
    id?: string;
    image_url: string;
    sort_order?: number | null;
  }>;
  testimonials?: Array<{
    id?: string;
    quote: string;
    author_name?: string | null;
    author_role?: string | null;
    sort_order?: number | null;
  }>;
};

type Props = {
  projects: ProjectRecord[];
};

export default function ProjectsManager({ projects }: Props) {
  const [editing, setEditing] = useState<ProjectRecord | null>(null);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)),
    [projects]
  );

  const closeForm = () => {
    setEditing(null);
    setCreating(false);
  };

  const handleDelete = async (project: ProjectRecord) => {
    const confirmed = window.confirm(
      `Delete "${project.lesson_title}"?\n\nThis removes the experience and its gallery/testimonials from the database.`
    );

    if (!confirmed) return;

    setDeletingId(project.id);

    try {
      const result = await deleteProjectAction(project.id);

      if (!result.success) {
        window.alert(result.message);
        return;
      }

      window.location.reload();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Failed to delete experience.");
    } finally {
      setDeletingId(null);
    }
  };

  const initialData: Partial<ProjectFormData> | undefined = editing
    ? formDataFromProject(editing)
    : undefined;

  if (creating || editing) {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Experiences
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white">
              {editing ? "Edit Experience" : "Create Experience"}
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              {editing
                ? "Modify the existing record. Your gallery is loaded below."
                : "Create a new experience and add its gallery."}
            </p>
          </div>

          <button
            type="button"
            onClick={closeForm}
            className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:border-zinc-500 hover:text-white"
          >
            ← Back to Experiences
          </button>
        </div>

        <ProjectForm
          initialData={initialData}
          onSaved={() => {
            window.location.reload();
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Portfolio CMS
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Experiences</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-500">
            Create, edit, delete and reorder the experiences shown on your portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCreating(true)}
          className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
        >
          + New Experience
        </button>
      </div>

      {sortedProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 px-6 py-16 text-center">
          <h2 className="text-lg font-semibold text-white">No experiences yet</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Create your first experience to start building the gallery.
          </p>
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
          >
            Create Experience
          </button>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {sortedProjects.map((project) => {
            const galleryCount = project.images?.length ?? 0;
            const testimonialCount = project.testimonials?.length ?? 0;

            return (
              <article
                key={project.id}
                className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
              >
                <div className="relative aspect-[16/8] overflow-hidden bg-zinc-950">
                  {project.images?.[0]?.image_url ? (
                    <img
                      src={project.images[0].image_url}
                      alt={project.lesson_title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-zinc-600">
                      No gallery image
                    </div>
                  )}

                  <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs text-zinc-300 backdrop-blur">
                    {galleryCount} {galleryCount === 1 ? "photo" : "photos"}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="truncate text-xl font-semibold text-white">
                        {project.lesson_title}
                      </h2>
                      <p className="mt-1 text-sm text-zinc-500">{project.institution_name}</p>
                    </div>

                    {project.institution_logo_url && (
                      <img
                        src={project.institution_logo_url}
                        alt=""
                        className="h-10 w-10 rounded-lg border border-zinc-800 bg-white object-contain p-1"
                      />
                    )}
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-400">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 text-xs text-zinc-500">
                    {project.duration && (
                      <span className="rounded-full border border-zinc-800 px-3 py-1">
                        {project.duration}
                      </span>
                    )}
                    <span className="rounded-full border border-zinc-800 px-3 py-1">
                      {testimonialCount} {testimonialCount === 1 ? "testimonial" : "testimonials"}
                    </span>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setEditing(project)}
                      className="flex-1 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-zinc-200"
                    >
                      Edit Experience
                    </button>

                    <button
                      type="button"
                      disabled={deletingId === project.id}
                      onClick={() => handleDelete(project)}
                      className="rounded-xl border border-red-900 px-4 py-3 text-sm font-semibold text-red-400 hover:bg-red-950 disabled:opacity-50"
                    >
                      {deletingId === project.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
