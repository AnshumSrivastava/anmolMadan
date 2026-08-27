"use client";

import { useState, useTransition } from "react";
import { Pencil, Plus, Trash2, ExternalLink } from "lucide-react";

import type { Gallery } from "@/types/gallery";
import { deleteGallery } from "@/actions/gallery";

import GalleryForm from "./GalleryForm";

type Props = {
  gallery: Gallery[];
};

export default function GalleryTable({
  gallery,
}: Props) {
  const [items, setItems] = useState(gallery);
  const [editing, setEditing] =
    useState<Gallery | null>(null);
  const [showForm, setShowForm] =
    useState(false);

  const [isPending, startTransition] =
    useTransition();

  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteGallery(id);

        setItems((current) =>
          current.filter(
            (item) => item.id !== id
          )
        );
      } catch (error) {
        console.error(
          "Failed to delete gallery video:",
          error
        );

        alert(
          error instanceof Error
            ? error.message
            : "Failed to delete video."
        );
      }
    });
  };

  /* =====================================================
     FORM SUCCESS
  ===================================================== */

  const handleSuccess = () => {
    setShowForm(false);
    setEditing(null);

    /*
     * Server revalidation handles the actual
     * page refresh/data consistency.
     *
     * Reload here so the table immediately
     * reflects the database.
     */
    window.location.reload();
  };

  /* =====================================================
     ADD
  ===================================================== */

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  /* =====================================================
     EDIT
  ===================================================== */

  const handleEdit = (item: Gallery) => {
    setEditing(item);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div>
          <h2
            className="
              text-xl
              font-semibold
              tracking-tight
              text-black
            "
          >
            Gallery Videos
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-neutral-500
            "
          >
            Manage the videos displayed in
            your visitor gallery.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-black
            px-5
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-neutral-800
          "
        >
          <Plus size={17} />

          Add Video
        </button>
      </div>

      {/* =================================================
          ADD / EDIT FORM
      ================================================= */}

      {showForm && (
        <div
          className="
            rounded-2xl
            border
            border-neutral-200
            bg-white
            p-6
            shadow-sm
          "
        >
          <div className="mb-6">
            <h3
              className="
                text-lg
                font-semibold
                text-black
              "
            >
              {editing
                ? "Edit Gallery Video"
                : "Add Gallery Video"}
            </h3>

            <p
              className="
                mt-1
                text-sm
                text-neutral-500
              "
            >
              {editing
                ? "Update the video details below."
                : "Add a YouTube video to your gallery."}
            </p>
          </div>

          <GalleryForm
            gallery={editing}
            onSuccess={handleSuccess}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        </div>
      )}

      {/* =================================================
          EMPTY STATE
      ================================================= */}

      {items.length === 0 ? (
        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-neutral-300
            bg-neutral-50
            px-6
            py-16
            text-center
          "
        >
          <p
            className="
              text-sm
              font-medium
              text-neutral-600
            "
          >
            No gallery videos yet.
          </p>

          <button
            type="button"
            onClick={handleAdd}
            className="
              mt-4
              text-sm
              font-medium
              text-black
              underline
              underline-offset-4
            "
          >
            Add your first video
          </button>
        </div>
      ) : (
        /* =================================================
           TABLE
        ================================================= */

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-neutral-200
            bg-white
          "
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr
                  className="
                    border-b
                    border-neutral-200
                    bg-neutral-50
                  "
                >
                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-neutral-400
                    "
                  >
                    Video
                  </th>

                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-neutral-400
                    "
                  >
                    Caption
                  </th>

                  <th
                    className="
                      px-6
                      py-4
                      text-center
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-neutral-400
                    "
                  >
                    Order
                  </th>

                  <th
                    className="
                      px-6
                      py-4
                      text-right
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-neutral-400
                    "
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {items
                  .slice()
                  .sort(
                    (a, b) =>
                      a.sort_order -
                      b.sort_order
                  )
                  .map((item) => (
                    <tr
                      key={item.id}
                      className="
                        border-b
                        border-neutral-100
                        last:border-b-0
                        transition-colors
                        hover:bg-neutral-50
                      "
                    >
                      {/* =================================
                          VIDEO
                      ================================= */}

                      <td className="px-6 py-5">
                        <div
                          className="
                            flex
                            max-w-[320px]
                            items-center
                            gap-3
                          "
                        >
                          <div
                            className="
                              flex
                              h-10
                              w-14
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              bg-neutral-100
                              text-xs
                              font-semibold
                              text-neutral-500
                            "
                          >
                            VIDEO
                          </div>

                          <a
                            href={item.video}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              flex
                              min-w-0
                              items-center
                              gap-1.5
                              text-sm
                              text-neutral-600
                              transition
                              hover:text-black
                            "
                            onClick={(event) =>
                              event.stopPropagation()
                            }
                          >
                            <span className="truncate">
                              {item.video}
                            </span>

                            <ExternalLink
                              size={14}
                              className="shrink-0"
                            />
                          </a>
                        </div>
                      </td>

                      {/* =================================
                          CAPTION
                      ================================= */}

                      <td className="px-6 py-5">
                        <p
                          className="
                            max-w-[280px]
                            truncate
                            text-sm
                            text-neutral-600
                          "
                        >
                          {item.caption ||
                            "No caption"}
                        </p>
                      </td>

                      {/* =================================
                          ORDER
                      ================================= */}

                      <td className="px-6 py-5 text-center">
                        <span
                          className="
                            inline-flex
                            h-8
                            min-w-8
                            items-center
                            justify-center
                            rounded-full
                            bg-neutral-100
                            px-2
                            text-xs
                            font-semibold
                            text-neutral-600
                          "
                        >
                          {item.sort_order}
                        </span>
                      </td>

                      {/* =================================
                          ACTIONS
                      ================================= */}

                      <td className="px-6 py-5">
                        <div
                          className="
                            flex
                            justify-end
                            gap-2
                          "
                        >
                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(item)
                            }
                            disabled={isPending}
                            aria-label="Edit video"
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-lg
                              border
                              border-neutral-200
                              text-neutral-600
                              transition
                              hover:border-black
                              hover:bg-black
                              hover:text-white
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                item.id
                              )
                            }
                            disabled={isPending}
                            aria-label="Delete video"
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-lg
                              border
                              border-neutral-200
                              text-neutral-500
                              transition
                              hover:border-red-500
                              hover:bg-red-500
                              hover:text-white
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}