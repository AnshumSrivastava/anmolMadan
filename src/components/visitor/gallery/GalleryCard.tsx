"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

import type { Gallery } from "@/types/gallery";

interface GalleryCardProps {
  item: Gallery;
  isActive: boolean;
  onEnded?: () => void;
}

/* =========================================================
   YOUTUBE ID
========================================================= */

function getYouTubeId(url: string): string {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname
        .replace("/", "")
        .split("?")[0];
    }

    const watchId =
      parsed.searchParams.get("v");

    if (watchId) {
      return watchId;
    }

    if (parsed.pathname.includes("/embed/")) {
      return parsed.pathname
        .split("/embed/")[1]
        .split("/")[0]
        .split("?")[0];
    }

    if (parsed.pathname.includes("/shorts/")) {
      return parsed.pathname
        .split("/shorts/")[1]
        .split("/")[0]
        .split("?")[0];
    }

    return "";
  } catch {
    return "";
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function GalleryCard({
  item,
  isActive,
  onEnded,
}: GalleryCardProps) {
  const iframeRef =
    useRef<HTMLIFrameElement>(null);

  const videoId = useMemo(
    () => getYouTubeId(item.video),
    [item.video]
  );

  /* =======================================================
     YOUTUBE EVENTS
  ======================================================= */

  useEffect(() => {
    const handleMessage = (
      event: MessageEvent
    ) => {
      if (
        event.origin !==
          "https://www.youtube.com" &&
        event.origin !==
          "https://www.youtube-nocookie.com"
      ) {
        return;
      }

      if (!iframeRef.current) {
        return;
      }

      if (
        event.source !==
        iframeRef.current.contentWindow
      ) {
        return;
      }

      let data:
        | {
            event?: string;
            info?: number;
          }
        | null = null;

      try {
        data =
          typeof event.data === "string"
            ? JSON.parse(event.data)
            : event.data;
      } catch {
        return;
      }

      if (!data) {
        return;
      }

      /* YouTube 0 = ENDED */

      if (
        data.event === "onStateChange" &&
        data.info === 0 &&
        isActive
      ) {
        onEnded?.();
      }
    };

    window.addEventListener(
      "message",
      handleMessage
    );

    return () => {
      window.removeEventListener(
        "message",
        handleMessage
      );
    };
  }, [isActive, onEnded]);

  /* =======================================================
     INVALID URL
  ======================================================= */

  if (!videoId) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 80,
          scale: 0.96,
          filter: "blur(10px)",
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          gallery-card
          w-full
          flex-shrink-0
        "
      >
        <div
          className="
            flex
            h-[55vh]
            min-h-[340px]
            max-h-[700px]
            w-full
            items-center
            justify-center
            rounded-[28px]
            bg-neutral-100
            text-xs
            uppercase
            tracking-[0.3em]
            text-neutral-400
          "
        >
          Invalid YouTube URL
        </div>
      </motion.div>
    );
  }

  /* =======================================================
     YOUTUBE EMBED
========================================================= */

  const embedUrl =
    `https://www.youtube-nocookie.com/embed/${videoId}` +
    `?autoplay=${isActive ? 1 : 0}` +
    `&mute=1` +
    `&controls=1` +
    `&cc_load_policy=1` +
    `&cc_lang_pref=en` +
    `&rel=0` +
    `&playsinline=1` +
    `&iv_load_policy=3` +
    `&fs=0` +
    `&disablekb=0` +
    `&enablejsapi=1`;

  /* =======================================================
     CARD
  ======================================================= */

  return (
    <motion.div
      data-card
      layout
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.96,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: isActive ? 1 : 0.38,
        y: 0,
        scale: isActive ? 1 : 0.93,
        filter: isActive
          ? "blur(0px)"
          : "blur(1.5px)",
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        gallery-card
        w-full
        flex-shrink-0
      "
    >
      {/* ===================================================
          VIDEO
      =================================================== */}

      <div
        className={`
          relative
          h-[55vh]
          min-h-[340px]
          max-h-[700px]
          w-full
          overflow-hidden
          rounded-[28px]
          bg-black
          transition-shadow
          duration-700
          ease-out

          ${
            isActive
              ? "shadow-[0_35px_100px_rgba(0,0,0,0.16)]"
              : "shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
          }
        `}
      >
        {/* =================================================
            YOUTUBE
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(5px)",
          }}
          animate={{
            opacity: 1,
            scale: isActive ? 1 : 1.03,
            filter: isActive
              ? "blur(0px)"
              : "blur(1px)",
          }}
          transition={{
            opacity: {
              duration: 0.65,
              delay: 0.15,
            },
            scale: {
              duration: 1.1,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            },
            filter: {
              duration: 0.8,
            },
          }}
          className="
            absolute
            inset-0
          "
        >
          <iframe
            ref={iframeRef}
            key={`${item.id}-${isActive}`}
            src={embedUrl}
            title={
              item.caption ??
              "Video testimonial"
            }
            allow="
              autoplay;
              encrypted-media;
              picture-in-picture
            "
            loading={
              isActive
                ? "eager"
                : "lazy"
            }
            className="
              absolute
              inset-0
              h-full
              w-full
              border-0
            "
          />
        </motion.div>

        {/* =================================================
            REVEAL OVERLAY
        ================================================= */}

        <motion.div
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            bg-neutral-950
          "
        />

        {/* =================================================
            INACTIVE OVERLAY
        ================================================= */}

        {!isActive && (
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-10
              bg-white/35
            "
          />
        )}

        {/* =================================================
            ACTIVE BORDER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: isActive ? 1 : 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.25,
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            z-[5]
            rounded-[28px]
            ring-1
            ring-black/5
          "
        />
      </div>

      {/* ===================================================
          CAPTION
      =================================================== */}

      {item.caption && (
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
            filter: "blur(5px)",
          }}
          animate={{
            opacity: isActive ? 1 : 0.35,
            y: isActive ? 0 : 5,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.65,
            delay: isActive ? 0.2 : 0,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="
            mt-5
            text-center
            text-[10px]
            font-medium
            uppercase
            tracking-[0.32em]
            text-neutral-400
          "
        >
          {item.caption}
        </motion.div>
      )}
    </motion.div>
  );
}