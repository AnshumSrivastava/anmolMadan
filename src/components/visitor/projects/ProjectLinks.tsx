import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Project } from "@/types/project";

type Props = {
  project: Project;
};

export default function ProjectLinks({ project }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {project.github && (
        <Link
          href={project.github}
          target="_blank"
          className="inline-flex items-center gap-1 text-sm text-neutral-400 transition hover:text-black"
        >
          GitHub
          <ArrowUpRight size={15} />
        </Link>
      )}

      {project.live_link && (
        <Link
          href={project.live_link}
          target="_blank"
          className="inline-flex items-center gap-1 text-sm text-neutral-400 transition hover:text-black"
        >
          Live
          <ArrowUpRight size={15} />
        </Link>
      )}
    </div>
  );
}