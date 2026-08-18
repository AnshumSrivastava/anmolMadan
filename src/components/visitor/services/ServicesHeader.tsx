import { ServiceSection } from "@/types/service";

type Props = {
  section: ServiceSection;
};

export default function ServicesHeader({
  section,
}: Props) {
  return (
    <div className="mx-auto mb-24 max-w-4xl text-center">
      <p className="text-xs font-medium uppercase tracking-[0.35em] text-zinc-500">
        {section.section_heading}
      </p>

      <h2 className="mt-6 text-5xl font-semibold leading-tight tracking-tight text-black md:text-6xl lg:text-7xl">
        {section.main_heading}
      </h2>

      <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-600">
        {section.description}
      </p>
    </div>
  );
}