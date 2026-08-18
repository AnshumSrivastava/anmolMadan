"use client";

import { About } from "@/types/about";

type Props = {
  data: About;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function AboutCredentials({ data, onChange }: Props) {
  const cards = [
    {
      title: "credential_1_title",
      subtitle: "credential_1_subtitle",
      heading: "Credential 1",
    },
    {
      title: "credential_2_title",
      subtitle: "credential_2_subtitle",
      heading: "Credential 2",
    },
    {
      title: "credential_3_title",
      subtitle: "credential_3_subtitle",
      heading: "Credential 3",
    },
    {
      title: "credential_4_title",
      subtitle: "credential_4_subtitle",
      heading: "Credential 4",
    },
  ] as const;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Credentials
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Manage your credential cards.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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
                Subtitle
              </label>

              <input
                type="text"
                name={card.subtitle}
                value={data[card.subtitle]}
                onChange={onChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-white"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}