import { Vision } from "@/types/vision";
import { Quote } from "lucide-react";

type Props = {
  vision: Vision;
};

export default function USP({ vision }: Props) {
  const usps = [
    {
      number: "01",
      title: vision.usp_1_title,
      description: vision.usp_1_description,
    },
    {
      number: "02",
      title: vision.usp_2_title,
      description: vision.usp_2_description,
    },
    {
      number: "03",
      title: vision.usp_3_title,
      description: vision.usp_3_description,
    },
    {
      number: "04",
      title: vision.usp_4_title,
      description: vision.usp_4_description,
    },
  ].filter((item) => item.title && item.description);

  return (
    <div className="mt-24">
      {/* USP HEADER */}
      <div className="mb-10 flex items-center gap-3">
        <span className="h-px w-6 bg-neutral-400" />
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">
          What Sets Me Apart
        </p>
      </div>

      {/* USP GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {usps.map((usp) => (
          <div
            key={usp.number}
            className="
              group
              relative
              rounded-3xl
              border
              border-neutral-200
              bg-white
              p-8
              transition-all
              duration-500
              hover:-translate-y-1.5
              hover:border-black
              hover:shadow-xl
            "
          >
            <span className="text-xs font-mono font-semibold tracking-widest text-neutral-400 group-hover:text-black transition-colors duration-300">
              {usp.number}
            </span>

            <h3 className="mt-6 text-xl font-bold tracking-tight text-black">
              {usp.title}
            </h3>

            <div className="my-4 h-px w-10 bg-neutral-200 transition-all duration-500 group-hover:w-16 group-hover:bg-black" />

            <p className="text-sm leading-relaxed text-neutral-600">
              {usp.description}
            </p>
          </div>
        ))}
      </div>

      {/* CLOSING STATEMENT / PULL QUOTE */}
      {vision.closing_statement && (
        <div className="relative mx-auto mt-24 max-w-4xl overflow-hidden rounded-3xl border border-neutral-200 bg-white p-10 sm:p-14 text-center shadow-sm">
          <Quote className="mx-auto mb-6 h-8 w-8 text-neutral-300" />
          <p className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-snug tracking-[-0.03em] text-black">
            "{vision.closing_statement}"
          </p>
          <div className="mx-auto mt-8 h-1 w-12 rounded-full bg-black" />
        </div>
      )}
    </div>
  );
}