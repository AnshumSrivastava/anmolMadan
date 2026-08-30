"use client";

import { useEffect, useState } from "react";
import ProjectImageGallery, { type GalleryImage } from "./ProjectImageGallery";
import { saveProjectAction } from "@/actions/projects";

export type ImageSource = "upload" | "link" | "none";

export type ProjectTestimonialForm = {
  quote: string;
  author_name: string;
  author_role: string;
};

export type ProjectFormData = {
  id?: string;
  title: string;
  description: string;
  institution_name: string;
  institution_logo_url: string;
  institution_logo_source: ImageSource;
  institution_logo_file: File | null;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  duration: string;
  sort_order: number;
  testimonials: ProjectTestimonialForm[];
  gallery: GalleryImage[];
};

type Props = {
  initialData?: Partial<ProjectFormData>;
  onSubmit?: (data: ProjectFormData) => void | Promise<void>;
  onSaved?: (project: unknown) => void | Promise<void>;
  submitting?: boolean;
};

const emptyData: ProjectFormData = {
  title: "",
  description: "",
  institution_name: "",
  institution_logo_url: "",
  institution_logo_source: "none",
  institution_logo_file: null,
  start_date: "",
  start_time: "",
  end_date: "",
  end_time: "",
  duration: "",
  sort_order: 0,
  testimonials: [],
  gallery: [],
};

function normalizeGallery(value: unknown): GalleryImage[] {
  if (!Array.isArray(value)) return [];

  const items: GalleryImage[] = [];

  for (const item of value) {
    if (typeof item === "string" && item.trim()) {
      items.push({ source: "link", url: item, file: null });
    } else if (item && typeof item === "object") {
      const x = item as Partial<GalleryImage>;
      if (x.source === "upload" && x.file instanceof File) {
        items.push({ source: "upload", url: x.url ?? "", file: x.file });
      } else if (typeof x.url === "string" && x.url.trim()) {
        items.push({ source: "link", url: x.url, file: null });
      }
    }
  }

  return items;
}

function parseDurationPart(value: string) {
  const parsed = new Date(value.trim());
  if (Number.isNaN(parsed.getTime())) {
    return { date: "", time: "" };
  }

  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    date: `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}`,
    time: `${pad(parsed.getHours())}:${pad(parsed.getMinutes())}`,
  };
}

export function formDataFromProject(project: {
  id: string;
  lesson_title: string;
  description: string;
  institution_name: string;
  institution_logo_url?: string | null;
  duration?: string | null;
  sort_order?: number | null;
  images?: Array<{ image_url: string; sort_order?: number | null }>;
  testimonials?: Array<{
    quote: string;
    author_name?: string | null;
    author_role?: string | null;
  }>;
}): ProjectFormData {
  const durationParts = String(project.duration ?? "")
    .split(/\s+[–-]\s+/)
    .map((x) => x.trim())
    .filter(Boolean);

  const from = parseDurationPart(durationParts[0] ?? "");
  const to = parseDurationPart(durationParts[1] ?? "");

  return {
    ...emptyData,
    id: project.id,
    title: project.lesson_title ?? "",
    description: project.description ?? "",
    institution_name: project.institution_name ?? "",
    institution_logo_url: project.institution_logo_url ?? "",
    institution_logo_source: project.institution_logo_url ? "link" : "none",
    start_date: from.date,
    start_time: from.time,
    end_date: to.date,
    end_time: to.time,
    duration: project.duration ?? "",
    sort_order: project.sort_order ?? 0,
    gallery: [...(project.images ?? [])]
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map((image) => ({
        source: "link" as const,
        url: image.image_url,
        file: null,
      })),
    testimonials: (project.testimonials ?? []).map((item) => ({
      quote: item.quote ?? "",
      author_name: item.author_name ?? "",
      author_role: item.author_role ?? "",
    })),
  };
}

