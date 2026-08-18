"use client";

import { Dispatch, SetStateAction } from "react";
import { Plus } from "lucide-react";

import { FAQItem } from "@/types/faq";

import FAQCard from "./FAQCard";

type Props = {
  faqs: FAQItem[];
  setFaqs: Dispatch<SetStateAction<FAQItem[]>>;
};

export default function FAQForm({
  faqs,
  setFaqs,
}: Props) {
  const addFAQ = () => {
    const newFAQ: FAQItem = {
      id: crypto.randomUUID(),
      question: "",
      answer: "",
      sort_order: faqs.length + 1,
      is_active: true,
    };

    setFaqs((prev) => [...prev, newFAQ]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            Frequently Asked Questions
          </h2>

          <p className="mt-2 text-neutral-500">
            Manage all FAQs displayed on your portfolio.
          </p>
        </div>

        <button
          onClick={addFAQ}
          className="
            flex
            items-center
            gap-2

            rounded-xl

            bg-black

            px-5
            py-3

            text-white

            transition

            hover:bg-neutral-800
          "
        >
          <Plus size={18} />

          Add FAQ
        </button>
      </div>

      {/* Cards */}

      <div className="space-y-6">
        {faqs.map((faq) => (
          <FAQCard
            key={faq.id}
            faq={faq}
          />
        ))}
      </div>
    </div>
  );
}