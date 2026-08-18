"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import {
  updateFAQAction,
  deleteFAQAction,
  createFAQAction,
} from "@/actions/faq";

import { FAQItem } from "@/types/faq";

type Props = {
  faq: FAQItem;
};

export default function FAQCard({ faq }: Props) {
  const [item, setItem] = useState(faq);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItem(faq);
  }, [faq]);

  const handleChange = (
    field: keyof FAQItem,
    value: string | number | boolean
  ) => {
    setItem((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  async function handleSave() {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("id", item.id);
      formData.append("question", item.question);
      formData.append("answer", item.answer);
      formData.append("sort_order", item.sort_order.toString());
      formData.append("is_active", item.is_active.toString());

      if (
        faq.question === "" &&
        faq.answer === ""
      ) {
        await createFAQAction(formData);
      } else {
        await updateFAQAction(formData);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this FAQ?")) return;

    await deleteFAQAction(item.id);
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="space-y-5">
        {/* Question */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Question
          </label>

          <input
            value={item.question}
            onChange={(e) =>
              handleChange("question", e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-neutral-300
              px-4
              py-3
              outline-none

              focus:border-black
            "
          />
        </div>

        {/* Answer */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Answer
          </label>

          <textarea
            rows={5}
            value={item.answer}
            onChange={(e) =>
              handleChange("answer", e.target.value)
            }
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-neutral-300
              px-4
              py-3
              outline-none

              focus:border-black
            "
          />
        </div>

        {/* Bottom */}

        <div className="flex flex-wrap items-center gap-5">
          <div>
            <label className="mb-2 block text-sm">
              Sort Order
            </label>

            <input
              type="number"
              value={item.sort_order}
              onChange={(e) =>
                handleChange(
                  "sort_order",
                  Number(e.target.value)
                )
              }
              className="
                w-24
                rounded-lg
                border
                border-neutral-300
                px-3
                py-2
              "
            />
          </div>

          <label className="mt-6 flex items-center gap-2">
            <input
              type="checkbox"
              checked={item.is_active}
              onChange={(e) =>
                handleChange(
                  "is_active",
                  e.target.checked
                )
              }
            />

            Active
          </label>

          <div className="ml-auto flex gap-3">
            <button
              onClick={handleSave}
              disabled={loading}
              className="
                rounded-xl
                bg-black
                px-5
                py-3
                text-white
                transition
                hover:bg-neutral-800
              "
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>

            <button
              onClick={handleDelete}
              className="
                rounded-xl
                border
                border-red-200
                p-3
                text-red-500
                transition
                hover:bg-red-50
              "
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}