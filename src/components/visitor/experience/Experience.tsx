import { getProjects } from "@/services/projects/project.service";

import Reveal from "@/components/shared/Reveal";

import ExperienceCard from "./ExperienceCard";

export default async function Experience() {
  const experiences = await getProjects();

  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section
      id="experience"
      className="
        relative
        overflow-hidden
        bg-white
        py-32
        text-black
        lg:py-40
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

        <div className="mb-20 max-w-3xl">
          {/* Eyebrow */}

          <Reveal>
            <p
              className="
                mb-5
                text-xs
                font-semibold
                uppercase
                tracking-[0.35em]
                text-neutral-400
              "
            >
              Experience
            </p>
          </Reveal>

          {/* Heading */}

          <Reveal delay={0.08}>
            <h2
              className="
                text-5xl
                font-medium
                leading-[0.95]
                tracking-[-0.055em]
                sm:text-6xl
                lg:text-7xl
              "
            >
              Work that
              <br />
              made an impact.
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
          {experiences.map(
            (experience, index) => (
              <Reveal
                key={experience.id}
                delay={0.12 + index * 0.1}
                className="h-full"
              >
                <ExperienceCard
                  experience={experience}
                />
              </Reveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}