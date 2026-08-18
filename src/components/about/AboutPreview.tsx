"use client";

import { About } from "@/types/about";

type Props = {
  data: About;
};

export default function AboutPreview({ data }: Props) {
  const credentials = [
    {
      title: data.credential_1_title,
      subtitle: data.credential_1_subtitle,
    },
    {
      title: data.credential_2_title,
      subtitle: data.credential_2_subtitle,
    },
    {
      title: data.credential_3_title,
      subtitle: data.credential_3_subtitle,
    },
    {
      title: data.credential_4_title,
      subtitle: data.credential_4_subtitle,
    },
  ];

  const audience = [
    {
      title: data.audience_1_title,
      description: data.audience_1_description,
    },
    {
      title: data.audience_2_title,
      description: data.audience_2_description,
    },
    {
      title: data.audience_3_title,
      description: data.audience_3_description,
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Live Preview
      </h2>

      <div className="rounded-xl bg-zinc-950 p-6 space-y-8">
        {/* Heading */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            {data.section_heading || "ABOUT"}
          </p>

          <h3 className="mt-3 text-2xl font-bold text-white">
            {data.main_heading || "Main Heading"}
          </h3>
        </div>

        {/* Paragraphs */}
        <div className="space-y-4 text-sm leading-7 text-zinc-400">
          <p>{data.paragraph_1}</p>
          <p>{data.paragraph_2}</p>
          <p>{data.paragraph_3}</p>
        </div>

        {/* Credentials */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Credentials
          </h4>

          <div className="grid grid-cols-2 gap-3">
            {credentials.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-zinc-800 p-4"
              >
                <h5 className="font-semibold text-white">
                  {item.title || "Title"}
                </h5>

                <p className="mt-1 text-sm text-zinc-400">
                  {item.subtitle || "Subtitle"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Audience */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Audience
          </h4>

          <div className="space-y-3">
            {audience.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-zinc-800 p-4"
              >
                <h5 className="font-semibold text-white">
                  {item.title || "Audience"}
                </h5>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {item.description || "Description"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Static Button */}
        <button
          type="button"
          disabled
          className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black opacity-90"
        >
          See What I Offer
        </button>
      </div>
    </div>
  );
}