"use client";

import type { ContactMessage } from "@/types/contact";

export default function MessageTable({
  messages,
}: {
  messages: ContactMessage[];
}) {
  if (!messages || messages.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center text-neutral-500">
        No contact messages received yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm text-neutral-600">
        <thead className="border-b border-neutral-200 bg-neutral-50 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Phone</th>
            <th className="px-6 py-4">Organization</th>
            <th className="px-6 py-4">Session</th>
            <th className="px-6 py-4">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">
          {messages.map((m) => (
            <tr key={m.id} className="hover:bg-neutral-50/60">
              <td className="px-6 py-4 font-medium text-black">{m.full_name}</td>
              <td className="px-6 py-4">{m.email}</td>
              <td className="px-6 py-4">{m.phone}</td>
              <td className="px-6 py-4">{m.organization || "—"}</td>
              <td className="px-6 py-4">{m.session_type || "—"}</td>
              <td className="px-6 py-4 text-xs text-neutral-400">
                {m.created_at ? new Date(m.created_at).toLocaleDateString() : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
