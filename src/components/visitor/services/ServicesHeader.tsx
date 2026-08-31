import { ServiceSection } from "@/types/service";

type Props = {
  section: ServiceSection;
};

export default function ServicesHeader({ section }: Props) {
  return (
    <div className="max-w-3xl text-left">
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px w-6 bg-neutral-400 dark:bg-neutral-600" />
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
          {section.section_heading || "Services & Offerings"}
        </p>
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black dark:text-white leading-[1.1]">
        {section.main_heading || "Ways We Can Work Together"}
      </h2>

      <p className="mt-4 text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
        {section.description}
      </p>
    </div>
  );
}