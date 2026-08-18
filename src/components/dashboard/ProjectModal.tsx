"use client";

import { useEffect } from "react";

import type { Project } from "@/types/project";
import ProjectForm from "@/components/forms/ProjectForm";

type Props = {
  open: boolean;
  onClose: () => void;
  project: Project | null;
};

export default function ProjectModal({
  open,
  onClose,
  project,
}: Props) {
  useEffect(() => {
    if (!open) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-2xl"
      >
        {/* Close */}

        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-3xl text-zinc-500 transition hover:text-white"
        >
          ×
        </button>

        {/* Heading */}

        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            {project ? "Edit Project" : "Create Project"}
          </h2>

          <p className="mt-2 text-zinc-500">
            Fill in the project details below.
          </p>

        </div>

        {/* Form */}

        <ProjectForm
          project={project}
          onSuccess={onClose}
        />

      </div>
    </div>
  );
}