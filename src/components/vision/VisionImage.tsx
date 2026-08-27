"use client";

import {
  useRef,
  useState,
  useTransition,
} from "react";

import { Vision } from "@/types/vision";
import { uploadVisionImageAction } from "@/actions/vision";

type Props = {
  data: Vision;
  onImageChange?: (
    imageUrl: string
  ) => void;
};

export default function VisionImage({
  data,
  onImageChange,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(
      data.image_url || null
    );

  const [isPending, startTransition] =
    useTransition();

  const [message, setMessage] =
    useState<string | null>(null);

  const [error, setError] =
    useState(false);

  /* =========================================================
     SELECT IMAGE
  ========================================================= */

  const handleSelectImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setMessage(null);
    setError(false);

    /* =======================================================
       FILE TYPE
    ======================================================= */

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setMessage(
        "Only JPG, PNG, WebP or AVIF images are allowed."
      );

      e.target.value = "";

      return;
    }

    /* =======================================================
       FILE SIZE
    ======================================================= */

    const MAX_SIZE =
      10 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      setMessage(
        "Image must be smaller than 10 MB."
      );

      e.target.value = "";

      return;
    }

    /* =======================================================
       LOCAL PREVIEW
    ======================================================= */

    const localUrl =
      URL.createObjectURL(file);

    setPreviewUrl(localUrl);

    /* =======================================================
       UPLOAD
    ======================================================= */

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    formData.append(
      "visionId",
      data.id
    );

    if (data.image_url) {
      formData.append(
        "oldImageUrl",
        data.image_url
      );
    }

    startTransition(async () => {
      const result =
        await uploadVisionImageAction(
          formData
        );

      /* =====================================================
         SUCCESS
      ===================================================== */

      if (result.success) {
        setMessage(
          "Vision image updated successfully."
        );

        if (result.imageUrl) {
          setPreviewUrl(
            result.imageUrl
          );

          onImageChange?.(
            result.imageUrl
          );
        }
      }

      /* =====================================================
         ERROR
      ===================================================== */

      else {
        setMessage(
          result.message
        );

        /*
         * Restore previous image if upload failed.
         */

        setPreviewUrl(
          data.image_url || null
        );
      }

      /*
       * Allow selecting the same file again.
       */

      if (inputRef.current) {
        inputRef.current.value =
          "";
      }
    });
  };

  /* =========================================================
     REMOVE / CLEAR IMAGE PREVIEW

     This only clears the browser preview.
     Actual storage deletion is handled by replacing
     the image through the server action.
  ========================================================= */

  const handleChooseAnother = () => {
    inputRef.current?.click();
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div
      className="
        rounded-2xl
        border
        border-zinc-800

        bg-zinc-900

        p-6
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Vision Image
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Upload or replace the image used in your
          Vision section.
        </p>
      </div>

      {/* =====================================================
          IMAGE PREVIEW
      ===================================================== */}

      <div
        className="
          relative

          aspect-[16/10]

          w-full

          overflow-hidden

          rounded-xl

          border
          border-zinc-800

          bg-zinc-950
        "
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Vision preview"
            className="
              h-full
              w-full

              object-cover
            "
            onError={() => {
              setError(true);
            }}
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full

              items-center
              justify-center

              text-sm

              text-zinc-500
            "
          >
            No Vision image uploaded
          </div>
        )}

        {/* ===================================================
            UPLOADING OVERLAY
        =================================================== */}

        {isPending && (
          <div
            className="
              absolute
              inset-0

              flex
              items-center
              justify-center

              bg-black/70

              backdrop-blur-sm
            "
          >
            <div className="text-center">
              <div
                className="
                  mx-auto
                  mb-3

                  h-8
                  w-8

                  animate-spin

                  rounded-full

                  border-2
                  border-zinc-600
                  border-t-white
                "
              />

              <p className="text-sm text-white">
                Uploading image...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================
          ERROR MESSAGE
      ===================================================== */}

      {error && (
        <p className="mt-3 text-sm text-red-400">
          The image could not be loaded.
        </p>
      )}

      {/* =====================================================
          FILE INPUT
      ===================================================== */}

      <input
        ref={inputRef}
        type="file"
        accept="
          image/jpeg,
          image/png,
          image/webp,
          image/avif
        "
        onChange={
          handleSelectImage
        }
        className="hidden"
      />

      {/* =====================================================
          CONTROLS
      ===================================================== */}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={
            handleChooseAnother
          }
          disabled={isPending}
          className="
            rounded-xl

            bg-white

            px-5
            py-3

            text-sm
            font-semibold

            text-black

            transition

            hover:bg-zinc-200

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {previewUrl
            ? "Replace Image"
            : "Upload Image"}
        </button>
      </div>

      {/* =====================================================
          MESSAGE
      ===================================================== */}

      {message && (
        <p
          className={`
            mt-3
            text-sm
            ${
              message.includes(
                "successfully"
              )
                ? "text-emerald-400"
                : "text-red-400"
            }
          `}
        >
          {message}
        </p>
      )}

      {/* =====================================================
          INFO
      ===================================================== */}

      <div
        className="
          mt-5

          space-y-1

          text-xs

          text-zinc-500
        "
      >
        <p>
          Supported formats: JPG, PNG,
          WebP, AVIF
        </p>

        <p>
          Maximum file size: 10 MB
        </p>
      </div>
    </div>
  );
}