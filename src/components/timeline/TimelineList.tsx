"use client";

import { deleteTimeline } from "@/actions/timeline";
import type { Timeline } from "@/types/timeline";

import TimelineCard from "./TimelineCard";

type Props = {
  timeline: Timeline[];
  onEdit: (item: Timeline) => void;
};

export default function TimelineList({
  timeline,
  onEdit,
}: Props) {

  async function handleDelete(id: string) {

    if (!confirm("Delete this timeline?")) return;

    await deleteTimeline(id);

    window.location.reload();

  }

  if (!timeline.length) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
        No Timeline Added Yet
      </div>
    );
  }

  return (
    <div className="grid gap-6">

      {timeline.map((item) => (

        <TimelineCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={handleDelete}
        />

      ))}

    </div>
  );
}