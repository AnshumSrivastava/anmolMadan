"use client";

import {
  ArrowRight,
  Check,
} from "lucide-react";

import {
  ServiceItem,
  ServiceSection,
} from "@/types/service";

type Props = {
  section: ServiceSection;
  items: ServiceItem[];
};

export default function ServicesPreview({
  section,
  items,
}: Props) {
  const activeItems = [...items]
    .filter((item) => item.is_active)
    .sort(
      (a, b) =>
        a.display_order - b.display_order
    );

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          {section.section_heading}
        </p>

        <h2 className="mt-3 text-2xl font-bold text-white">
          {section.main_heading}
        </h2>

        <p className="mt-4 text-sm leading-7 text-zinc-400">
          {section.description}
        </p>
      </div>

      <div className="space-y-6">
        {activeItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-widest text-zinc-500">
                {String(item.service_number).padStart(
                  2,
                  "0"
                )}
              </span>

              {item.badge && (
                <span className="rounded-full border border-zinc-700 px-3 py-1 text-[10px] uppercase tracking-widest text-zinc-300">
                  {item.badge}
                </span>
              )}
            </div>

            <h3 className="mt-4 text-lg font-semibold text-white">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              {item.description}
            </p>

            <div className="mt-5 space-y-3">
              {[item.point_1, item.point_2, item.point_3]
                .filter(Boolean)
                .map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <Check
                      size={16}
                      className="mt-1 text-white"
                    />

                    <span className="text-sm text-zinc-300">
                      {point}
                    </span>
                  </div>
                ))}
            </div>

            <button className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition hover:gap-3">
              {item.button_text}

              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}