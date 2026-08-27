"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { Upload, ImagePlus, X, CheckCircle2 } from "lucide-react";

import { uploadAboutImageAction } from "@/actions/about";

type Props = {
  aboutId: string;
  currentImageUrl?: string | null;
  onUploaded?: (imageUrl: string) => void;
};

export default function AboutImageUpload({
  aboutId,
  currentImageUrl,
  onUploaded,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(
    currentImageUrl || null
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isPending, startTransition] = useTransition();

  const [message, setMessage] = useState<string | null>(null);

  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setMessage("Only JPG, PNG, WebP or AVIF images are allowed.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("Image must be smaller than 10 MB.");
      return;
    }

    setMessage(null);

    setSelectedFile(file);

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setDragActive(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedFile(null);
    setPreview(currentImageUrl || null);
    setMessage(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setMessage("Please select an image first.");
      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);
    formData.append("aboutId", aboutId);

    if (currentImageUrl) {
      formData.append("oldImageUrl", currentImageUrl);
    }

    setMessage(null);

    startTransition(async () => {
      const result = await uploadAboutImageAction(formData);

      if (!result.success) {
        setMessage(result.message);
        return;
      }

      setMessage(result.message);

      setSelectedFile(null);

      if (result.imageUrl) {
        setPreview(result.imageUrl);
        onUploaded?.(result.imageUrl);
      }

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    });
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          About Image
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Upload or replace the image displayed on the right side
          of your About section.
        </p>
      </div>

      {/* Current / Preview Image */}

      <div className="mb-6">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
          {preview ? (
            <>
              <Image
                src={preview}
                alt="About preview"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />

              {/* Preview overlay */}

              {selectedFile && (
                <div className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                  New Image Preview
                </div>
              )}
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-zinc-500">
              <ImagePlus size={40} strokeWidth={1.5} />

              <p className="mt-3 text-sm">
                No About image uploaded
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Area */}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => {
          setDragActive(false);
        }}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          cursor-pointer
          rounded-xl
          border
          border-dashed
          p-8
          text-center
          transition
          
          ${
            dragActive
              ? "border-white bg-zinc-800"
              : "border-zinc-700 bg-zinc-950 hover:border-zinc-500 hover:bg-zinc-900"
          }
        `}
      >
        <Upload
          className="mx-auto text-zinc-400"
          size={30}
        />

        <p className="mt-4 text-sm font-medium text-white">
          {selectedFile
            ? selectedFile.name
            : "Click or drag an image here"}
        </p>

        <p className="mt-2 text-xs text-zinc-500">
          JPG, PNG, WebP or AVIF · Maximum 10 MB
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {/* Selected File Actions */}

      {selectedFile && (
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={handleUpload}
            disabled={isPending}
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
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
            {isPending ? (
              "Uploading..."
            ) : (
              <>
                <Upload size={17} />
                Upload Image
              </>
            )}
          </button>

          <button
            type="button"
            onClick={removeSelectedImage}
            disabled={isPending}
            className="
              flex
              items-center
              justify-center
              rounded-xl
              border
              border-zinc-700
              px-5
              text-zinc-300
              transition
              hover:bg-zinc-800
              disabled:opacity-50
            "
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Status */}

      {message && (
        <div
          className={`
            mt-4
            flex
            items-center
            gap-2
            rounded-xl
            border
            px-4
            py-3
            text-sm
            
            ${
              message.includes("successfully")
                ? "border-emerald-900 bg-emerald-950/40 text-emerald-400"
                : "border-red-900 bg-red-950/40 text-red-400"
            }
          `}
        >
          {message.includes("successfully") && (
            <CheckCircle2 size={17} />
          )}

          <span>{message}</span>
        </div>
      )}

      {/* Info */}

      <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
        <p className="text-xs leading-6 text-zinc-500">
          Uploading a new image automatically replaces the previous
          About image. The old image will also be removed from the
          <span className="mx-1 font-medium text-zinc-300">
            about
          </span>
          storage bucket.
        </p>
      </div>
    </div>
  );
}