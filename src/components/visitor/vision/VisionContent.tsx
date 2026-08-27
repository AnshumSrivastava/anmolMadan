import { Vision } from "@/types/vision";

type Props = {
  vision: Vision;
};

export default function VisionContent({
  vision,
}: Props) {
  return (
    <div className="max-w-2xl">

      {/* SECTION LABEL */}

      <p
        className="
          mb-6
          text-xs
          font-medium
          uppercase
          tracking-[0.3em]
          text-neutral-500
        "
      >
        {vision.section_heading}
      </p>

      {/* MAIN HEADING */}

      <h2
        className="
          text-5xl
          font-medium
          leading-[0.95]
          tracking-[-0.04em]
          sm:text-6xl
          lg:text-7xl
        "
      >
        {vision.main_heading}
      </h2>

      {/* DESCRIPTION */}

      <p
        className="
          mt-8
          max-w-xl
          text-lg
          leading-8
          text-neutral-600
          lg:text-xl
        "
      >
        {vision.description}
      </p>

    </div>
  );
}