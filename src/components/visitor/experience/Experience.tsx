import { getProjects } from "@/services/projects/project.service";
import Reveal from "@/components/shared/Reveal";
import ExperienceCard from "./ExperienceCard";
import { Project } from "@/types/project";



interface ExperienceProps {
  experiences?: Project[];
}

export default async function Experience({ experiences: initialExperiences }: ExperienceProps = {}) {
  const experiences = initialExperiences !== undefined ? initialExperiences : ((await getProjects()) || []);

  if (experiences.length === 0) return null;

  return (
    <section
      id="experience"
      className="
        relative
        overflow-hidden
        bg-[#fafafa] dark:bg-neutral-950
        py-20
        text-black dark:text-white
        lg:py-24
      "
    >
      <div
        className="
          mx-auto
          max-w-[1500px]
          px-6
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-16 max-w-3xl">
          {/* Eyebrow */}
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-neutral-400" />
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  text-neutral-400
                "
              >
                Experience & Impact
              </p>
            </div>
          </Reveal>

          {/* Heading */}
          <Reveal delay={0.08}>
            <h2
              className="
                mt-6
                text-4xl
                font-medium
                leading-[1.02]
                tracking-[-0.04em]
                text-black dark:text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              Work that made an impact.
            </h2>
          </Reveal>
        </div>

        {/* =====================================================
            EXPERIENCE CARDS
        ===================================================== */}

        <div
          className="
            grid
            gap-8
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {experiences.map((experience, index) => (
            <Reveal
              key={experience.id}
              delay={0.1 + index * 0.08}
              className="h-full"
            >
              <ExperienceCard experience={experience} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}