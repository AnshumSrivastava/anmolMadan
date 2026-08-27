"use client";

import { useEffect } from "react";

import type { Gallery } from "@/types/gallery";

import GalleryForm from "./GalleryForm";

type Props = {
  gallery?: Gallery | null;
  open: boolean;
  onClose: () => void;
};

export default function GalleryModal({
  gallery,
  open,
  onClose,
}: Props) {
  /* =====================================================
     ESCAPE KEY
  ===================================================== */

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  /* =====================================================
     LOCK BODY SCROLL
  ===================================================== */

  useEffect(() => {
    if (!open) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);

  /* =====================================================
     DON'T RENDER
  ===================================================== */

  if (!open) return null;

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div
      className="
        fixed
        inset-0
        z-[200]
        flex
        items-center
        justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className="
          relative
          w-full
          max-w-xl
          max-h-[90vh]
          overflow-y-auto
          rounded-3xl
          bg-white
          p-7
          shadow-[0_30px_100px_rgba(0,0,0,0.25)]
          sm:p-9
        "
      >
        {/* =================================================
            CLOSE
        ================================================= */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="
            absolute
            right-5
            top-5
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-neutral-100
            text-lg
            text-neutral-600
            transition
            hover:bg-black
            hover:text-white
          "
        >
          ×
        </button>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-7 pr-10">
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-neutral-400
            "
          >
            Gallery
          </p>

          <h2
            className="
              mt-2
              text-2xl
              font-semibold
              tracking-tight
              text-black
            "
          >
            {gallery
              ? "Edit Video"
              : "Add Video"}
          </h2>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <GalleryForm
          gallery={gallery}
          onSuccess={onClose}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}