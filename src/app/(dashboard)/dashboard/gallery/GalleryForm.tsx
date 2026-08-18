"use client";

import { useState, useTransition } from "react";

import { Gallery } from "@/types/gallery";
import { createGallery, updateGallery } from "@/actions/gallery";

type GalleryFormProps = {
  image: Gallery | null;
  onSuccess: () => void;
};

export default function GalleryForm({
  image,
  onSuccess,
}: GalleryFormProps) {
  const [pending, startTransition] = useTransition();

  const [preview, setPreview] = useState(image?.image ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (selected: File) => {
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = (formData: FormData) => {
    if (file) {
      formData.append("image", file);
    }

    if (image) {
      formData.append("id", image.id);
    }

    startTransition(async () => {
      if (image) {
        await updateGallery(formData);
      } else {
        await createGallery(formData);
      }

      onSuccess();
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Image Upload */}

      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Gallery Image
        </label>

        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);

            const selected = e.dataTransfer.files?.[0];

            if (!selected) return;

            handleFile(selected);
          }}
          className={`
            relative
            flex
            h-64
            w-full
            cursor-pointer
            items-center
            justify-center
            overflow-hidden
            rounded-xl
            border-2
            border-dashed
            transition-all
            duration-300
            ${
              dragging
                ? "border-white bg-zinc-800"
                : "border-zinc-700 bg-zinc-900 hover:border-white"
            }
          `}
        >
          {preview ? (
            <>
              <img
                src={preview}
                alt="Preview"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/25" />

              <div className="absolute bottom-4 left-4 rounded-md bg-black/70 px-3 py-1 text-xs text-white backdrop-blur">
                Click or Drop another image
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mb-4 h-12 w-12 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16V8m0 0l-3 3m3-3l3 3m7 5a2 2 0 002-2v-1a4 4 0 00-4-4h-1a5 5 0 10-9.584 1A3 3 0 005 16h2"
                />
              </svg>

              <p className="text-lg font-semibold text-white">
                Drag & Drop Image
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                or click to browse
              </p>

              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
                PNG • JPG • JPEG • WEBP
              </p>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const selected = e.target.files?.[0];

              if (!selected) return;

              handleFile(selected);
            }}
          />
        </label>
      </div>

      {/* Caption */}

      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Caption
        </label>

        <input
          name="caption"
          defaultValue={image?.caption ?? ""}
          placeholder="Enter image caption"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none transition focus:border-white"
        />
      </div>

      {/* Sort Order */}

      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Sort Order
        </label>

        <input
          name="sort_order"
          type="number"
          defaultValue={image?.sort_order ?? 0}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none transition focus:border-white"
        />
      </div>

      {/* Save */}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50"
        >
          {pending
            ? "Saving..."
            : image
            ? "Update Image"
            : "Save Image"}
        </button>
      </div>
    </form>
  );
}