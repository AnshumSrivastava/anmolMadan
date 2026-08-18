"use client";

import Image from "next/image";
import type { Timeline } from "@/types/timeline";

type Props = {
  item: Timeline;
  onEdit: (item: Timeline) => void;
  onDelete: (id: string) => void;
};

export default function TimelineCard({
  item,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:border-zinc-700">

      {item.image && (
        <div className="relative h-52 w-full">

          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />

        </div>
      )}

      <div className="p-6">

        <p className="text-sm text-zinc-500">
          {item.year}
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {item.title}
        </h2>

        <p className="mt-1 text-zinc-400">
          {item.company}
        </p>

        <p className="mt-5 text-zinc-500">
          {item.description}
        </p>

        <div className="mt-8 flex gap-3">

          <button
            onClick={() => onEdit(item)}
            className="rounded-lg bg-white px-5 py-2 text-black transition hover:opacity-80"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(item.id)}
            className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}