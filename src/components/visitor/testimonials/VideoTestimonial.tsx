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

  // Cycle of 3 logic:
  // Slot 1: current active
  // Slot 2: next card
  // Slot 3: 3rd card (faded) — if count is 2, loops back to card 1 (active: 0 -> slot3: 0)
  const slot1Index = active % count;
  const slot2Index = count > 1 ? (active + 1) % count : 0;
  const slot3Index = count >= 3 ? (active + 2) % count : 0;

  const prev = () => {
    setIsPlaying(false);
    setActive((i) => (i - 1 + count) % count);
  };

  const next = () => {
    setIsPlaying(false);
    setActive((i) => (i + 1) % count);
  };

  const selectCard = (index: number) => {
    if (index === active) return;
    setIsPlaying(false);
    setActive(index);
  };

  const currentItem = validItems[slot1Index];
  const currentVideoId = extractYouTubeId(currentItem?.url || "");

  const handleShare = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const urlToShare = currentItem?.url || window.location.href;

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
              {String(slot1Index + 1).padStart(2, "0")} /{" "}
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
          PORTRAIT MODE: CYCLE OF 3 SHOWCASE
          [ 1: Active ]   [ 2: Next ]   [ 3: Faded Loop ]
      ================================================== */}
      <div className="relative mx-auto w-full py-2">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 items-center justify-items-center">
          {/* -----------------------------------------------
              CARD 1: MAIN / ACTIVE (Full prominence)
          ----------------------------------------------- */}
          <div className="w-full max-w-[320px] sm:max-w-[340px]">
            <div className="group relative aspect-[9/16] w-full overflow-hidden rounded-[24px] border border-neutral-200/90 dark:border-neutral-800 bg-neutral-950 shadow-[0_24px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.7)] ring-2 ring-black/10 dark:ring-white/20 transition-all duration-500">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`slot1-${slot1Index}-${isPlaying}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 h-full w-full"
                >
                  {isPlaying ? (
                    <iframe
                      src={getEmbedUrl(currentVideoId, true)}
                      title={currentItem?.caption || `Student Reaction #${slot1Index + 1}`}
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
                        src={getThumbnailUrl(currentVideoId)}
                        alt={currentItem?.caption || `Video Testimonial ${slot1Index + 1}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />

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
                      {currentItem?.caption && (
                        <div className="absolute bottom-16 left-4 right-4 text-left">
                          <p className="text-sm font-medium text-white line-clamp-2 drop-shadow-md">
                            {currentItem.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Top Badge: Active Status */}
              <div className="pointer-events-none absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-white shadow-md backdrop-blur-md text-[11px] font-medium tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span>Active 0{slot1Index + 1}</span>
              </div>

              {/* Bottom-left Pill */}
              <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3.5 py-1.5 text-white shadow-md backdrop-blur-md">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">
                  {slot1Index + 1}
                </div>
                <span className="text-xs font-medium tracking-wide">
                  Reaction #{slot1Index + 1}
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
              CARD 2: NEXT IN CYCLE
          ----------------------------------------------- */}
          <div
            onClick={() => selectCard(slot2Index)}
            className="w-full max-w-[280px] sm:max-w-[300px] cursor-pointer group"
          >
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[24px] border border-neutral-200/90 dark:border-neutral-800 bg-neutral-900 shadow-lg transition-all duration-500 group-hover:scale-[1.02] group-hover:border-black dark:group-hover:border-neutral-500 group-hover:shadow-2xl">
              {/* Thumbnail */}
              <img
                src={getThumbnailUrl(extractYouTubeId(validItems[slot2Index]?.url || ""))}
                alt={validItems[slot2Index]?.caption || `Reaction ${slot2Index + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30" />

              {/* Play Badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                </div>
              </div>

              {/* Top Pill */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-white text-[11px] font-medium backdrop-blur-md">
                <span>0{slot2Index + 1}</span>
                <span className="text-white/60">· Next</span>
              </div>

              {/* Bottom Caption / Label */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="flex items-center justify-between text-white">
                  <span className="text-xs font-semibold tracking-wide">
                    Reaction #{slot2Index + 1}
                  </span>
                  <span className="text-[10px] text-neutral-300 uppercase tracking-wider">
                    Click to Play
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------
              CARD 3: 3RD (FADED) — LOOPS BACK TO 1 IF NO 3
          ----------------------------------------------- */}
          <div
            onClick={() => selectCard(slot3Index)}
            className="w-full max-w-[260px] sm:max-w-[280px] cursor-pointer group hidden lg:block"
          >
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[24px] border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-900 opacity-45 transition-all duration-500 group-hover:opacity-75 group-hover:scale-[1.02]">
              {/* Thumbnail */}
              <img
                src={getThumbnailUrl(extractYouTubeId(validItems[slot3Index]?.url || ""))}
                alt={validItems[slot3Index]?.caption || `Reaction ${slot3Index + 1}`}
                className="h-full w-full object-cover filter blur-[0.5px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40" />

              {/* Center Loop / Play Icon */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-black shadow-md">
                  <Play size={14} fill="currentColor" className="ml-0.5" />
                </div>
                <span className="text-[11px] font-semibold text-white/80 tracking-wider uppercase">
                  {count < 3 ? "Loop 01" : `Reaction 0${slot3Index + 1}`}
                </span>
              </div>

              {/* Top Pill */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-white/80 text-[10px] font-medium backdrop-blur-md">
                <span>0{slot3Index + 1}</span>
                <span className="text-white/50">· Faded</span>
              </div>

              {/* Bottom Label */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-center">
                <p className="text-[11px] text-white/70">
                  {count < 3 ? "Cycle back to #1" : `Up next in cycle`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Indicator dots for cycle navigation */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {validItems.map((_, i) => (
            <button
              key={i}
              onClick={() => selectCard(i)}
              aria-label={`Go to video ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === slot1Index
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
                  const isCurrent = idx === slot1Index;

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        selectCard(idx);
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

                      {isCurrent && (
                        <div className="absolute bottom-2.5 left-2.5 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black">
                          Active
                        </div>
                      )}
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