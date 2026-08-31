import { About } from "@/types/about";

type Props = {
  about: About;
};

export default function AboutContent({ about }: Props) {
  return (
    <div className="max-w-2xl text-left">
      {/* Section Label */}
      <div className="inline-flex items-center gap-3">
        <span className="h-px w-6 bg-zinc-400 dark:bg-neutral-600" />
        <span className="text-xs font-semibold uppercase tracking-[0.32em] text-zinc-500 dark:text-neutral-400">
          {about.section_heading || "ABOUT ME"}
        </span>
      </div>

      {/* Heading */}
      <h2 className="mt-6 text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-black dark:text-white sm:text-5xl lg:text-6xl">
        {about.main_heading}
      </h2>

      {/* Divider */}
      <div className="mt-8 h-px w-16 bg-zinc-300 dark:bg-neutral-700" />

      {/* Paragraphs */}
      <div className="mt-8 space-y-6 text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-neutral-300">
        {about.paragraph_1 && <p>{about.paragraph_1}</p>}
        {about.paragraph_2 && <p>{about.paragraph_2}</p>}
        {about.paragraph_3 && <p>{about.paragraph_3}</p>}
      </div>
    </div>
  );
}