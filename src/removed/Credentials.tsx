import Reveal from "@/components/shared/Reveal";
import { About } from "@/types/about";

type Props = {
  about: About;
};

export default function Credentials({ about }: Props) {
  const credentials = [
    {
      title: about.credential_1_title,
      subtitle: about.credential_1_subtitle,
    },
    {
      title: about.credential_2_title,
      subtitle: about.credential_2_subtitle,
    },
    {
      title: about.credential_3_title,
      subtitle: about.credential_3_subtitle,
    },
    {
      title: about.credential_4_title,
      subtitle: about.credential_4_subtitle,
    },
  ].filter((item) => item.title && item.subtitle);

  return (
    <div className="space-y-10">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-zinc-400" />
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-zinc-500">
            Credentials & Achievements
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {credentials.map((item, index) => (
          <Reveal key={index} delay={index * 0.09}>
            <div className="group h-full rounded-3xl border border-zinc-200 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-black hover:shadow-xl">
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
                {item.title}
              </h3>

              <div className="my-5 h-px w-12 bg-zinc-200 transition-all duration-500 group-hover:w-24 group-hover:bg-black" />

              <p className="text-base leading-relaxed text-zinc-600">
                {item.subtitle}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}