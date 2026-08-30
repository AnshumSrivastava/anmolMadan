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
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-zinc-400">
            Who I Work With
          </p>

          <h3 className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl">
            Helping People Across Industries
          </h3>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-3">
        {audience.map((item, index) => {
          const Icon = item.icon;

          return (
            <Reveal key={index} delay={index * 0.1}>
              <div className="group h-full rounded-3xl border border-zinc-200 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-black hover:shadow-xl">
                {/* ICON BADGE */}
                <div className="mb-6 flex h-13 w-13 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 transition-all duration-500 group-hover:scale-110 group-hover:border-black group-hover:bg-black group-hover:text-white">
                  <Icon className="h-6 w-6 text-zinc-700 transition-colors duration-500 group-hover:text-white" />
                </div>

                <h4 className="text-2xl font-bold text-black">
                  {item.title}
                </h4>

                <div className="my-5 h-px w-12 bg-zinc-300 transition-all duration-500 group-hover:w-20 group-hover:bg-black" />

                <p className="text-sm leading-relaxed text-zinc-600">
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