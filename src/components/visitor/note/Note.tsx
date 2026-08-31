import Reveal from "@/components/shared/Reveal";
import { getNote } from "@/services/note/note.service";
import { Quote } from "lucide-react";

export default async function Note() {
  const note = await getNote();

  if (!note || note.is_visible === false) return null;

  const paragraphs = note.body
    ? note.body.split("\n\n").filter(Boolean)
    : [];

  return (
    <section
      id="note"
      className="relative overflow-hidden bg-white dark:bg-black py-20 lg:py-24 text-black dark:text-white"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          {/* Note Container with Real Paper Dog-Ear Fold Effect */}
          <div className="relative overflow-hidden rounded-[32px] sm:rounded-[36px] border border-neutral-200/90 dark:border-neutral-800 bg-[#fbf9f5] dark:bg-[#111110] p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500">
            
            {/* Top-Right Dog-Ear Fold */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 h-16 w-16 overflow-hidden z-20"
            >
              {/* Back flap */}
              <div className="absolute top-0 right-0 w-0 h-0 border-solid border-t-[48px] border-r-[48px] border-t-white dark:border-t-black border-r-transparent shadow-sm" />
              {/* Folded paper corner */}
              <div className="absolute top-0 right-0 w-0 h-0 border-solid border-b-[48px] border-l-[48px] border-b-[#ede8de] dark:border-b-[#222220] border-l-transparent shadow-[-4px_4px_10px_rgba(0,0,0,0.1)] dark:shadow-[-4px_4px_10px_rgba(0,0,0,0.7)]" />
            </div>

            {/* Soft ambient note accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-amber-500/[0.04] dark:bg-amber-400/[0.03] blur-[80px]"
            />

            {/* Eyebrow and Quote Icon */}
            <div className="flex items-center justify-between gap-4 border-b border-neutral-200/80 dark:border-neutral-800 pb-8">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-neutral-400 dark:bg-neutral-600" />
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500 dark:text-neutral-400">
                  {note.eyebrow || "Personal Philosophy"}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 shadow-sm mr-8 sm:mr-0">
                <Quote className="h-5 w-5 rotate-180" />
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl lg:text-5xl">
              {note.heading || "A Note from Anmol"}
            </h2>

            {/* Featured Quote Callout */}
            {note.quote && (
              <blockquote className="mt-8 rounded-2xl border-l-2 border-neutral-900 dark:border-neutral-100 bg-black/[0.02] dark:bg-white/[0.02] py-4 pl-6 pr-4 text-lg font-medium italic text-neutral-800 dark:text-neutral-200 sm:text-xl leading-relaxed">
                &ldquo;{note.quote}&rdquo;
              </blockquote>
            )}

            {/* Body Text */}
            <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Author Signature Line */}
            <div className="mt-12 flex items-center justify-between border-t border-neutral-200/80 dark:border-neutral-800 pt-8">
              <div>
                <h4 className="text-xl font-bold text-black dark:text-white tracking-tight">
                  {note.author_name || "Anmol Madan"}
                </h4>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mt-1">
                  {note.author_title || "Cybersecurity Specialist & Motivational Speaker"}
                </p>
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
