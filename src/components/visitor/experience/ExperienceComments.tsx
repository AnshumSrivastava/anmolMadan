"use client";

import { useEffect, useState, useTransition } from "react";
import { MessageSquare, ThumbsUp, Heart, Send, CheckCircle2, ShieldCheck, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitProjectCommentAction, fetchApprovedCommentsAction } from "@/actions/projectComments";
import type { ProjectComment } from "@/types/projectComment";

type Props = {
  projectId: string;
};

export default function ExperienceComments({ projectId }: Props) {
  const [comments, setComments] = useState<ProjectComment[]>([]);
  const [likesCount, setLikesCount] = useState(24);
  const [hasLiked, setHasLiked] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [authorName, setAuthorName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    let isSubscribed = true;
    fetchApprovedCommentsAction(projectId).then((data) => {
      if (isSubscribed && data) {
        setComments(data);
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, [projectId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) {
      setStatusMessage({
        type: "error",
        text: "Please enter both your name and a comment.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("project_id", projectId);
    formData.append("author_name", authorName);
    formData.append("comment", commentText);

    startTransition(async () => {
      const res = await submitProjectCommentAction(formData);
      if (res.success) {
        setStatusMessage({
          type: "success",
          text: res.message,
        });
        setAuthorName("");
        setCommentText("");
      } else {
        setStatusMessage({
          type: "error",
          text: res.message,
        });
      }
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="mt-12 w-full border-t border-neutral-100 dark:border-neutral-800 pt-8">
      {/* SOCIAL ACTIONS BAR (Facebook style) */}
      <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4 text-xs text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
            <ThumbsUp size={10} />
          </span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white">
            <Heart size={10} />
          </span>
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            {likesCount} people found this insightful
          </span>
        </div>

        <div className="flex items-center gap-1">
          <MessageSquare size={14} />
          <span>{comments.length} comments</span>
        </div>
      </div>

      {/* LIKE / SHARE INTERACTIVE BUTTONS */}
      <div className="my-3 flex items-center justify-around border-b border-neutral-100 dark:border-neutral-800 py-1.5">
        <button
          type="button"
          onClick={() => {
            if (!hasLiked) {
              setLikesCount((prev) => prev + 1);
              setHasLiked(true);
            } else {
              setLikesCount((prev) => prev - 1);
              setHasLiked(false);
            }
          }}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
            hasLiked
              ? "bg-blue-50 text-blue-600"
              : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:bg-neutral-800"
          }`}
        >
          <ThumbsUp size={15} className={hasLiked ? "fill-blue-600" : ""} />
          <span>{hasLiked ? "Liked" : "Insightful"}</span>
        </button>

        <a
          href="#comment-box"
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 transition-all hover:bg-neutral-100 dark:bg-neutral-800"
        >
          <MessageSquare size={15} />
          <span>Comment</span>
        </a>
      </div>

      {/* COMMENT SUBMISSION FORM */}
      <div id="comment-box" className="mt-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
            <User size={14} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
            Leave a Comment
          </p>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-neutral-200 dark:bg-neutral-700/70 px-2 py-0.5 text-[9px] font-medium text-neutral-600 dark:text-neutral-400">
            <ShieldCheck size={10} />
            Moderated
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Honeypot field (hidden from real users) */}
          <input
            type="text"
            name="website_url"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <div>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Your name (e.g., Sarah Jenkins)"
              maxLength={80}
              required
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-3.5 py-2 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-black dark:border-white focus:outline-none"
            />
          </div>

          <div>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment or share your key takeaway from this session..."
              rows={3}
              maxLength={800}
              required
              className="w-full resize-none rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-3.5 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-black dark:border-white focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <p className="text-[10px] text-neutral-400">
              Comments go through review before appearing live.
            </p>
            <button
              type="submit"
              disabled={isPending || !authorName.trim() || !commentText.trim()}
              className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-neutral-800 disabled:opacity-50"
            >
              <Send size={12} />
              <span>{isPending ? "Posting..." : "Post Comment"}</span>
            </button>
          </div>
        </form>

        <AnimatePresence>
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-3 flex items-start gap-2 rounded-xl p-3 text-xs ${
                statusMessage.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-rose-50 text-rose-800 border border-rose-200"
              }`}
            >
              {statusMessage.type === "success" && (
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600" />
              )}
              <span>{statusMessage.text}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* APPROVED COMMENTS LIST */}
      <div className="mt-8 space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
          Community Discussions ({comments.length})
        </p>

        {comments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 py-6 text-center text-xs text-neutral-400">
            No public comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          comments.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/70 p-4 transition-colors hover:bg-neutral-50 dark:bg-neutral-900"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-600 text-xs font-bold text-white shadow-sm">
                {getInitials(item.author_name)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-black dark:text-white">
                    {item.author_name}
                  </h4>
                  <span className="text-[10px] text-neutral-400">
                    {new Date(item.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <p className="mt-1.5 whitespace-pre-line text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {item.comment}
                </p>

                <div className="mt-2.5 flex items-center gap-4 text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
                  <button
                    type="button"
                    className="hover:text-black dark:text-white hover:underline"
                    onClick={(e) => {
                      const btn = e.currentTarget;
                      btn.textContent = "Liked (1)";
                      btn.classList.add("text-blue-600", "font-semibold");
                    }}
                  >
                    Insightful
                  </button>
                  <span>·</span>
                  <span>Verified Participant</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
