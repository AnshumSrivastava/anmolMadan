import Reveal from "@/components/shared/Reveal";
import { getNote } from "@/services/note/note.service";
import { Quote } from "lucide-react";

import { Note as NoteType } from "@/types/note";

interface NoteProps {
  note?: NoteType | null;
}

export default async function Note({ note: initialNote }: NoteProps = {}) {
  const note = initialNote !== undefined ? initialNote : await getNote();

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
          <div className="group relative overflow-hidden rounded-tl-[32px] rounded-bl-[32px] rounded-br-[32px] rounded-tr-none sm:rounded-tl-[36px] sm:rounded-bl-[36px] sm:rounded-br-[36px] sm:rounded-tr-none border border-neutral-200/90 dark:border-neutral-800 bg-[#fbf9f5] dark:bg-[#111110] p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500">
            
            {/* Top-Right Smooth Paper Dog-Ear Fold */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 z-20 h-[68px] w-[68px] sm:h-[80px] sm:w-[80px]"
            >
              <svg
                viewBox="0 0 80 80"
                className="h-full w-full overflow-visible"
              >
                <defs>
                  {/* Fold paper gradient - light mode */}
                  <linearGradient id="noteFoldGradLight" x1="100%" y1="0%" x2="25%" y2="75%">
                    <stop offset="0%" stopColor="#ded5c4" />
                    <stop offset="35%" stopColor="#e9e1d2" />
                    <stop offset="100%" stopColor="#f7f2e8" />
                  </linearGradient>

                  {/* Fold paper gradient - dark mode */}
                  <linearGradient id="noteFoldGradDark" x1="100%" y1="0%" x2="25%" y2="75%">
                    <stop offset="0%" stopColor="#181816" />
                    <stop offset="40%" stopColor="#242421" />
                    <stop offset="100%" stopColor="#30302b" />
                  </linearGradient>

                  {/* Soft realistic cast shadow under the fold flap */}
                  <filter id="noteFoldShadowLight" x="-40%" y="-20%" width="170%" height="170%">
                    <feDropShadow
                      dx="-3"
                      dy="4"
                      stdDeviation="4.5"
                      floodColor="#000000"
                      floodOpacity="0.12"
                    />
                  </filter>
                  <filter id="noteFoldShadowDark" x="-40%" y="-20%" width="170%" height="170%">
                    <feDropShadow
                      dx="-4"
                      dy="5"
                      stdDeviation="5.5"
                      floodColor="#000000"
                      floodOpacity="0.75"
                    />
                  </filter>
                </defs>

                {/* 1. Missing paper corner cut (reveals section background behind card) */}
                <polygon
                  points="0,0 80,0 80,80"
                  className="fill-white dark:fill-black"
                />

                {/* Diagonal cut line border matching the card border */}
                <line
                  x1="0"
                  y1="0"
                  x2="80"
                  y2="80"
                  className="stroke-neutral-200/90 dark:stroke-neutral-800"
                  strokeWidth="1"
                />

                {/* 2. Folded paper flap with smooth rounded tip and realistic shadow */}
                <g className="transition-transform duration-300 ease-out group-hover:scale-[1.02] origin-top-right">
                  {/* Flap path: from (0,0) down along top edge of card to curved tip at (0,80), then across to (80,80) and closed */}
                  <path
                    d="M 0 0 L 0 70 Q 0 80 10 80 L 80 80 Z"
                    className="block dark:hidden fill-[url(#noteFoldGradLight)] stroke-black/5"
                    strokeWidth="0.5"
                    filter="url(#noteFoldShadowLight)"
                  />
                  <path
                    d="M 0 0 L 0 70 Q 0 80 10 80 L 80 80 Z"
                    className="hidden dark:block fill-[url(#noteFoldGradDark)] stroke-white/10"
                    strokeWidth="0.5"
                    filter="url(#noteFoldShadowDark)"
                  />

                  {/* Subtle paper crease catch-light line */}
                  <line
                    x1="0"
                    y1="0"
                    x2="80"
                    y2="80"
                    className="stroke-white/50 dark:stroke-white/10"
                    strokeWidth="0.75"
                  />
                </g>
              </svg>
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

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 shadow-sm mr-12 sm:mr-16">
                <Quote className="h-5 w-5 rotate-180" />
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl lg:text-5xl">
              {note.heading || "A Note From Me to You"}
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
