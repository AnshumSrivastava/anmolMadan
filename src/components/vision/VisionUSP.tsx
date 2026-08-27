"use client";

import { Vision } from "@/types/vision";

type Props = {
  data: Vision;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => void;
};

export default function VisionUSP({
  data,
  onChange,
}: Props) {
  const cards = [
    {
      title: "usp_1_title",
      description: "usp_1_description",
      heading: "USP 1",
    },
    {
      title: "usp_2_title",
      description: "usp_2_description",
      heading: "USP 2",
    },
    {
      title: "usp_3_title",
      description: "usp_3_description",
      heading: "USP 3",
    },
    {
      title: "usp_4_title",
      description: "usp_4_description",
      heading: "USP 4",
    },
  ] as const;

  return (
    <div
      className="
        rounded-2xl
        border
        border-zinc-800

        bg-zinc-900

        p-6
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Unique Selling Points
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Manage the four principles that define your
          approach.
        </p>
      </div>

      {/* =====================================================
          USP CARDS
      ===================================================== */}

      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.heading}
            className="
              space-y-4

              rounded-xl
              border
              border-zinc-800

              bg-zinc-950

              p-5
            "
          >
            {/* CARD HEADING */}

            <h3 className="font-semibold text-white">
              {card.heading}
            </h3>

            {/* TITLE */}

            <div>
              <label
                htmlFor={card.title}
                className="
                  mb-2
                  block

                  text-sm

                  text-zinc-300
                "
              >
                Title
              </label>

              <input
                id={card.title}
                type="text"
                name={card.title}
                value={
                  data[card.title] ?? ""
                }
                onChange={onChange}
                placeholder="MAKE IT SIMPLE"
                className="
                  w-full

                  rounded-lg
                  border
                  border-zinc-700

                  bg-zinc-900

                  px-4
                  py-3

                  text-white

                  outline-none

                  transition

                  placeholder:text-zinc-600

                  focus:border-white
                "
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label
                htmlFor={card.description}
                className="
                  mb-2
                  block

                  text-sm

                  text-zinc-300
                "
              >
                Description
              </label>

              <textarea
                id={card.description}
                name={card.description}
                rows={4}
                value={
                  data[card.description] ?? ""
                }
                onChange={onChange}
                placeholder="Explain this principle..."
                className="
                  w-full

                  resize-none

                  rounded-lg
                  border
                  border-zinc-700

                  bg-zinc-900

                  px-4
                  py-3

                  text-white

                  outline-none

                  transition

                  placeholder:text-zinc-600

                  focus:border-white
                "
              />
            </div>
          </div>
        ))}
      </div>

      {/* =====================================================
          CLOSING STATEMENT
      ===================================================== */}

      <div className="mt-6">
        <label
          htmlFor="closing_statement"
          className="
            mb-2
            block

            text-sm
            font-medium

            text-zinc-300
          "
        >
          Closing Statement
        </label>

        <textarea
          id="closing_statement"
          name="closing_statement"
          rows={4}
          value={
            data.closing_statement ?? ""
          }
          onChange={onChange}
          placeholder="I don't just teach cybersecurity. I make people care about it."
          className="
            w-full

            resize-none

            rounded-xl
            border
            border-zinc-700

            bg-zinc-950

            px-4
            py-3

            text-white

            outline-none

            transition

            placeholder:text-zinc-600

            focus:border-white
          "
        />
      </div>
    </div>
  );
}