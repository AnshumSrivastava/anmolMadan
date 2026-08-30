import { Vision } from "@/types/vision";

type Props = {
  vision: Vision;
};

export default function VisionContent({ vision }: Props) {
  const isLoremIpsum =
    !vision.description ||
    vision.description.toLowerCase().includes("lorem ipsum");

  const displayDescription = isLoremIpsum
    ? "Cybersecurity is not just about firewalls and complex algorithms; it is about cultivating digital resilience, instinctive threat awareness, and empowering organizations and individuals to navigate modern technology safely with confidence."
    : vision.description;

  return (
    <div className="max-w-2xl text-left">
      {/* SECTION LABEL */}
      <div className="mb-6 flex items-center gap-3">
        <span className="h-px w-6 bg-neutral-400" />
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">
          {vision.section_heading || "VISION & PURPOSE"}
        </p>
      </div>

      {/* MAIN HEADING */}
      <h2
        className="
          text-4xl
          font-medium
          leading-[1.05]
          tracking-[-0.035em]
          text-black
          sm:text-5xl
          lg:text-6xl
        "
      >
        {vision.main_heading || "Cybersecurity Should Be Understood."}
      </h2>

      {/* DESCRIPTION */}
      <p
        className="
          mt-8
          max-w-xl
          text-base
          sm:text-lg
          leading-relaxed
          text-neutral-600
          lg:text-xl
        "
      >
        {displayDescription}
      </p>
    </div>
  );
}