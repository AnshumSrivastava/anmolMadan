"use client";

import { useState, useTransition } from "react";
import {
  deleteMessage,
  updateMessageStatus,
} from "@/actions/contact";
import type {
  ContactMessage,
  MessageStatus,
} from "@/types/contact";

type Props = {
  messages: ContactMessage[];
};

export default function MessagesTable({
  messages,
}: Props) {
  const [selected, setSelected] =
    useState<ContactMessage | null>(null);

  const [pending, startTransition] =
    useTransition();

  if (!messages.length) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900 p-14 text-center">
        <h3 className="text-2xl font-semibold">
          No Messages Yet
        </h3>

        <p className="mt-3 text-zinc-400">
          Visitor messages will appear here once someone
          contacts you.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-3xl border border-zinc-800 bg-zinc-900">
        <table className="min-w-full">
          <thead className="sticky top-0 border-b border-zinc-800 bg-black">
            <tr className="text-left text-sm uppercase tracking-wider text-zinc-400">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Received</th>
              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {messages.map((message) => (
              <tr
                key={message.id}
                className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
              >
                <td className="px-6 py-5">
                  <div>
                    <p className="font-medium">
                      {message.full_name}
                    </p>

                    {message.organization && (
                      <p className="mt-1 text-sm text-zinc-500">
                        {message.organization}
                      </p>
                    )}
                  </div>
                </td>

                <td className="px-6 py-5">
                  {message.email}
                </td>

                <td className="px-6 py-5">
                  <select
                    disabled={pending}
                    defaultValue={message.status}
                    onChange={(e) =>
                      startTransition(async () => {
                        await updateMessageStatus(
                          message.id,
                          e.target
                            .value as MessageStatus
                        );
                      })
                    }
                    className="rounded-xl border border-zinc-700 bg-black px-3 py-2 outline-none focus:border-white"
                  >
                    <option value="New">
                      🟡 New
                    </option>

                    <option value="Contacted">
                      🔵 Contacted
                    </option>

                    <option value="Completed">
                      🟢 Completed
                    </option>
                  </select>
                </td>

                <td className="px-6 py-5 text-zinc-400">
                  {new Date(
                    message.created_at
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setSelected(message)
                      }
                      className="rounded-xl border border-zinc-700 px-4 py-2 text-sm transition hover:border-white hover:bg-white hover:text-black"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => {
                        if (
                          !confirm(
                            "Delete this message?"
                          )
                        )
                          return;

                        startTransition(async () => {
                          await deleteMessage(
                            message.id
                          );
                        });
                      }}
                      className="rounded-xl bg-red-600 px-4 py-2 text-sm transition hover:bg-red-700 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold">
                  {selected.full_name}
                </h2>

                <p className="mt-1 text-zinc-400">
                  Contact Message
                </p>
              </div>

              <button
                onClick={() =>
                  setSelected(null)
                }
                className="text-3xl text-zinc-500 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Info
                label="Organization"
                value={
                  selected.organization
                }
              />

              <Info
                label="Email"
                value={selected.email}
              />

              <Info
                label="Phone"
                value={selected.phone}
              />

              <Info
                label="Session Type"
                value={
                  selected.session_type
                }
              />

              <Info
                label="Preferred Date"
                value={
                  selected.preferred_date
                }
              />

              <Info
                label="Status"
                value={selected.status}
              />
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm uppercase tracking-wide text-zinc-400">
                Message
              </p>

              <div className="rounded-2xl border border-zinc-800 bg-black p-5 leading-7 whitespace-pre-wrap">
                {selected.message ||
                  "No message provided."}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() =>
                  setSelected(null)
                }
                className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

type InfoProps = {
  label: string;
  value: string | null;
};

function Info({
  label,
  value,
}: InfoProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black p-4">
      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="mt-2 break-words font-medium text-white">
        {value || "-"}
      </p>
    </div>
  );
}