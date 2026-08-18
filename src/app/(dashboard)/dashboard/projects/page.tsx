import { getProjects } from "@/services/projects/project.service";

import ProjectTable from "@/components/dashboard/ProjectTable";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="space-y-10">

      <ProjectTable
        projects={projects}
      />

    </section>
  );
}