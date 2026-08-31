"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Note } from "@/types/note";
import { updateNoteAction } from "@/actions/note";
import { Save, Loader2, Quote } from "lucide-react";

type Props = {
  note: Note;
};

export default function NoteForm({ note }: Props) {
  const [formData, setFormData] = useState<Note>(note);
  const [isPending, startTransition] = useTransition();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      is_visible: e.target.checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const result = await updateNoteAction(formData);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (err) {
        toast.error("An error occurred while saving the note.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      
      {/* Visibility Toggle Card */}
      <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <div>
          <h3 className="text-base font-semibold text-white">Section Visibility</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Toggle whether this personal note section appears on the live website.
          </p>
        </div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={formData.is_visible ?? true}
            onChange={handleToggle}
            className="peer sr-only"
          />
          <div className="peer h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-white peer-checked:after:translate-x-full peer-checked:after:bg-black peer-focus:outline-none" />
        </label>
      </div>

      {/* Main Content Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Quote className="h-5 w-5 text-zinc-400" /> Note Content
        </h3>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Section Eyebrow
            </label>
            <input
              type="text"
              name="eyebrow"
              value={formData.eyebrow ?? ""}
              onChange={handleChange}
              placeholder="e.g. Personal Philosophy"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Main Heading
            </label>
            <input
              type="text"
              name="heading"
              value={formData.heading ?? ""}
              onChange={handleChange}
              placeholder="e.g. A Note from Anmol"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Featured Callout Quote (Italic)
          </label>
          <textarea
            rows={2}
            name="quote"
            value={formData.quote ?? ""}
            onChange={handleChange}
            placeholder="e.g. Technology changes every day, but human curiosity and vigilance remain our greatest defense."
            className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Letter Body (Use double newline for new paragraphs)
          </label>
          <textarea
            rows={8}
            name="body"
            value={formData.body ?? ""}
            onChange={handleChange}
            placeholder="Write your personal letter or note..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm leading-relaxed text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none font-mono"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 pt-4 border-t border-zinc-800">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Author Name
            </label>
            <input
              type="text"
              name="author_name"
              value={formData.author_name ?? ""}
              onChange={handleChange}
              placeholder="e.g. Anmol Madan"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Author Title / Subtitle
            </label>
            <input
              type="text"
              name="author_title"
              value={formData.author_title ?? ""}
              onChange={handleChange}
              placeholder="e.g. Cybersecurity Specialist & Motivational Speaker"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
            />
          </div>
        </div>

      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Note
            </>
          )}
        </button>
      </div>

    </form>
  );
}
