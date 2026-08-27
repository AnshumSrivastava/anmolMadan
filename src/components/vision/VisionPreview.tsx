"use client";

import { Vision } from "@/types/vision";

type Props = {
  data: Vision;
};

export default function VisionPreview({
  data,
}: Props) {
  const usp = [
    {
      title: data.usp_1_title,
      description:
        data.usp_1_description,
    },
    {
      title: data.usp_2_title,
      description:
        data.usp_2_description,
    },
    {
      title: data.usp_3_title,
      description:
        data.usp_3_description,
    },
    {
      title: data.usp_4_title,
      description:
        data.usp_4_description,
    },
  ];

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

      <h2 className="mb-6 text-xl font-semibold text-white">
        Live Preview
      </h2>

      {/* =====================================================
          PREVIEW CANVAS
      ===================================================== */}

      <div
        className="
          overflow-hidden

          rounded-xl

          bg-zinc-950

          text-white
        "
      >
        {/* ===================================================
            IMAGE
        =================================================== */}

        {data.image_url && (
          <div
            className="
              aspect-[16/10]

              w-full

              overflow-hidden
            "
          >
            <img
              src={data.image_url}
              alt="Vision"
              className="
                h-full
                w-full

                object-cover
              "
            />
          </div>
        )}

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="space-y-8 p-6">
          {/* =================================================
              HEADING
          ================================================= */}

          <div>
            <p
              className="
                text-xs

                font-semibold

                uppercase

                tracking-[0.3em]

                text-zinc-500
              "
            >
              {data.section_heading ||
                "VISION"}
            </p>

            <h3
              className="
                mt-3

                text-2xl

                font-bold

                leading-tight

                text-white
              "
            >
              {data.main_heading ||
                "Cybersecurity Should Be Understood."}
            </h3>
          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          {data.description && (
            <p
              className="
                text-sm

                leading-7

                text-zinc-400
              "
            >
              {data.description}
            </p>
          )}

          {/* =================================================
              USP
          ================================================= */}

          <div>
            <h4
              className="
                mb-4

                text-sm

                font-semibold

                uppercase

                tracking-wider

                text-zinc-500
              "
            >
              What Sets Me Apart
            </h4>

            <div className="space-y-3">
              {usp.map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={index}
                    className="
                      rounded-lg

                      border
                      border-zinc-800

                      p-4
                    "
                  >
                    <div
                      className="
                        flex

                        items-start

                        gap-3
                      "
                    >
                      <span
                        className="
                          shrink-0

                          text-xs

                          font-semibold

                          text-zinc-600
                        "
                      >
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <div>
                        <h5
                          className="
                            font-semibold

                            text-white
                          "
                        >
                          {item.title ||
                            `USP ${
                              index + 1
                            }`}
                        </h5>

                        <p
                          className="
                            mt-2

                            text-sm

                            leading-6

                            text-zinc-400
                          "
                        >
                          {item.description ||
                            "Description"}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* =================================================
              CLOSING STATEMENT
          ================================================= */}

          {data.closing_statement && (
            <div
              className="
                border-t
                border-zinc-800

                pt-6
              "
            >
              <p
                className="
                  text-lg

                  font-semibold

                  leading-relaxed

                  text-white
                "
              >
                {data.closing_statement}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}