"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import Reveal from "@/components/shared/Reveal";
import ServicesModal from "./ServicesModal";
import type { ServiceItem } from "@/types/service";

export default function CTA({ services = [] }: { services?: ServiceItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Reveal delay={0.3}>
        <div className="flex justify-center pt-8">
          <button
            onClick={() => setIsOpen(true)}
            className="group inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition-all duration-500 hover:-translate-y-1 hover:bg-zinc-900 hover:shadow-2xl"
          >
            <span>See What I Offer</span>

            <ArrowRight
            size={18}
            />
          </button>
        </div>
      </Reveal>

      <ServicesModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        services={services}
      />
    </>
  );
}