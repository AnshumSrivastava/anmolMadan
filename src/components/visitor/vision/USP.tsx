import { Vision } from "@/types/vision";

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
  ];

  return (
    <div className="mt-24">

      {/* USP HEADER */}

      <div className="mb-10">
        <p
          className="
            text-xs
            font-medium
            uppercase
            tracking-[0.3em]
            text-neutral-500
          "
        >
          What Sets Me Apart
        </p>
      </div>

      {/* USP GRID */}

      <div
        className="
          grid
          gap-px
          overflow-hidden
          rounded-2xl
          border
          border-neutral-200
          bg-neutral-200
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {usps.map((usp) => (
          <div
            key={usp.number}
            className="
              bg-[#fafafa]
              p-7
              transition-colors
              duration-300
              hover:bg-white
            "
          >
            <span
              className="
                text-xs
                font-medium
                tracking-wider
                text-neutral-400
              "
            >
              {usp.number}
            </span>

            <h3
              className="
                mt-8
                text-xl
                font-semibold
                uppercase
                tracking-[-0.02em]
              "
            >
              {usp.title}
            </h3>

            <p
              className="
                mt-4
                text-sm
                leading-6
                text-neutral-500
              "
            >
              {usp.description}
            </p>
          </div>
        ))}
      </div>

      {/* CLOSING STATEMENT */}

      {vision.closing_statement && (
        <div
          className="
            mx-auto
            mt-20
            max-w-4xl
            text-center
          "
        >
          <p
            className="
              text-3xl
              font-medium
              leading-[1.1]
              tracking-[-0.035em]
              text-black
              sm:text-4xl
              lg:text-5xl
            "
          >
            {vision.closing_statement}
          </p>
        </div>
      )}

    </div>
  );
}