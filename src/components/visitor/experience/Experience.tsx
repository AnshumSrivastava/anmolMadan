import { getProjects } from "@/services/projects/project.service";
import Reveal from "@/components/shared/Reveal";
import ExperienceCard from "./ExperienceCard";
import { Project } from "@/types/project";

const fallbackExperiences: Project[] = [
  {
    id: "exp-1",
    lesson_title: "Executive Cybersecurity Defense & Threat Awareness",
    description:
      "Comprehensive digital security briefings and incident-response drills for senior corporate leadership and enterprise engineering teams.",
    institution_name: "Enterprise Tech Conclave",
    duration: "2024 — Present",
    image_url:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    institution_logo_url: null,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [],
    testimonials: [
      {
        id: "t-1",
        project_id: "exp-1",
        quote:
          "Anmol brought real-world attack vectors to life in a way our team had never experienced before.",
        author_name: "VP of Engineering",
        author_role: "Tech Enterprise",
        sort_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: "exp-2",
    lesson_title: "Campus-Wide Ethical Hacking & Security Bootcamp",
    description:
      "Interactive hands-on training empowering over 1,200 aspiring engineers and computer science scholars with foundational cybersecurity skills.",
    institution_name: "Chitkara University",
    duration: "2023 — 2025",
    image_url:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    institution_logo_url: null,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [],
    testimonials: [
      {
        id: "t-2",
        project_id: "exp-2",
        quote:
          "The most engaging technical workshop we've ever hosted on campus.",
        author_name: "Dean of Academic Affairs",
        author_role: "University Partner",
        sort_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: "exp-3",
    lesson_title: "Youth Mindset, Resilience & Digital Safety Keynote",
    description:
      "Inspiring youth conferences and leadership summits on personal branding, digital footprints, and relentless personal growth.",
    institution_name: "National Youth Conclave",
    duration: "2024",
    image_url:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    institution_logo_url: null,
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [],
    testimonials: [
      {
        id: "t-3",
        project_id: "exp-3",
        quote:
          "Anmol had the entire auditorium on their feet. Incredible energy and insight.",
        author_name: "Program Director",
        author_role: "Youth Summit",
        sort_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
  },
];

export default async function Experience() {
  const fetched = await getProjects();
  const experiences = fetched && fetched.length > 0 ? fetched : fallbackExperiences;

  return (
    <section
      id="experience"
      className="
        relative
        overflow-hidden
        bg-white
        py-24
        text-black
        lg:py-32
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
                text-black
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