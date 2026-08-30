"use client";

import { useEffect, useState, useTransition } from "react";
import { Check, X, Trash2, ShieldCheck, Clock, MessageSquare, AlertCircle } from "lucide-react";
import type { ProjectComment } from "@/types/projectComment";
import {
  approveCommentAction,
  rejectCommentAction,
  deleteCommentAction,
} from "@/actions/projectComments";

type Props = {
  initialComments: ProjectComment[];
};

export default function CommentsModerator({ initialComments }: Props) {
  const [comments, setComments] = useState<ProjectComment[]>(initialComments);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [isPending, startTransition] = useTransition();
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const filteredComments = comments.filter((c) => {
    if (filter === "all") return true;
    return c.status === filter;
  });

  const handleApprove = (id: string) => {
    startTransition(async () => {
      const res = await approveCommentAction(id);
      if (res.success) {
        setComments((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: "approved" as const } : c))
        );
        setActionMessage("Comment approved and published live.");
        setTimeout(() => setActionMessage(null), 3000);
      }
    });
  };

  const handleReject = (id: string) => {
    startTransition(async () => {
      const res = await rejectCommentAction(id);
      if (res.success) {
        setComments((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: "rejected" as const } : c))
        );
        setActionMessage("Comment rejected.");
        setTimeout(() => setActionMessage(null), 3000);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Permanently delete this comment?")) return;
    startTransition(async () => {
      const res = await deleteCommentAction(id);
      if (res.success) {
        setComments((prev) => prev.filter((c) => c.id !== id));
        setActionMessage("Comment deleted.");
        setTimeout(() => setActionMessage(null), 3000);
      }
    });
  };

  const pendingCount = comments.filter((c) => c.status === "pending").length;

  return (
    <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <MessageSquare className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-semibold text-zinc-100">
              Visitor Comments Moderation
            </h2>
            {pendingCount > 0 && (
              <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-300 border border-amber-500/30">
                {pendingCount} Pending Review
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-zinc-400">
            Review and approve Facebook-style comments submitted by attendees before they go live on the website.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 rounded-xl bg-zinc-950 p-1 border border-zinc-800">
          {(["pending", "approved", "rejected", "all"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${
                filter === tab
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {actionMessage && (
        <div className="mt-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-3 text-xs text-indigo-300">
          {actionMessage}
        </div>
      )}

      <div className="mt-6 space-y-3">
        {filteredComments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 py-8 text-center text-xs text-zinc-500">
            No {filter !== "all" ? filter : ""} comments found.
          </div>
        ) : (
          filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-col gap-3 rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-4 transition-all hover:border-zinc-700 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-200 text-sm">
                    {comment.author_name}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      comment.status === "approved"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : comment.status === "pending"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    {comment.status}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    {new Date(comment.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed">
                  "{comment.comment}"
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
                {comment.status !== "approved" && (
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleApprove(comment.id)}
                    className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-500 disabled:opacity-50"
                  >
                    <Check size={13} />
                    <span>Approve</span>
                  </button>
                )}

                {comment.status !== "rejected" && (
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleReject(comment.id)}
                    className="inline-flex items-center gap-1 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-all hover:bg-zinc-700 disabled:opacity-50"
                  >
                    <X size={13} />
                    <span>Reject</span>
                  </button>
                )}

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleDelete(comment.id)}
                  aria-label="Delete comment"
                  className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-rose-500/20 hover:text-rose-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
