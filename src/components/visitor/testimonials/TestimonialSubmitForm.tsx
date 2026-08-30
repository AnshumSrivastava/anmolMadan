"use client";

import { useState, useTransition } from "react";
import { MessageSquarePlus, Send, CheckCircle2, ShieldCheck, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitPublicTestimonialAction } from "@/actions/testimonials";

export default function TestimonialSubmitForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setResult({
        type: "error",
        text: "Please provide your name and your testimonial message.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("client_name", name);
    formData.append("designation", designation);
    formData.append("company", company);
    formData.append("message", message);

    startTransition(async () => {
      const res = await submitPublicTestimonialAction(formData);
      if (res.success) {
        setResult({ type: "success", text: res.message });
        setName("");
        setDesignation("");
        setCompany("");
        setMessage("");
        setTimeout(() => {
          setIsOpen(false);
          setResult(null);
        }, 4500);
      } else {
        setResult({ type: "error", text: res.message });
      }
    });
  };

  return (
    <div className="mt-14 w-full">
      {!isOpen ? (
        <div className="flex flex-col items-center justify-center text-center">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative inline-flex items-center gap-2.5 rounded-full bg-black px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:bg-neutral-800 active:scale-[0.98]"
          >
            <MessageSquarePlus size={16} />
            <span>Share Your Experience / Endorsement</span>
            <Sparkles size={14} className="text-amber-400" />
          </button>
          <p className="mt-2.5 text-[11px] font-medium tracking-wide text-neutral-400">
            Attended a session or collaborated with Anmol? Submit your feedback.
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-xl sm:p-8"
        >
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                <MessageSquarePlus size={16} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-black">
                  Share Your Experience
                </h3>
                <p className="text-[11px] text-neutral-400">
                  Your feedback helps inspire future sessions and students.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setResult(null);
              }}
              aria-label="Close form"
              className="rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-black"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Honeypot field */}
            <input
              type="text"
              name="website_url"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Sarah Jenkins"
                  maxLength={80}
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
                  Designation / Role
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g., Head of IT / CS Student"
                  maxLength={100}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
                Company or Institution
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g., University / TechCorp Global"
                maxLength={100}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
                  Testimonial / Feedback *
                </label>
                <span className="text-[10px] text-neutral-400">
                  {message.length}/1000
                </span>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your thoughts on the session, workshop, or engagement with Anmol..."
                rows={4}
                maxLength={1000}
                required
                className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50/50 p-3.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Sanitized & Moderated prior to publication.</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full px-4 py-2 text-xs font-semibold text-neutral-500 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending || !name.trim() || !message.trim()}
                  className="inline-flex items-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-neutral-800 disabled:opacity-50"
                >
                  <Send size={13} />
                  <span>{isPending ? "Submitting..." : "Submit Review"}</span>
                </button>
              </div>
            </div>
          </form>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-4 flex items-start gap-2.5 rounded-2xl p-3.5 text-xs ${
                  result.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                {result.type === "success" && (
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                )}
                <span>{result.text}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
