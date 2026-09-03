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
        <span className="h-px w-6 bg-neutral-400 dark:bg-neutral-600" />

        <p
          className="
            whitespace-nowrap
            text-xs
            font-semibold
            uppercase
            tracking-[0.32em]
            text-neutral-500
            dark:text-neutral-400
          "
        >
          {vision.section_heading || "VISION & PURPOSE"}
        </p>

        <span className="h-px w-6 bg-neutral-400 dark:bg-neutral-600" />
      </div>

      {/* MAIN HEADING */}
      <h2
        className="
          text-4xl
          font-medium
          leading-[1.05]
          tracking-[-0.035em]
          text-black dark:text-white
          sm:text-5xl
          lg:text-6xl
        "
      >
        {vision.main_heading || "Cybersecurity Should Be Understood."}
      </h2>

      {/* HEADING DIVIDER */}
      <div className="mt-8 h-px w-16 bg-zinc-300 dark:bg-neutral-700" />

      {/* DESCRIPTION */}
      <p
        className="
          mt-8
          max-w-xl
          text-base
          leading-relaxed
          text-neutral-600 dark:text-neutral-400
          sm:text-lg
          lg:text-xl
        "
      >
        {displayDescription}
      </p>
    </div>
  );
}