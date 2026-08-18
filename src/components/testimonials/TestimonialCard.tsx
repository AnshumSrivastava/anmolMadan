"use client";

import { useEffect, useState } from "react";

import { Testimonial } from "@/types/testimonial";

type Props = {
  testimonial: Testimonial;
  onUpdate: (
    id: string,
    updates: Partial<Testimonial>
  ) => void;
  onDelete: (id: string) => void;
  disabled?: boolean;
};

export default function TestimonialCard({
  testimonial,
  onUpdate,
  onDelete,
  disabled = false,
}: Props) {
  const [form, setForm] = useState(testimonial);

  useEffect(() => {
    setForm(testimonial);
  }, [testimonial]);

  const handleChange = (
    field: keyof Testimonial,
    value: string | number | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(form.id, {
      client_name: form.client_name,
      designation: form.designation,
      company: form.company,
      message: form.message,
      sort_order: form.sort_order,
      is_active: form.is_active,
      photo: form.photo,
    });
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Client Name */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Client Name
          </label>

          <input
            value={form.client_name}
            onChange={(e) =>
              handleChange("client_name", e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

        {/* Company */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Company
          </label>

          <input
            value={form.company}
            onChange={(e) =>
              handleChange("company", e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

        {/* Designation */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Designation
          </label>

          <input
            value={form.designation}
            onChange={(e) =>
              handleChange("designation", e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

        {/* Sort Order */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Sort Order
          </label>

          <input
            type="number"
            value={form.sort_order}
            onChange={(e) =>
              handleChange(
                "sort_order",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>
      </div>

      {/* Message */}
      <div className="mt-6">
        <label className="mb-2 block text-sm text-zinc-400">
          Message
        </label>

        <textarea
          rows={5}
          value={form.message}
          onChange={(e) =>
            handleChange("message", e.target.value)
          }
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
        />
      </div>

      {/* Active */}
      <div className="mt-6">
        <label className="flex items-center gap-3 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) =>
              handleChange(
                "is_active",
                e.target.checked
              )
            }
          />

          Active
        </label>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex items-center justify-end gap-4">
        <button
          onClick={handleSave}
          disabled={disabled}
          className="rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50"
        >
          Save Changes
        </button>

        <button
          onClick={() => onDelete(form.id)}
          disabled={disabled}
          className="rounded-xl border border-red-500 px-6 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}