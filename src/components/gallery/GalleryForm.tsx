"use client";

import { useState, useTransition } from "react";

import {
  createGallery,
  updateGallery,
} from "@/actions/gallery";

import type { Gallery } from "@/types/gallery";

type Props = {
  gallery?: Gallery | null;
  onSuccess?: () => void;
  onCancel?: () => void;
};

/* =====================================================
   YOUTUBE URL VALIDATION
===================================================== */

function isYouTubeUrl(url: string) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();

    return (
      hostname === "youtube.com" ||
      hostname === "www.youtube.com" ||
      hostname === "youtu.be" ||
      hostname === "www.youtu.be"
    );
  } catch {
    return false;
  }
}

/* =====================================================
   FORM
===================================================== */

export default function GalleryForm({
  gallery,
  onSuccess,
  onCancel,
}: Props) {
  const [isPending, startTransition] =
    useTransition();

  const [video, setVideo] = useState(
    gallery?.video ?? ""
  );

  const [caption, setCaption] = useState(
    gallery?.caption ?? ""
  );

  const [sortOrder, setSortOrder] = useState(
    String(gallery?.sort_order ?? 0)
  );

  const [error, setError] = useState("");

  const isEditing = Boolean(gallery);

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const cleanVideo = video.trim();
    const cleanCaption = caption.trim();

    /* ---------------------------------------------
       VIDEO VALIDATION
    --------------------------------------------- */

    if (!cleanVideo) {
      setError(
        "Please enter a YouTube video URL."
      );

      return;
    }

    if (!isYouTubeUrl(cleanVideo)) {
      setError(
        "Please enter a valid YouTube URL."
      );

      return;
    }

    /* ---------------------------------------------
       SORT ORDER VALIDATION
    --------------------------------------------- */

    const parsedSortOrder =
      Number(sortOrder);

    if (
      !Number.isInteger(parsedSortOrder) ||
      parsedSortOrder < 0
    ) {
      setError(
        "Sort order must be a whole number greater than or equal to 0."
      );

      return;
    }

    /* ---------------------------------------------
       FORM DATA
    --------------------------------------------- */

    const formData = new FormData();

    if (gallery?.id) {
      formData.append(
        "id",
        gallery.id
      );
    }

    formData.append(
      "video",
      cleanVideo
    );

    formData.append(
      "caption",
      cleanCaption
    );

    formData.append(
      "sort_order",
      String(parsedSortOrder)
    );

    /* ---------------------------------------------
       SERVER ACTION
    --------------------------------------------- */

    startTransition(async () => {
      try {
        if (isEditing) {
          await updateGallery(formData);
        } else {
          await createGallery(formData);
        }

        onSuccess?.();
      } catch (err) {
        console.error(
          "Gallery form error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while saving the video."
        );
      }
    });
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* =================================================
          YOUTUBE URL
      ================================================= */}

      <div>
        <label
          htmlFor="gallery-video"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-black
          "
        >
          YouTube Video URL
        </label>

        <input
          id="gallery-video"
          type="url"
          value={video}
          onChange={(event) =>
            setVideo(event.target.value)
          }
          placeholder="https://www.youtube.com/watch?v=..."
          required
          disabled={isPending}
          className="
            w-full
            rounded-xl
            border
            border-neutral-200
            bg-white
            px-4
            py-3
            text-sm
            text-black
            outline-none
            transition

            placeholder:text-neutral-400

            focus:border-black
            focus:ring-1
            focus:ring-black
          "
        />

        <p
          className="
            mt-2
            text-xs
            leading-5
            text-neutral-400
          "
        >
          Paste the YouTube video link.
          The visitor gallery will handle
          the video playback automatically.
        </p>
      </div>

      {/* =================================================
          CAPTION
      ================================================= */}

      <div>
        <label
          htmlFor="gallery-caption"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-black
          "
        >
          Caption
        </label>

        <textarea
          id="gallery-caption"
          value={caption}
          onChange={(event) =>
            setCaption(event.target.value)
          }
          placeholder="Add a caption..."
          rows={4}
          disabled={isPending}
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-neutral-200
            bg-white
            px-4
            py-3
            text-sm
            leading-6
            text-black
            outline-none
            transition

            placeholder:text-neutral-400

            focus:border-black
            focus:ring-1
            focus:ring-black
          "
        />
      </div>

      {/* =================================================
          SORT ORDER
      ================================================= */}

      <div>
        <label
          htmlFor="gallery-sort-order"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-black
          "
        >
          Sort Order
        </label>

        <input
          id="gallery-sort-order"
          type="number"
          value={sortOrder}
          onChange={(event) =>
            setSortOrder(
              event.target.value
            )
          }
          min={0}
          step={1}
          disabled={isPending}
          className="
            w-full
            rounded-xl
            border
            border-neutral-200
            bg-white
            px-4
            py-3
            text-sm
            text-black
            outline-none
            transition

            focus:border-black
            focus:ring-1
            focus:ring-black
          "
        />

        <p
          className="
            mt-2
            text-xs
            text-neutral-400
          "
        >
          Lower numbers appear first.
        </p>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div
          role="alert"
          className="
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            leading-6
            text-red-600
          "
        >
          {error}
        </div>
      )}

      {/* =================================================
          ACTIONS
      ================================================= */}

      <div className="flex gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="
              flex-1
              rounded-xl
              border
              border-neutral-200
              bg-white
              px-5
              py-3
              text-sm
              font-medium
              text-black
              transition

              hover:bg-neutral-50

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={
            isPending ||
            !video.trim()
          }
          className="
            flex-1
            rounded-xl
            bg-black
            px-5
            py-3
            text-sm
            font-medium
            text-white
            transition

            hover:bg-neutral-800

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isPending
            ? isEditing
              ? "Updating..."
              : "Adding..."
            : isEditing
              ? "Update Video"
              : "Add Video"}
        </button>
      </div>
    </form>
  );
}