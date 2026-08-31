"use client";

import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  GripVertical,
  Plus,
  Trash2,
  Save,
  Link as LinkIcon,
  ExternalLink,
  Check,
} from "lucide-react";
import type { ContactLink } from "@/types/contact";
import {
  createContactLink,
  updateContactLink,
  deleteContactLink,
  reorderContactLinks,
} from "@/actions/contact";
import {
  CONTACT_ICON_OPTIONS,
  renderContactIcon,
} from "@/components/shared/ContactIcons";

type Props = {
  initialLinks: ContactLink[];
};

export default function ContactLinksManager({ initialLinks }: Props) {
  const [links, setLinks] = useState<ContactLink[]>(initialLinks);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // New Link Form State
  const [isAdding, setIsAdding] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newIcon, setNewIcon] = useState("Mail");

  const [pending, startTransition] = useTransition();

  /* ========================================================
     DRAG & DROP REORDERING
  ======================================================== */
  function handleDragStart(index: number) {
    setDraggingIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    setDragOverIndex(index);
  }

  function handleDrop(targetIndex: number) {
    if (draggingIndex === null || draggingIndex === targetIndex) {
      setDraggingIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...links];
    const [moved] = updated.splice(draggingIndex, 1);
    updated.splice(targetIndex, 0, moved);

    // Reassign sort_order
    const withSort = updated.map((item, idx) => ({
      ...item,
      sort_order: idx + 1,
    }));

    setLinks(withSort);
    setDraggingIndex(null);
    setDragOverIndex(null);

    startTransition(async () => {
      try {
        await reorderContactLinks(
          withSort.map((l) => ({ id: l.id, sort_order: l.sort_order }))
        );
        toast.success("Order updated successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to update link order");
      }
    });
  }

  /* ========================================================
     CREATE NEW LINK
  ======================================================== */
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newLabel.trim() || !newUrl.trim()) {
      toast.error("Please provide both Label and URL");
      return;
    }

    startTransition(async () => {
      try {
        const created = await createContactLink({
          label: newLabel.trim(),
          url: newUrl.trim(),
          icon_name: newIcon,
        });

        setLinks((prev) => [...prev, created]);
        setNewLabel("");
        setNewUrl("");
        setNewIcon("Mail");
        setIsAdding(false);
        toast.success("Contact link added!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to add contact link");
      }
    });
  }

  /* ========================================================
     UPDATE EXISTING LINK
  ======================================================== */
  function handleFieldChange(
    id: string,
    field: keyof ContactLink,
    value: string
  ) {
    setLinks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }

  async function handleSaveItem(link: ContactLink) {
    startTransition(async () => {
      try {
        await updateContactLink(link.id, {
          label: link.label,
          url: link.url,
          icon_name: link.icon_name,
        });
        toast.success(`Saved "${link.label}"`);
      } catch (err) {
        console.error(err);
        toast.error("Failed to save link");
      }
    });
  }

  /* ========================================================
     DELETE LINK
  ======================================================== */
  async function handleDelete(id: string, label: string) {
    if (!confirm(`Are you sure you want to delete "${label}"?`)) return;

    startTransition(async () => {
      try {
        await deleteContactLink(id);
        setLinks((prev) => prev.filter((item) => item.id !== id));
        toast.success("Link deleted");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete link");
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Connect Links & Channels
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Fully customize your public links (Icon, Label, URL). Drag and drop rows to reorder.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 cursor-pointer"
        >
          <Plus size={16} />
          {isAdding ? "Cancel" : "Add Link"}
        </button>
      </div>

      {/* ADD NEW LINK FORM */}
      {isAdding && (
        <form
          onSubmit={handleCreate}
          className="rounded-3xl border border-zinc-700 bg-zinc-950 p-6 sm:p-8 space-y-6 transition-all"
        >
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Plus size={18} className="text-zinc-400" />
            Add New Channel / Link
          </h3>

          <div className="grid gap-5 md:grid-cols-3">
            {/* 1. Icon Selector */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Icon
              </label>
              <select
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-white cursor-pointer"
              >
                {CONTACT_ICON_OPTIONS.map((opt) => (
                  <option key={opt.name} value={opt.name}>
                    {opt.label} ({opt.name})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Label */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Label
              </label>
              <input
                type="text"
                placeholder='e.g. "Email", "LinkedIn", "WhatsApp"'
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-white"
              />
            </div>

            {/* 3. URL */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                URL / Target
              </label>
              <input
                type="text"
                placeholder='e.g. "mailto:...", "tel:...", "https://..."'
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="rounded-xl border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50 cursor-pointer"
            >
              <Check size={16} />
              Save Link
            </button>
          </div>
        </form>
      )}

      {/* CONTACT LINKS LIST (DRAGGABLE) */}
      <div className="space-y-3">
        {links.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/50 py-12 text-center">
            <LinkIcon size={32} className="text-zinc-600 mb-3" />
            <p className="text-zinc-400 font-medium">No contact links added yet.</p>
            <p className="text-xs text-zinc-500 mt-1">
              Click &quot;Add Link&quot; above to create your first connection option.
            </p>
          </div>
        ) : (
          links.map((link, index) => {
            const isDraggingThis = draggingIndex === index;
            const isOverThis = dragOverIndex === index;

            return (
              <div
                key={link.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                onDragEnd={() => {
                  setDraggingIndex(null);
                  setDragOverIndex(null);
                }}
                className={`
                  group
                  relative
                  flex
                  flex-col
                  lg:flex-row
                  lg:items-center
                  gap-4
                  rounded-2xl
                  border
                  p-4
                  sm:p-5
                  transition-all
                  duration-200
                  ${
                    isDraggingThis
                      ? "opacity-40 border-dashed border-white bg-zinc-900"
                      : isOverThis
                      ? "border-white bg-zinc-800/80 shadow-lg scale-[1.01]"
                      : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
                  }
                `}
              >
                {/* DRAG HANDLE & SORT NUMBER */}
                <div className="flex items-center gap-3 shrink-0 cursor-grab active:cursor-grabbing text-zinc-500 hover:text-white">
                  <GripVertical size={20} />
                  <span className="font-mono text-xs font-bold text-zinc-500">
                    #{index + 1}
                  </span>
                </div>

                {/* ICON SELECTOR & PREVIEW */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-black text-white shadow-sm">
                    {renderContactIcon(link.icon_name, { size: 20 })}
                  </div>

                  <select
                    value={link.icon_name}
                    onChange={(e) =>
                      handleFieldChange(link.id, "icon_name", e.target.value)
                    }
                    className="rounded-xl border border-zinc-700 bg-black px-3 py-2.5 text-xs font-medium text-white outline-none focus:border-white cursor-pointer"
                  >
                    {CONTACT_ICON_OPTIONS.map((opt) => (
                      <option key={opt.name} value={opt.name}>
                        {opt.label} ({opt.name})
                      </option>
                    ))}
                  </select>
                </div>

                {/* LABEL INPUT */}
                <div className="flex-1 min-w-[160px]">
                  <input
                    type="text"
                    value={link.label}
                    placeholder="Link Label"
                    onChange={(e) =>
                      handleFieldChange(link.id, "label", e.target.value)
                    }
                    className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-2.5 text-sm font-medium text-white placeholder:text-zinc-600 outline-none focus:border-white"
                  />
                </div>

                {/* URL INPUT */}
                <div className="flex-[1.5] min-w-[240px]">
                  <input
                    type="text"
                    value={link.url}
                    placeholder="URL (e.g. mailto:..., tel:..., https://...)"
                    onChange={(e) =>
                      handleFieldChange(link.id, "url", e.target.value)
                    }
                    className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-white font-mono text-xs"
                  />
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-2 shrink-0 justify-end">
                  {/* Test Link */}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    title="Open link"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-400 transition hover:border-zinc-600 hover:text-white"
                  >
                    <ExternalLink size={16} />
                  </a>

                  {/* Save Item */}
                  <button
                    type="button"
                    onClick={() => handleSaveItem(link)}
                    title="Save changes"
                    disabled={pending}
                    className="flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-xs font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50 cursor-pointer"
                  >
                    <Save size={14} />
                    Save
                  </button>

                  {/* Delete Item */}
                  <button
                    type="button"
                    onClick={() => handleDelete(link.id, link.label)}
                    title="Delete link"
                    disabled={pending}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-900/40 bg-red-950/20 text-red-400 transition hover:border-red-600 hover:bg-red-900/40 hover:text-white disabled:opacity-50 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
