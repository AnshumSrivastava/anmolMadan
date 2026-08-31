"use client";

import { ArrowRight, Check } from "lucide-react";
import { ServiceItem } from "@/types/service";

type Props = {
  item: ServiceItem;
  index: number;
  onSelectService?: (serviceName: string) => void;
};

export default function ServiceCard({
  item,
  index,
  onSelectService,
}: Props) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1.5 hover:border-black dark:hover:border-neutral-500 hover:shadow-xl">
      <div>
        {/* Number & Badge */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold tracking-widest text-neutral-400 dark:text-neutral-500">
            {String(index + 1).padStart(2, "0")}
          </span>

          {item.badge && (
            <span className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
              {item.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white">
          {item.title}
        </h3>

        {/* Description */}
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
          {item.description}
        </p>

        {/* Divider */}
        <div className="my-7 h-px bg-neutral-100 dark:bg-neutral-800" />

        {/* Points */}
        <div className="space-y-3.5">
          {[item.point_1, item.point_2, item.point_3]
            .filter(Boolean)
            .map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  <Check className="h-3 w-3" />
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-snug">
                  {point}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Action Button — Opens Contact Modal */}
      <button
        type="button"
        onClick={() => onSelectService?.(item.title)}
        className="mt-8 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-black dark:text-white transition-all group-hover:text-neutral-600 dark:group-hover:text-neutral-300"
      >
        <span>{item.button_text || "Request Session"}</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
      </button>
    </article>
  );
}