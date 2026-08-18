"use client";

import { About } from "@/types/about";

type Props = {
  data: About;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function AboutAudience({ data, onChange }: Props) {
  const cards = [
    {
      title: "audience_1_title",
      description: "audience_1_description",
      heading: "Audience 1",
    },
    {
      title: "audience_2_title",
      description: "audience_2_description",
      heading: "Audience 2",
    },
    {
      title: "audience_3_title",
      description: "audience_3_description",
      heading: "Audience 3",
    },
  ] as const;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Audience Cards
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Manage the audience cards displayed in your About section.
        </p>
      </div>

      <div className="space-y-6">
        {cards.map((card) => (
          <div
            key={card.heading}
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-4"
          >
            <h3 className="font-semibold text-white">
              {card.heading}
            </h3>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Title
              </label>

              <input
                type="text"
                name={card.title}
                value={data[card.title]}
                onChange={onChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Description
              </label>

              <textarea
                rows={4}
                name={card.description}
                value={data[card.description]}
                onChange={onChange}
                className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-white"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}