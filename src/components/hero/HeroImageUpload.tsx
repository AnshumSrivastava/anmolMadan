"use client";

import { DragEvent } from "react";

type Props = {
  preview: string | null;
  setPreview: (value: string | null) => void;
  setImage: (file: File | null) => void;
};

export default function HeroImageUpload({
  preview,
  setPreview,
  setImage,
}: Props) {
  function handleImage(file: File) {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();

    if (e.dataTransfer.files.length > 0) {
      handleImage(e.dataTransfer.files[0]);
    }
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Hero Image
      </h2>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="relative flex h-80 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-800"
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Hero Preview"
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={() => {
                setImage(null);
                setPreview(null);
              }}
              className="absolute right-4 top-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Remove
            </button>

            <label className="absolute bottom-4 right-4 cursor-pointer rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-200">
              Replace

              <input
                hidden
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleImage(e.target.files[0]);
                  }
                }}
              />
            </label>
          </>
        ) : (
          <div className="flex flex-col items-center text-center">

            <svg
              className="mb-4 h-12 w-12 text-zinc-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="text-lg font-semibold text-white">
              Drag & Drop Image
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              PNG • JPG • WEBP
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              Recommended: 1200 × 1500
            </p>

            <label className="mt-6 cursor-pointer rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-300">
              Choose Image

              <input
                hidden
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleImage(e.target.files[0]);
                  }
                }}
              />
            </label>

          </div>
        )}
      </div>

    </div>
  );
}