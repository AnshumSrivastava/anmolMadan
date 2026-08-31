"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Grid2X2, X, Play, Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type Props = {
  videos: string[];
};

function getEmbedUrl(input: string): string {
  if (!input) return "";
  const trimmed = input.trim();
  if (trimmed.startsWith("<")) {
    const match = trimmed.match(/src=["'](.*?)["']/);
    if (match && match[1]) return match[1];
  }
  if (trimmed.includes("/embed/")) {
    return trimmed;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = trimmed.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube-nocookie.com/embed/${match[2]}?rel=0&modestbranding=1`;
  }
  return trimmed;
}

function VideoFrame({ src, title = "Video Testimonial" }: { src: string; title?: string }) {
  const embedUrl = getEmbedUrl(src);

  if (src?.trim().startsWith("<") && !src.includes("src=")) {
    return (
      <div
        className="absolute inset-0 h-full w-full [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-none"
        dangerouslySetInnerHTML={{ __html: src }}
      />
    );
  }

  return (
    <iframe
      src={embedUrl}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="absolute inset-0 h-full w-full border-none"
    />
  );
}

export default function VideoTestimonial({ videos }: Props) {
  const [active, setActive] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!videos || videos.length === 0) return null;

  const prev = () => setActive((i) => (i - 1 + videos.length) % videos.length);
  const next = () => setActive((i) => (i + 1) % videos.length);

  const handleShare = () => {
    const currentVideo = videos[active];
    if (navigator.share) {
      navigator.share({
        title: "Anmol Madan — Student Testimonial",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(currentVideo || window.location.href);
      setCopied(true);
      toast.success("Video link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-20">

        {/* ── LEFT: Landscape Video Embed (16:9) ── */}
        <div className="w-full lg:col-span-7">
          <div className="relative aspect-video w-full overflow-hidden rounded-[12px] border border-neutral-200/90 dark:border-neutral-800 bg-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 h-full w-full"
              >
                <VideoFrame src={videos[active]} title={`Student Testimonial ${active + 1}`} />
              </motion.div>
            </AnimatePresence>

            {/* Bottom-left Presenter Pill */}
            <div className="pointer-events-none absolute bottom-3.5 left-3.5 z-10 flex items-center gap-2.5 rounded-full bg-black/65 backdrop-blur-md px-3.5 py-1.5 border border-white/10 text-white shadow-md">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">
                {active + 1}
              </div>
              <span className="text-xs font-medium tracking-wide">
                Student Reaction #{active + 1}
              </span>
            </div>

            {/* Bottom-right Share Button */}
            <button
              onClick={handleShare}
              aria-label="Share video"
              className="absolute bottom-3.5 right-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/65 backdrop-blur-md text-white border border-white/10 shadow-md transition-all hover:bg-black/90 hover:scale-105 active:scale-95"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
            </button>
          </div>
        </div>

        {/* ── RIGHT: Text Column (Strict Left-Aligned) ── */}
        <div className="flex flex-col items-start text-left lg:col-span-5 my-auto">

          {/* 1. Live Reactions Eyebrow */}
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-6 bg-neutral-400 dark:bg-neutral-600" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
              Live Reactions
            </p>
          </div>

          {/* 2. Heading */}
          <h3 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold leading-[1.15] tracking-tight text-black dark:text-white">
            Hear from the
            <br />
            <span className="italic font-light">students.</span>
          </h3>

          {/* 3. Paragraph */}
          <p className="mt-5 max-w-md text-[15px] sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            Real reactions, live insights, and genuine feedback from students, professionals, and executives after attending a session.
          </p>

          {/* 4. Compact Pagination Controls */}
          {videos.length > 1 && (
            <div className="mt-8 flex items-center gap-3.5">
              <button
                onClick={prev}
                aria-label="Previous video"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 transition-all hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="text-xs font-semibold tabular-nums tracking-wider text-neutral-500 dark:text-neutral-400 px-1">
                {String(active + 1).padStart(2, "0")} / {String(videos.length).padStart(2, "0")}
              </span>

              <button
                onClick={next}
                aria-label="Next video"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 transition-all hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* 5. View All Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black dark:text-white transition-all hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black active:scale-95"
          >
            <Grid2X2 size={14} />
            View All {videos.length} Videos
          </button>

        </div>
      </div>

      {/* ── MODAL / GALLERY ── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="mb-6 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-neutral-400 dark:text-neutral-500">Archive</p>
                  <h3 className="mt-1 text-xl sm:text-2xl font-bold text-black dark:text-white">
                    Video Testimonials ({videos.length})
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-black dark:hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Landscape Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((video, idx) => (
                  <button
                    key={idx}
                    className={`group relative aspect-video overflow-hidden rounded-[10px] bg-neutral-900 shadow-sm transition-all hover:scale-[1.02] hover:shadow-lg ring-2 ring-transparent ${
                      idx === active ? "ring-black dark:ring-white" : ""
                    }`}
                    onClick={() => {
                      setActive(idx);
                      setIsModalOpen(false);
                    }}
                  >
                    <div className="pointer-events-none absolute inset-0 h-full w-full">
                      <VideoFrame src={video} title={`Video ${idx + 1}`} />
                    </div>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-black shadow-md">
                        <Play size={16} fill="currentColor" />
                      </div>
                    </div>
                    {idx === active && (
                      <div className="absolute bottom-2.5 left-2.5 rounded-full bg-black/80 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white">
                        Playing
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
