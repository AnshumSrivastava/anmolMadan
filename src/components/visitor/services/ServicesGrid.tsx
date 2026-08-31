"use client";

import { useState } from "react";
import Reveal from "@/components/shared/Reveal";
import { ServiceItem } from "@/types/service";
import ServiceCard from "./ServiceCard";
import ContactModal from "@/components/visitor/layout/ContactModal";

type Props = {
  items: ServiceItem[];
};

export default function ServicesGrid({ items }: Props) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  if (items.length === 0) {
    return (
      <div className="flex min-h-[240px] items-center justify-center rounded-[28px] border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
        <p className="text-base text-neutral-500 dark:text-neutral-400">
          No services available.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.06}>
            <ServiceCard
              item={item}
              index={index}
              onSelectService={() => setIsContactOpen(true)}
            />
          </Reveal>
        ))}
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}