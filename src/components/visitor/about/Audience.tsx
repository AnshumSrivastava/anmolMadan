import Reveal from "@/components/shared/Reveal";
import { About } from "@/types/about";
import { Building2, GraduationCap, Users } from "lucide-react";

type Props = {
  about: About;
};

export default function Audience({ about }: Props) {
  const audience = [
    {
      title: about.audience_1_title,
      description: about.audience_1_description,
      icon: Building2,
    },
    {
      title: about.audience_2_title,
      description: about.audience_2_description,
      icon: GraduationCap,
    },
    {
      title: about.audience_3_title,
      description: about.audience_3_description,
      icon: Users,
    },
  ];

  return (
    <div className="space-y-12">
      <Reveal>
        <div className="text-center">
          {/* ==================================================
              SECTION LABEL
          ================================================== */}

          <div className="flex items-center justify-center gap-3">
            {/* Left Line */}
            <span className="h-px w-6 bg-zinc-400 dark:bg-neutral-600" />

            {/* Label */}
            <p
              className="
                whitespace-nowrap
                text-xs
                font-semibold
                uppercase
                tracking-[0.32em]
                text-zinc-400
                dark:text-neutral-400
              "
            >
              Who I Work With
            </p>

            {/* Right Line */}
            <span className="h-px w-6 bg-zinc-400 dark:bg-neutral-600" />
          </div>

          {/* ==================================================
              MAIN HEADING
          ================================================== */}

          <h3
            className="
              mt-4
              text-3xl
              font-bold
              tracking-tight
              text-black
              dark:text-white
              sm:text-4xl
              md:text-5xl
            "
          >
            Helping People Across Industries
          </h3>

          {/* ==================================================
              HEADING DIVIDER
          ================================================== */}

          <div
            className="
              mx-auto
              mt-4
              h-px
              w-16
              bg-zinc-300
              dark:bg-neutral-700
            "
          />
        </div>
      </Reveal>

      {/* ==================================================
          AUDIENCE CARDS
      ================================================== */}

      <div className="grid gap-6 lg:grid-cols-3">
        {audience.map((item, index) => {
          const Icon = item.icon;

          return (
            <Reveal key={index} delay={index * 0.1}>
              <div
                className="
                  group
                  h-full
                  rounded-3xl
                  border
                  border-zinc-200
                  bg-white
                  p-8
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-black
                  hover:shadow-xl
                  dark:border-neutral-800
                  dark:bg-neutral-900/60
                  dark:hover:border-neutral-500
                "
              >
                {/* ICON BADGE */}

                <div
                  className="
                    mb-6
                    flex
                    h-13
                    w-13
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-zinc-200
                    bg-zinc-50
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:border-black
                    group-hover:bg-black
                    dark:border-neutral-800
                    dark:bg-neutral-800
                    dark:group-hover:border-white
                    dark:group-hover:bg-white
                  "
                >
                  <Icon
                    className="
                      h-6
                      w-6
                      text-zinc-700
                      transition-colors
                      duration-500
                      group-hover:text-white
                      dark:text-neutral-300
                      dark:group-hover:text-black
                    "
                  />
                </div>

                {/* CARD TITLE */}

                <h4 className="text-2xl font-bold text-black dark:text-white">
                  {item.title}
                </h4>

                {/* CARD DIVIDER */}

                <div
                  className="
                    my-5
                    h-px
                    w-12
                    bg-zinc-300
                    transition-all
                    duration-500
                    group-hover:w-20
                    group-hover:bg-black
                    dark:bg-neutral-700
                    dark:group-hover:bg-white
                  "
                />

                {/* CARD DESCRIPTION */}

                <p className="text-sm leading-relaxed text-zinc-600 dark:text-neutral-400">
                  {item.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}