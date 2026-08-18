"use client";

import { useState } from "react";

import type { Timeline as TimelineType } from "@/types/timeline";

import TimelineForm from "./TimelineForm";
import TimelineList from "./TimelineList";

type Props = {
  timeline: TimelineType[];
};

export default function Timeline({ timeline }: Props) {
  const [selectedTimeline, setSelectedTimeline] =
    useState<TimelineType | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  function handleAdd() {
    setSelectedTimeline(null);
    setIsOpen(true);
  }

  function handleEdit(item: TimelineType) {
    setSelectedTimeline(item);
    setIsOpen(true);
  }

  function handleClose() {
    setSelectedTimeline(null);
    setIsOpen(false);
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Timeline
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage your timeline entries.
          </p>

        </div>

        <button
          onClick={handleAdd}
          className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
        >
          + Add Timeline
        </button>

      </div>

      {/* List */}

      <TimelineList
        timeline={timeline}
        onEdit={handleEdit}
      />

      {/* Modal */}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">

         <div
  className="
    mx-4
    w-full
    max-w-3xl
    max-h-[90vh]
    overflow-y-auto
    rounded-3xl
    border
    border-zinc-800
    bg-zinc-950
    p-5
    sm:p-8
  "
>
            <div className="mb-8 flex items-center justify-between">

              <h2 className="text-2xl font-bold">

                {selectedTimeline
                  ? "Edit Timeline"
                  : "Add Timeline"}

              </h2>

              <button
                onClick={handleClose}
                className="rounded-lg border border-zinc-700 px-4 py-2"
              >
                Close
              </button>

            </div>

            <TimelineForm
              timeline={selectedTimeline}
            />

          </div>

        </div>
      )}

    </div>
  );
}