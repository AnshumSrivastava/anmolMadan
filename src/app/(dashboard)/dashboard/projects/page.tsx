import { getProjects } from "@/services/projects/project.service";
import { getAllCommentsForAdmin } from "@/services/projectComments/projectComments.service";
import ProjectsManager from "@/components/projects/ProjectsManager";
import CommentsModerator from "@/components/projects/CommentsModerator";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const [projects, comments] = await Promise.all([
    getProjects(),
    getAllCommentsForAdmin(),
  ]);

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <ProjectsManager projects={projects} />
        <CommentsModerator initialComments={comments} />
      </div>
    </main>
  );
}
