import Reveal from "@/components/shared/Reveal";
import { About } from "@/types/about";

type Props = {
  about: About;
};

export default function Audience({ about }: Props) {
  const audience = [
    {
      title: about.audience_1_title,
      description: about.audience_1_description,
    },
    {
      title: about.audience_2_title,
      description: about.audience_2_description,
    },
    {
      title: about.audience_3_title,
      description: about.audience_3_description,
    },
  ];

  return (
    <div className="space-y-12">
      <Reveal>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Who I Work With
          </p>

          <h3 className="mt-4 text-4xl font-bold tracking-tight text-black md:text-5xl">
            Helping People Across Industries
          </h3>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-3">
        {audience.map((item, index) => (
          <Reveal key={index} delay={index * 0.08}>
            <div className="group h-full rounded-3xl border border-zinc-200 bg-zinc-50 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-black hover:bg-white hover:shadow-2xl">
              <div className="mb-6 h-12 w-12 rounded-full border border-zinc-300 transition-colors duration-500 group-hover:border-black" />

              <h4 className="text-2xl font-bold text-black">
                {item.title}
              </h4>

              <div className="my-5 h-px w-14 bg-zinc-300 transition-all duration-500 group-hover:w-24 group-hover:bg-black" />

              <p className="leading-7 text-zinc-600">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}