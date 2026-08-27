import ProjectCard from "./ProjectCard";
import ProjectTestimonial from "./ProjectTestimonial";

type Props = {
  project: {
    title: string;
    description: string;
    institution_name: string;
    institution_logo_url: string;
    image_url: string;
    testimonial: string;
    duration: string;
    gallery: string[];
  };
};

export default function ProjectPreview({
  project,
}: Props) {
  return (
    <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-xl font-semibold text-white">
        Live Preview
      </h2>


      {/* Card */}

      <ProjectCard
        project={project}
      />


      {/* Testimonial */}

      <div>

        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Testimonial
        </h3>

        <ProjectTestimonial
          testimonial={project.testimonial}
        />

      </div>


      {/* Gallery count */}

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">

        <div className="flex items-center justify-between">

          <span className="text-sm text-zinc-400">
            Gallery Photos
          </span>

          <span className="font-semibold text-white">
            {project.gallery.length}
          </span>

        </div>

      </div>

    </div>
  );
}