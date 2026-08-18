"use client";

import { useState } from "react";

import { deleteProject } from "@/actions/projects";

import type { Project } from "@/types/project";

import ProjectModal from "./ProjectModal";

type Props = {
  projects: Project[];
};

export default function ProjectTable({
  projects,
}: Props) {

  const [open, setOpen] =
    useState(false);

  const [
    selectedProject,
    setSelectedProject,
  ] = useState<Project | null>(
    null
  );

  async function handleDelete(
    id: string
  ) {

    if (
      !window.confirm(
        "Delete this project?"
      )
    )
      return;

    await deleteProject(id);

    window.location.reload();

  }

  function handleCreate() {

    setSelectedProject(null);

    setOpen(true);

  }

  function handleEdit(
    project: Project
  ) {

    setSelectedProject(project);

    setOpen(true);

  }

  return (
    <>

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold">

            Projects

          </h2>

          <p className="mt-2 text-zinc-500">

            Manage your portfolio projects.

          </p>

        </div>

        <button
          onClick={handleCreate}
          className="
            rounded-xl

            border
            border-white

            px-6
            py-3

            transition

            hover:bg-white
            hover:text-black
          "
        >

          + New Project

        </button>

      </div>

      {/* Empty */}

      {!projects.length && (

        <div className="rounded-3xl border border-white/10 bg-zinc-950 p-16 text-center">

          <h3 className="text-2xl font-semibold">

            No Projects Yet

          </h3>

          <p className="mt-3 text-zinc-500">

            Create your first project.

          </p>

        </div>

      )}

      {/* Cards */}

      <div className="space-y-5">

        {projects.map((project) => (

          <div
            key={project.id}
            className="
              rounded-3xl
              border
              border-white/10

              bg-zinc-950

              p-8

              transition

              hover:border-white/30
            "
          >

            <div className="flex items-start justify-between">

              <div>

                <div className="mb-3 flex items-center gap-3">

                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-widest">

                    {project.category}

                  </span>

                  <span className="text-zinc-500">

                    {project.year}

                  </span>

                  {project.featured && (

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">

                      Featured

                    </span>

                  )}

                </div>

                <h3 className="text-2xl font-bold">

                  {project.title}

                </h3>

                <p className="mt-3 max-w-2xl text-zinc-400">

                  {project.description}

                </p>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    handleEdit(project)
                  }
                  className="
                    rounded-xl

                    border
                    border-white/20

                    px-5
                    py-3

                    transition

                    hover:bg-white
                    hover:text-black
                  "
                >

                  Edit

                </button>

                <button
                  onClick={() =>
                    handleDelete(project.id)
                  }
                  className="
                    rounded-xl

                    border
                    border-red-500

                    px-5
                    py-3

                    text-red-400

                    transition

                    hover:bg-red-600
                    hover:text-white
                  "
                >

                  Delete

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      <ProjectModal
        open={open}
        project={selectedProject}
        onClose={() =>
          setOpen(false)
        }
      />

    </>
  );

}