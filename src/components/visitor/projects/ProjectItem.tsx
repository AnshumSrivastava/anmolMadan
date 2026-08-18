import { Project } from "@/types/project";
import ProjectLinks from "./ProjectLinks";

type Props = {
  project: Project;
};

export default function ProjectItem({ project }: Props) {
  return (
    <article className="group border-l border-white/10 pl-6 transition-all duration-300 hover:border-black">

      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
        <span>{project.category}</span>

        <span>•</span>

        <span>{project.year}</span>

        {project.featured && (
          <span className="rounded-full border border-white/20 px-2 py-1 text-[10px] tracking-[0.2em] text-black">
            Featured
          </span>
        )}
      </div>

      <h3 className="mt-4 text-2xl font-semibold transition duration-300 group-hover:translate-x-1">
        {project.title}
      </h3>

      <p className="mt-4 text-sm leading-7 text-neutral-400 transition group-hover:text-neutral-300">
        {project.description}
      </p>

      <div className="mt-6">
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}