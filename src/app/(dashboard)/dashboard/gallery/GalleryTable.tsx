"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus } from "lucide-react";

import { Gallery } from "@/types/gallery";
import GalleryModal from "./GalleryModal";

type Props = {
  images: Gallery[];
};

export default function GalleryTable({ images }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Gallery | null>(null);

  const handleAdd = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (image: Gallery) => {
    setSelected(image);
    setOpen(true);
  };

  return (
    <>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Gallery
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Manage gallery images.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            <Plus size={18} />
            Add Image
          </button>
        </div>

        {/* Table */}

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-zinc-800 text-left text-sm text-zinc-400">

                <th className="pb-4">Preview</th>

                <th className="pb-4">Caption</th>

                <th className="pb-4">Order</th>

                <th className="pb-4 text-right">Actions</th>

              </tr>

            </thead>

            <tbody>

              {images.map((image) => (

                <tr
                  key={image.id}
                  className="border-b border-zinc-800"
                >

                  {/* Preview */}

                  <td className="py-4">

                    <Image
                      src={image.image}
                      alt={image.caption ?? "Gallery Image"}
                      width={90}
                      height={70}
                      className="rounded-lg object-cover"
                    />

                  </td>

                  {/* Caption */}

                  <td className="py-4 text-white">
                    {image.caption || "-"}
                  </td>

                  {/* Order */}

                  <td className="py-4 text-zinc-300">
                    {image.sort_order}
                  </td>

                  {/* Actions */}

                  <td className="py-4">

                    <div className="flex justify-end gap-3">

                      <button
                        onClick={() => handleEdit(image)}
                        className="text-zinc-400 transition hover:text-white"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        className="text-red-400 transition hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <GalleryModal
        open={open}
        onClose={() => setOpen(false)}
        image={selected}
      />
    </>
  );
}