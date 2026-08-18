"use client";

import { ChevronDown } from "lucide-react";

import { FAQItem } from "@/types/faq";

type Props = {
  faqs: FAQItem[];
};

export default function FAQPreview({ faqs }: Props) {
  const activeFaqs = faqs
    .filter((faq) => faq.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div
      className="
        sticky
        top-8

        rounded-2xl
        border
        border-neutral-200

        bg-white

        p-8

        shadow-sm
      "
    >
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
        Live Preview
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        Frequently Asked Questions
      </h2>

      <div className="mt-10 space-y-4">
        {activeFaqs.length === 0 && (
          <p className="text-neutral-500">
            No FAQs added yet.
          </p>
        )}

        {activeFaqs.map((faq) => (
          <div
            key={faq.id}
            className="
              rounded-2xl
              border
              border-neutral-200
              bg-white
              p-5
            "
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {faq.question || "Untitled Question"}
              </h3>

              <ChevronDown
                size={18}
                className="text-neutral-500"
              />
            </div>

            {faq.answer && (
              <p className="mt-4 text-sm leading-7 text-neutral-600">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}