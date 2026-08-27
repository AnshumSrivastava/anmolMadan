type ProjectCardData = {
  title: string;
  description: string;
  institution_name: string;
  institution_logo_url?: string | null;
  image_url?: string | null;
  duration?: string | null;
};

type Props = {
  project: ProjectCardData;
  onClick?: () => void;
};

export default function ProjectCard({
  project,
  onClick,
}: Props) {
  return (
    <article
      onClick={onClick}
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-950
        transition
        duration-300
        hover:-translate-y-1
        hover:border-zinc-600
      "
    >

      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">

        {project.image_url ? (

          <img
            src={project.image_url}
            alt={project.title}
            className="
              h-full
              w-full
              object-cover
              transition
              duration-500
              group-hover:scale-105
            "
          />

        ) : (

          <div
            className="
              flex
              h-full
              items-center
              justify-center
              text-sm
              text-zinc-600
            "
          >
            No Image
          </div>

        )}

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="space-y-5 p-5">

        {/* Institution */}

        <div className="flex items-center gap-3">

          {project.institution_logo_url ? (

            <img
              src={project.institution_logo_url}
              alt=""
              className="
                h-9
                w-9
                rounded-lg
                object-contain
                bg-white
                p-1
              "
            />

          ) : (

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                bg-zinc-800
                text-xs
                font-bold
                text-zinc-400
              "
            >
              {project.institution_name
                ?.charAt(0)
                ?.toUpperCase() || "?"}
            </div>

          )}

          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Institution
            </p>

            <p className="text-sm font-medium text-white">
              {project.institution_name ||
                "Institution"}
            </p>
          </div>

        </div>


        {/* Title */}

        <div>

          <h3 className="text-xl font-semibold text-white">
            {project.title || "Experience Title"}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-400">
            {project.description ||
              "Experience description"}
          </p>

        </div>


        {/* Duration */}

        {project.duration && (

          <div className="border-t border-zinc-800 pt-4">

            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Duration
            </p>

            <p className="mt-1 text-sm text-zinc-300">
              {project.duration}
            </p>

          </div>

        )}

      </div>

    </article>
  );
}