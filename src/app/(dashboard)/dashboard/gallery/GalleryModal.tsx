"use client";

import { Gallery } from "@/types/gallery";
import GalleryForm from "./GalleryForm";

type Props = {
  open: boolean;
  onClose: () => void;
  image: Gallery | null;
};

export default function GalleryModal({
  open,
  onClose,
  image,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-semibold text-white">
            {image ? "Edit Gallery Image" : "Add Gallery Image"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl leading-none text-zinc-400 transition hover:text-white"
          >
            ×
          </button>

        </div>

        {/* Form */}

        <GalleryForm
          image={image}
          onSuccess={onClose}
        />

      </div>
    </div>
  );
}