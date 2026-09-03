import { ServiceSection } from "@/types/service";

type Props = {
  section: ServiceSection;
};

export default function ServicesHeader({ section }: Props) {
  return (
    <div className="max-w-3xl text-left">
      {/* ==================================================
          SECTION LABEL
      ================================================== */}

      <div className="mb-4 flex items-center gap-3">
        {/* Left Line */}
        <span className="h-px w-6 bg-neutral-400 dark:bg-neutral-600" />

        {/* Label */}
        <p
          className="
            whitespace-nowrap
            text-xs
            font-semibold
            uppercase
            tracking-[0.28em]
            text-neutral-500
            dark:text-neutral-400
          "
        >
          {section.section_heading || "Services & Offerings"}
        </p>

        {/* Right Line */}
        <span className="h-px w-6 bg-neutral-400 dark:bg-neutral-600" />
      </div>

      {/* ==================================================
          MAIN HEADING
      ================================================== */}

      <h2
        className="
          text-3xl
          font-bold
          leading-[1.1]
          tracking-tight
          text-black
          dark:text-white
          sm:text-4xl
          lg:text-5xl
        "
      >
        {section.main_heading || "Ways We Can Work Together"}
      </h2>

      {/* ==================================================
          HEADING DIVIDER
      ================================================== */}

      <div
        className="
          mt-4
          h-px
          w-16
          bg-zinc-300
          dark:bg-neutral-700
        "
      />

      {/* ==================================================
          DESCRIPTION
      ================================================== */}

      <p
        className="
          mt-8
          max-w-3xl
          text-base
          leading-relaxed
          text-neutral-600
          dark:text-neutral-400
          [text-align:justify]
          [text-justify:inter-word]
        "
      >
        {section.description}
      </p>
    </div>
  );
}