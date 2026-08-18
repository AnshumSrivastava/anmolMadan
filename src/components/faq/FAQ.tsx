"use client";

import { useState } from "react";

import { FAQItem } from "@/types/faq";

import FAQForm from "./FAQForm";
import FAQPreview from "./FAQPreview";

type Props = {
  faqs: FAQItem[];
};

export default function FAQ({ faqs }: Props) {
  const [items, setItems] = useState(faqs);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
      <FAQForm
        faqs={items}
        setFaqs={setItems}
      />

      <FAQPreview faqs={items} />
    </div>
  );
}