"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Grid2X2,
  X,
  Play,
  Share2,
  Check,
  RotateCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import type { Gallery } from "@/types/gallery";

type VideoItem = {
  id?: string;
  url: string;
  caption?: string | null;
};

type Props = {
  videos?: string[];
  items?: Gallery[];
};

/* ============================================================
   HELPER: EXTRACT YOUTUBE ID
   Supports:
   - https://youtube.com/shorts/sEDtYVs0EZc?feature=share
   - https://www.youtube.com/watch?v=sEDtYVs0EZc
   - https://youtu.be/sEDtYVs0EZc
   - <iframe src="https://www.youtube.com/embed/sEDtYVs0EZc"></iframe>
============================================================ */

function extractYouTubeId(input: string): string {
  if (!input) return "";

  const trimmed = input.trim();
  const iframeMatch = trimmed.match(/src=["'](.*?)["']/);
  const target = iframeMatch && iframeMatch[1] ? iframeMatch[1] : trimmed;

  const match = target.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );

  if (match && match[1]) return match[1];

  return "";
}

function getEmbedUrl(videoId: string, autoplay = true): string {
  if (!videoId) return "";
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1${
    autoplay ? "&autoplay=1" : ""
  }`;
}

function getThumbnailUrl(videoId: string): string {
  if (!videoId) return "";
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export default function VideoTestimonial({ videos, items }: Props) {
  // Normalize items from either items array or raw string array
  const rawList: VideoItem[] =
    items && items.length > 0
      ? items.map((item) => ({
          id: item.id,
          url: item.video,
          caption: item.caption,
        }))
      : (videos || []).map((url, i) => ({
          id: `video-${i}`,
          url,
          caption: null,
        }));

  const validItems = rawList.filter((item) => Boolean(item.url));
  const count = validItems.length;

  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (count === 0) return null;

  // Infinite loop with middle one in focus:
  // Left: (active - 1 + count) % count
  // Center (FOCUS): active % count
  // Right: (active + 1) % count
  // If count is 2:
  // active 0 => Left: 1, Center: 0, Right: 1 (visible: 2 1 2)
  // active 1 => Left: 0, Center: 1, Right: 0 (visible: 1 2 1)
  // If count is 3:
  // active 0 => Left: 2, Center: 0, Right: 1 (visible: 3 1 2)
  // active 1 => Left: 0, Center: 1, Right: 2 (visible: 1 2 3)
  const centerIndex = ((active % count) + count) % count;
  const leftIndex = ((centerIndex - 1 + count) % count);
  const rightIndex = ((centerIndex + 1) % count);

  const prev = () => {
    setIsPlaying(false);
    setActive((i) => i - 1);
  };

  const next = () => {
    setIsPlaying(false);
    setActive((i) => i + 1);
  };

  const centerItem = validItems[centerIndex];
  const centerVideoId = extractYouTubeId(centerItem?.url || "");

  const leftItem = validItems[leftIndex];
  const leftVideoId = extractYouTubeId(leftItem?.url || "");

  const rightItem = validItems[rightIndex];
  const rightVideoId = extractYouTubeId(rightItem?.url || "");

  const handleShare = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const urlToShare = centerItem?.url || window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: "Anmol Madan — Student Reaction",
          url: urlToShare,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(urlToShare);
      setCopied(true);
      toast.success("Video link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full">
      {/* ==================================================
          TOP: SECTION HEADER & CONTROLS
      ================================================== */}
      <div className="flex flex-col justify-between gap-6 pb-12 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-neutral-400 dark:bg-neutral-600" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
              Live Reactions
            </p>
            <span className="h-px w-8 bg-neutral-400 dark:bg-neutral-600" />
          </div>

          {/* Heading */}
          <h3 className="mt-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl lg:text-[2.65rem] leading-[1.15]">
            Hear from the{" "}
            <span className="font-light italic text-neutral-700 dark:text-neutral-300">
              students.
            </span>
          </h3>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-xl">
            Real student reactions, genuine feedback, and live moments captured
            during interactive cybersecurity training sessions.
          </p>
        </div>

        {/* Action Buttons & Navigation */}
        <div className="flex items-center gap-3 sm:self-end">
          {/* Prev / Next controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous video"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 transition-all hover:border-black hover:bg-black hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black active:scale-95 shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="px-2 text-xs font-semibold tabular-nums tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">
              {String(centerIndex + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </span>

            <button
              onClick={next}
              aria-label="Next video"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 transition-all hover:border-black hover:bg-black hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black active:scale-95 shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* View All Modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-black dark:text-white transition-all hover:border-black hover:bg-black hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black active:scale-95 shadow-sm"
          >
            <Grid2X2 size={14} />
            <span className="hidden sm:inline">Archive</span>
          </button>
        </div>
      </div>

      {/* ==================================================
          PORTRAIT MODE: LOOP WITH MIDDLE IN FOCUS
          [ Left Card ]   [ Middle Card (IN FOCUS) ]   [ Right Card ]
      ================================================== */}
      <div className="relative mx-auto w-full py-4 overflow-hidden">
        <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          {/* -----------------------------------------------
              LEFT CARD (Previous in loop)
          ----------------------------------------------- */}
          <div
            onClick={prev}
            className="w-[200px] sm:w-[250px] lg:w-[280px] shrink-0 cursor-pointer group transition-all duration-500"
          >
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[22px] border border-neutral-200/90 dark:border-neutral-800 bg-neutral-900 shadow-md scale-[0.92] sm:scale-[0.94] opacity-50 group-hover:opacity-85 group-hover:scale-[0.96] transition-all duration-500">
              {/* Thumbnail */}
              <img
                src={getThumbnailUrl(leftVideoId)}
                alt={leftItem?.caption || `Reaction ${leftIndex + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

              {/* Play Badge on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
                  <Play size={16} fill="currentColor" className="ml-0.5" />
                </div>
              </div>

              {/* Reaction Number */}
              <div className="absolute bottom-3.5 left-3.5 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-white text-[11px] font-medium backdrop-blur-md">
                <span>#{leftIndex + 1}</span>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------
              MIDDLE CARD (IN FOCUS — Prominent & Interactive)
          ----------------------------------------------- */}
          <div className="w-[260px] sm:w-[320px] lg:w-[350px] shrink-0 z-10">
            <div className="group relative aspect-[9/16] w-full overflow-hidden rounded-[26px] border-2 border-black dark:border-white bg-neutral-950 shadow-[0_25px_60px_rgba(0,0,0,0.22)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8)] ring-4 ring-black/5 dark:ring-white/10 scale-100 transition-all duration-500">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`middle-${centerIndex}-${isPlaying}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 h-full w-full"
                >
                  {isPlaying ? (
                    <iframe
                      src={getEmbedUrl(centerVideoId, true)}
                      title={centerItem?.caption || `Student Reaction #${centerIndex + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-none"
                    />
                  ) : (
                    <div
                      onClick={() => setIsPlaying(true)}
                      className="relative h-full w-full cursor-pointer overflow-hidden bg-neutral-900"
                    >
                      {/* Video Thumbnail */}
                      <img
                        src={getThumbnailUrl(centerVideoId)}
                        alt={centerItem?.caption || `Video Testimonial ${centerIndex + 1}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-2xl transition-transform duration-300 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                        >
                          <Play size={24} fill="currentColor" className="ml-1" />
                        </motion.div>
                      </div>

                      {/* Caption text */}
                      {centerItem?.caption && (
                        <div className="absolute bottom-16 left-4 right-4 text-left">
                          <p className="text-sm font-medium text-white line-clamp-2 drop-shadow-md">
                            {centerItem.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Bottom-left Number Pill */}
              <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3.5 py-1.5 text-white shadow-md backdrop-blur-md">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">
                  {centerIndex + 1}
                </div>
                <span className="text-xs font-medium tracking-wide">
                  Reaction #{centerIndex + 1}
                </span>
              </div>

              {/* Bottom-right Controls */}
              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                {isPlaying && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlaying(false);
                    }}
                    title="Stop playback"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-md backdrop-blur-md transition-all hover:bg-black hover:scale-105 active:scale-95"
                  >
                    <RotateCw size={13} />
                  </button>
                )}
                <button
                  onClick={handleShare}
                  aria-label="Share video"
                  title="Share video"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-md backdrop-blur-md transition-all hover:bg-black hover:scale-105 active:scale-95"
                >
                  {copied ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <Share2 size={13} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------
              RIGHT CARD (Next in loop)
          ----------------------------------------------- */}
          <div
            onClick={next}
            className="w-[200px] sm:w-[250px] lg:w-[280px] shrink-0 cursor-pointer group transition-all duration-500"
          >
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[22px] border border-neutral-200/90 dark:border-neutral-800 bg-neutral-900 shadow-md scale-[0.92] sm:scale-[0.94] opacity-50 group-hover:opacity-85 group-hover:scale-[0.96] transition-all duration-500">
              {/* Thumbnail */}
              <img
                src={getThumbnailUrl(rightVideoId)}
                alt={rightItem?.caption || `Reaction ${rightIndex + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

              {/* Play Badge on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
                  <Play size={16} fill="currentColor" className="ml-0.5" />
                </div>
              </div>

              {/* Reaction Number */}
              <div className="absolute bottom-3.5 left-3.5 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-white text-[11px] font-medium backdrop-blur-md">
                <span>#{rightIndex + 1}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Indicator dots for cycle navigation */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {validItems.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsPlaying(false);
                setActive(i);
              }}
              aria-label={`Go to video ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === centerIndex
                  ? "w-8 bg-black dark:bg-white"
                  : "w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ==================================================
          ARCHIVE MODAL / ALL VIDEOS IN PORTRAIT GRID
      ================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-6"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 shadow-2xl sm:p-8"
            >
              {/* Modal Header */}
              <div className="mb-6 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-neutral-400 dark:text-neutral-500">
                    Video Showcase
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-black dark:text-white">
                    All Reactions ({count})
                  </h3>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-black dark:hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Portrait Grid in Modal */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {validItems.map((item, idx) => {
                  const vId = extractYouTubeId(item.url);
                  const isCurrent = idx === centerIndex;

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsPlaying(false);
                        setActive(idx);
                        setIsModalOpen(false);
                      }}
                      className={`group relative aspect-[9/16] overflow-hidden rounded-[16px] bg-neutral-900 shadow-sm ring-2 transition-all hover:scale-[1.02] ${
                        isCurrent
                          ? "ring-black dark:ring-white"
                          : "ring-transparent hover:ring-neutral-400"
                      }`}
                    >
                      <img
                        src={getThumbnailUrl(vId)}
                        alt={item.caption || `Video ${idx + 1}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-md">
                          <Play size={16} fill="currentColor" className="ml-0.5" />
                        </div>
                      </div>

                      <div className="absolute top-2.5 left-2.5 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white">
                        #{idx + 1}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}