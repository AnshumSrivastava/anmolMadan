import Reveal from "@/components/shared/Reveal";
import { getProjects } from "@/services/projects/project.service";

import ProjectHeader from "./ProjectHeader";
import ProjectItem from "./ProjectItem";

export default async function Projects() {
  const projects = await getProjects();

  const categoryOrder = [
    "Web App",
    "Website",
    "SaaS",
    "AI",
    "Open Source",
    "Other",
  ];

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#fafafa] py-24 text-black md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}

        <Reveal>
          <ProjectHeader />
        </Reveal>

        {/* Projects */}

        <div className="mt-20 space-y-24">
          {categoryOrder.map((category) => {
            const categoryProjects = projects.filter(
              (project) =>
                (project.category ?? "Other") === category
            );

            if (!categoryProjects.length) return null;

            return (
              <Reveal key={category}>
                <section>

                  {/* Category */}

                  <div className="mb-10">
                    <div className="flex items-center gap-6">
                      <h3 className="shrink-0 text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-400">
                        {category}
                      </h3>

                      <div className="h-px flex-1 bg-black/10" />
                    </div>
                  </div>

                  {/* Projects */}

                  <div className="space-y-16">
                    {categoryProjects.map((project) => (
                      <ProjectItem
                        key={project.id}
                        project={project}
                      />
                    ))}
                  </div>

                </section>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}