function formatDateTime(date: string, time: string) {
  if (!date) return "";
  const value = new Date(`${date}T${time || "00:00"}`);
  if (Number.isNaN(value.getTime())) return date;

  const datePart = value.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  if (!time) return datePart;

  const timePart = value.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart}, ${timePart}`;
}

function buildDuration(startDate: string, startTime: string, endDate: string, endTime: string) {
  const from = formatDateTime(startDate, startTime);
  const to = formatDateTime(endDate, endTime);
  if (!from && !to) return "";
  if (from && !to) return from;
  if (!from && to) return to;
  return `${from} – ${to}`;
}

function SourceSelector({
  value,
  onChange,
}: {
  value: ImageSource;
  onChange: (value: ImageSource) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {(["upload", "link", "none"] as const).map((source) => (
        <button
          key={source}
          type="button"
          onClick={() => onChange(source)}
          className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
            value === source
              ? "border-white bg-white text-black"
              : "border-zinc-700 bg-zinc-950 text-zinc-400 hover:border-zinc-500 hover:text-white"
          }`}
        >
          {source === "upload" ? "Upload" : source === "link" ? "Image Link" : "None"}
        </button>
      ))}
    </div>
  );
}

function UploadBox({
  file,
  existingUrl,
  onChange,
}: {
  file: File | null;
  existingUrl?: string;
  onChange: (file: File | null) => void;
}) {
  const [dragging, setDragging] = useState(false);

  const handleFile = (selected: File | null) => {
    if (!selected) return;
    if (!selected.type.startsWith("image/")) {
      window.alert("Please select an image file.");
      return;
    }
    onChange(selected);
  };

  return (
    <div className="space-y-3">
      {existingUrl && !file && (
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
          <img src={existingUrl} alt="Current institution logo" className="h-32 w-full object-contain p-5" />
          <div className="border-t border-zinc-800 px-4 py-2 text-xs text-zinc-500">
            Current logo — choose a file below to replace it.
          </div>
        </div>
      )}

      <label
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0] ?? null); }}
        className={`flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 text-center transition ${
          dragging ? "border-white bg-zinc-800" : "border-zinc-700 bg-zinc-950 hover:border-zinc-500"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
        {file ? (
          <>
            <div className="mb-2 max-w-full truncate text-sm font-medium text-white">{file.name}</div>
            <div className="text-xs text-zinc-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
            <div className="mt-4 rounded-lg bg-zinc-800 px-4 py-2 text-xs text-zinc-300">Click to replace</div>
          </>
        ) : (
          <>
            <div className="mb-3 text-3xl">↑</div>
            <div className="text-sm font-medium text-white">Drag & drop an image here</div>
            <div className="mt-1 text-xs text-zinc-500">or click to browse</div>
            <div className="mt-4 text-[11px] uppercase tracking-wider text-zinc-600">JPG · PNG · WEBP · GIF</div>
          </>
        )}
      </label>

      {file && (
        <button type="button" onClick={() => onChange(null)} className="text-xs text-red-400 hover:text-red-300">
          Remove selected image
        </button>
      )}
    </div>
  );
}

export default function ProjectForm({ initialData, onSubmit, onSaved, submitting = false }: Props) {
  const [formData, setFormData] = useState<ProjectFormData>(() => ({
    ...emptyData,
    ...initialData,
    institution_logo_source:
      initialData?.institution_logo_source ??
      (initialData?.institution_logo_url ? "link" : "none"),
    institution_logo_file: null,
    gallery: normalizeGallery(initialData?.gallery),
    testimonials: initialData?.testimonials ?? [],
  }));

  useEffect(() => {
    setFormData({
      ...emptyData,
      ...initialData,
      institution_logo_source:
        initialData?.institution_logo_source ??
        (initialData?.institution_logo_url ? "link" : "none"),
      institution_logo_file: null,
      gallery: normalizeGallery(initialData?.gallery),
      testimonials: initialData?.testimonials ?? [],
    });
  }, [initialData]);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isSubmitting = submitting || saving;

  const updateField = <K extends keyof ProjectFormData>(field: K, value: ProjectFormData[K]) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const handleLogoSourceChange = (source: ImageSource) => {
    setFormData((previous) => ({
      ...previous,
      institution_logo_source: source,
      institution_logo_file: source === "upload" ? previous.institution_logo_file : null,
      institution_logo_url: source === "link" ? previous.institution_logo_url : "",
    }));
  };

  const addTestimonial = () => {
    setFormData((previous) => ({
      ...previous,
      testimonials: [...previous.testimonials, { quote: "", author_name: "", author_role: "" }],
    }));
  };

  const updateTestimonial = (index: number, field: keyof ProjectTestimonialForm, value: string) => {
    setFormData((previous) => ({
      ...previous,
      testimonials: previous.testimonials.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeTestimonial = (index: number) => {
    setFormData((previous) => ({
      ...previous,
      testimonials: previous.testimonials.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    const start = formData.start_date
      ? new Date(`${formData.start_date}T${formData.start_time || "00:00"}`)
      : null;
    const end = formData.end_date
      ? new Date(`${formData.end_date}T${formData.end_time || "00:00"}`)
      : null;

    if (start && end && !Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime()) && end < start) {
      setError("End date/time cannot be before the start date/time.");
      return;
    }

    const duration = buildDuration(
      formData.start_date,
      formData.start_time,
      formData.end_date,
      formData.end_time
    );

    try {
      setSaving(true);

      if (onSubmit) {
        await onSubmit({ ...formData, duration });
        setMessage("Experience saved successfully.");
        return;
      }

      const payload = new FormData();
      if (formData.id) payload.append("id", formData.id);

      payload.append("lesson_title", formData.title.trim());
      payload.append("description", formData.description.trim());
      payload.append("institution_name", formData.institution_name.trim());
      payload.append("duration", duration);
      payload.append("sort_order", String(formData.sort_order));

      payload.append("institution_logo_source", formData.institution_logo_source);
      payload.append("institution_logo_url", formData.institution_logo_url.trim());
      if (formData.institution_logo_file) {
        payload.append("institution_logo_file", formData.institution_logo_file);
      }

      const galleryMeta = formData.gallery.map((image, index) => {
        if (image.source === "upload") {
          if (image.file) payload.append(`gallery_file_${index}`, image.file);
          return { source: "upload" as const };
        }
        if (image.source === "link") {
          return { source: "link" as const, url: image.url.trim() };
        }
        return { source: "none" as const };
      });

      payload.append("gallery", JSON.stringify(galleryMeta));
      payload.append("testimonials", JSON.stringify(formData.testimonials));

      const result = await saveProjectAction(payload);
      if (!result.success) {
        setError(result.message);
        return;
      }

      setMessage(result.message);
      if (result.project) {
        await onSaved?.(result.project);
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to save experience.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {formData.id && (
        <div className="flex items-center justify-between rounded-xl border border-amber-900/60 bg-amber-950/20 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-amber-200">Editing existing experience</p>
            <p className="text-xs text-amber-300/60">Saving will update this record.</p>
          </div>
          <span className="rounded-full border border-amber-800 px-3 py-1 text-[11px] text-amber-300">EDIT</span>
        </div>
      )}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">Experience Details</h2>
          <p className="mt-1 text-sm text-zinc-400">Add the main information for this experience.</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Lesson Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="e.g. Cybersecurity Awareness Workshop"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Description</label>
            <textarea
              rows={5}
              required
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Describe the lesson or experience..."
              className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Institution Name</label>
            <input
              type="text"
              required
              value={formData.institution_name}
              onChange={(e) => updateField("institution_name", e.target.value)}
              placeholder="e.g. Delhi Public School"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
            />
          </div>

          <div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-zinc-300">Experience Duration</label>
              <p className="mt-1 text-xs text-zinc-500">Choose the exact start and end date and time.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                ["From", "start_date", "start_time"],
                ["To", "end_date", "end_time"],
              ].map(([label, dateField, timeField]) => (
                <div key={label} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs text-zinc-500">Date</label>
                      <input
                        type="date"
                        required
                        value={formData[dateField as "start_date" | "end_date"]}
                        onChange={(e) => updateField(dateField as "start_date" | "end_date", e.target.value)}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-white outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs text-zinc-500">Time</label>
                      <input
                        type="time"
                        required
                        value={formData[timeField as "start_time" | "end_time"]}
                        onChange={(e) => updateField(timeField as "start_time" | "end_time", e.target.value)}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-white outline-none focus:border-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {(formData.start_date || formData.end_date) && (
              <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-zinc-600">Displayed duration</p>
                <p className="mt-1 text-sm text-zinc-300">
                  {buildDuration(formData.start_date, formData.start_time, formData.end_date, formData.end_time) || "Select the dates and times"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white">Institution Branding</h2>
          <p className="mt-1 text-sm text-zinc-400">The old Main Experience Image field has been removed. Use the gallery for experience photos.</p>
        </div>

        <label className="block text-sm font-medium text-zinc-300">Institution Logo</label>
        <p className="mt-1 text-xs text-zinc-500">Optional — choose Upload, Image Link, or None.</p>

        <div className="mt-3">
          <SourceSelector value={formData.institution_logo_source} onChange={handleLogoSourceChange} />
        </div>

        <div className="mt-4">
          {formData.institution_logo_source === "upload" && (
            <UploadBox
              file={formData.institution_logo_file}
              existingUrl={formData.institution_logo_url}
              onChange={(file) => updateField("institution_logo_file", file)}
            />
          )}

          {formData.institution_logo_source === "link" && (
            <input
              type="url"
              required
              value={formData.institution_logo_url}
              onChange={(e) => updateField("institution_logo_url", e.target.value)}
              placeholder="https://example.com/logo.png"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
            />
          )}

          {formData.institution_logo_source === "none" && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-4 text-sm text-zinc-500">
              No institution logo will be displayed.
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Testimonials</h2>
            <p className="mt-1 text-sm text-zinc-400">Existing testimonials are loaded when editing.</p>
          </div>
          <button type="button" onClick={addTestimonial} className="shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-200">
            + Add Testimonial
          </button>
        </div>

        {formData.testimonials.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-700 px-6 py-10 text-center">
            <p className="text-sm text-zinc-500">No testimonials yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {formData.testimonials.map((testimonial, index) => (
              <div key={`testimonial-${index}`} className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <p className="font-medium text-white">Testimonial {index + 1}</p>
                  <button type="button" onClick={() => removeTestimonial(index)} className="rounded-lg border border-red-900 px-3 py-2 text-xs text-red-400 hover:bg-red-950">
                    Remove
                  </button>
                </div>
                <textarea
                  rows={5}
                  required
                  value={testimonial.quote}
                  onChange={(e) => updateTestimonial(index, "quote", e.target.value)}
                  placeholder="What did the student or participant say?"
                  className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-white"
                />
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <input
                    value={testimonial.author_name}
                    onChange={(e) => updateTestimonial(index, "author_name", e.target.value)}
                    placeholder="Author name"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-white"
                  />
                  <input
                    value={testimonial.author_role}
                    onChange={(e) => updateTestimonial(index, "author_role", e.target.value)}
                    placeholder="Role"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-white"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ProjectImageGallery images={formData.gallery} onChange={(images) => updateField("gallery", images)} />

      {error && <div className="rounded-xl border border-red-900 bg-red-950/30 px-4 py-3 text-sm text-red-300">{error}</div>}
      {message && <div className="rounded-xl border border-emerald-900 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-300">{message}</div>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-white py-4 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : formData.id ? "Update Experience" : "Create Experience"}
      </button>
    </form>
  );
}
