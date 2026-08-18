import { About } from "@/types/about";

type Props = {
  about: About;
};

export default function AboutContent({ about }: Props) {
  return (
    <div className="mx-auto max-w-5xl text-center">
      {/* Section Label */}
      <span className="inline-flex items-center rounded-full border border-zinc-300 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-zinc-600">
        {about.section_heading}
      </span>

      {/* Heading */}
      <h2 className="mx-auto mt-8 max-w-4xl text-5xl font-bold leading-tight tracking-tight text-black md:text-6xl lg:text-7xl">
        {about.main_heading}
      </h2>

      {/* Divider */}
      <div className="mx-auto mt-10 h-px w-24 bg-zinc-300" />

      {/* Paragraphs */}
      <div className="mx-auto mt-10 max-w-3xl space-y-8 text-lg leading-9 text-zinc-600">
        <p>{about.paragraph_1}</p>

        <p>{about.paragraph_2}</p>

        <p>{about.paragraph_3}</p>
      </div>
    </div>
  );
}