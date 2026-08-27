"use client";

import { useState, type ReactNode } from "react";

export type GalleryImage = {
  source: "upload" | "link" | "none";
  url: string;
  file: File | null;
};

type Props = {
  images: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
};

function SourceButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
        active
          ? "border-white bg-white text-black"
          : "border-zinc-700 bg-zinc-950 text-zinc-400 hover:border-zinc-500 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

const emptyImage = (): GalleryImage => ({
  source: "upload",
  url: "",
  file: null,
});

export default function ProjectImageGallery({ images, onChange }: Props) {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const update = (index: number, patch: Partial<GalleryImage>) => {
    onChange(images.map((image, i) => (i === index ? { ...image, ...patch } : image)));
  };

  const addImage = () => onChange([...images, emptyImage()]);

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const moveImage = (index: number, direction: -1 | 1) => {
    const next = index + direction;
    if (next < 0 || next >= images.length) return;
    const copy = [...images];
    [copy[index], copy[next]] = [copy[next], copy[index]];
    onChange(copy);
  };

  const setSource = (index: number, source: GalleryImage["source"]) => {
    const current = images[index];
    update(index, {
      source,
      url: source === "link" ? current.url : "",
      file: source === "upload" ? current.file : null,
    });
  };

  const handleFile = (index: number, file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      window.alert("Please select an image file.");
      return;
    }

    update(index, {
      source: "upload",
      file,
      url: URL.createObjectURL(file),
    });
  };

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Experience Gallery</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Existing photos are loaded here when editing. Remove, replace, or reorder them.
          </p>
        </div>

        <button
          type="button"
          onClick={addImage}
          className="shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-200"
        >
          + Add Photo
        </button>
      </div>

      {images.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-700 px-6 py-12 text-center">
          <p className="text-sm text-zinc-500">No gallery photos yet.</p>
          <button type="button" onClick={addImage} className="mt-4 text-sm font-medium text-white underline underline-offset-4">
            Add your first photo
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {images.map((image, index) => (
            <div
              key={`gallery-${index}`}
              draggable
              onDragStart={() => setDraggingIndex(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (draggingIndex === null || draggingIndex === index) return;
                const copy = [...images];
                const [moved] = copy.splice(draggingIndex, 1);
                copy.splice(index, 0, moved);
                onChange(copy);
                setDraggingIndex(null);
              }}
              onDragEnd={() => setDraggingIndex(null)}
              className={`rounded-xl border bg-zinc-950 p-5 ${
                draggingIndex === index ? "border-white" : "border-zinc-800"
              }`}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-white">Photo {index + 1}</p>
                  <p className="mt-1 text-xs text-zinc-500">Drag the card to reorder</p>
                </div>

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="rounded-lg border border-red-900 px-3 py-2 text-xs text-red-400 hover:bg-red-950"
                >
                  Remove
                </button>
              </div>

              {image.url && (
                <div className="mb-4 overflow-hidden rounded-xl border border-zinc-800 bg-black">
                  <img src={image.url} alt={`Gallery photo ${index + 1}`} className="h-56 w-full object-contain" />
                </div>
              )}

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <SourceButton active={image.source === "upload"} onClick={() => setSource(index, "upload")}>
                  Upload / Replace
                </SourceButton>
                <SourceButton active={image.source === "link"} onClick={() => setSource(index, "link")}>
                  Image Link
                </SourceButton>
                <SourceButton active={image.source === "none"} onClick={() => setSource(index, "none")}>
                  None
                </SourceButton>
              </div>

              <div className="mt-4">
                {image.source === "upload" && (
                  <label
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault();
                      handleFile(index, event.dataTransfer.files?.[0] ?? null);
                    }}
                    className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-950 px-6 text-center hover:border-zinc-500"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => handleFile(index, event.target.files?.[0] ?? null)}
                    />

                    {image.file ? (
                      <>
                        <div className="mb-2 max-w-full truncate text-sm font-medium text-white">{image.file.name}</div>
                        <div className="text-xs text-zinc-500">{(image.file.size / 1024 / 1024).toFixed(2)} MB</div>
                        <div className="mt-4 rounded-lg bg-zinc-800 px-4 py-2 text-xs text-zinc-300">
                          Click to replace
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-3 text-3xl">↑</div>
                        <div className="text-sm font-medium text-white">Drag & drop an image here</div>
                        <div className="mt-1 text-xs text-zinc-500">or click to browse</div>
                      </>
                    )}
                  </label>
                )}

                {image.source === "link" && (
                  <input
                    type="url"
                    value={image.url}
                    onChange={(event) => update(index, { url: event.target.value })}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
                  />
                )}

                {image.source === "none" && (
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-4 text-sm text-zinc-500">
                    This gallery photo will be removed when you save.
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveImage(index, -1)}
                  className="rounded-lg border border-zinc-700 px-3 py-2 text-xs text-white disabled:opacity-30"
                >
                  ↑ Move up
                </button>
                <button
                  type="button"
                  disabled={index === images.length - 1}
                  onClick={() => moveImage(index, 1)}
                  className="rounded-lg border border-zinc-700 px-3 py-2 text-xs text-white disabled:opacity-30"
                >
                  ↓ Move down
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
