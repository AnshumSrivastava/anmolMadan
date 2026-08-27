import { getProjects } from "@/services/projects/project.service";
import ProjectsManager from "@/components/projects/ProjectsManager";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ProjectsManager projects={projects} />
      </div>
    </main>
  );
}
