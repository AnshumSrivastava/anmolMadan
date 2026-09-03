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
  ].filter((item) => item.title && item.description);

  return (
    <div className="mt-20">
      {/* USP HEADER */}
      <div className="mb-8 flex items-center gap-3">
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
          What Sets Me Apart
        </p>

        <span className="h-px w-6 bg-neutral-400 dark:bg-neutral-600" />
      </div>

      {/* USP GRID — Full 3-column width */}
      <div className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3">
        {usps.map((usp) => (
          <div
            key={usp.number}
            className="
              group
              relative
              flex
              flex-col
              justify-between
              rounded-3xl
              border
              border-neutral-200/90
              bg-white
              p-8
              transition-all
              duration-300
              hover:-translate-y-1.5
              hover:border-black
              hover:shadow-xl
              dark:border-neutral-800
              dark:bg-neutral-900/60
              dark:hover:border-neutral-500
            "
          >
            <div>
              <span
                className="
                  font-mono
                  text-xs
                  font-semibold
                  tracking-widest
                  text-neutral-400
                  transition-colors
                  duration-300
                  group-hover:text-black
                  dark:group-hover:text-white
                "
              >
                {usp.number}
              </span>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-black dark:text-white">
                {usp.title}
              </h3>

              <div
                className="
                  my-4
                  h-px
                  w-10
                  bg-neutral-200
                  transition-all
                  duration-300
                  group-hover:w-16
                  group-hover:bg-black
                  dark:bg-neutral-700
                  dark:group-hover:bg-white
                "
              />

              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {usp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}