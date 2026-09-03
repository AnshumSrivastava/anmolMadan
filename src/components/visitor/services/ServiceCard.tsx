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
    <article
      className="
        group
        relative
        flex
        h-full
        min-h-[520px]
        flex-col
        justify-between
        overflow-hidden
        rounded-[28px]
        border
        border-neutral-200/90
        bg-white
        p-8
        transition-all
        duration-300
        hover:-translate-y-1.5
        hover:border-black
        hover:shadow-xl
        dark:border-neutral-800
        dark:bg-neutral-900/60
        dark:hover:border-neutral-500
        sm:p-10
      "
    >
      <div>
        {/* ==================================================
            NUMBER & BADGE
        ================================================== */}

        <div className="flex items-center justify-between">
          <span
            className="
              font-mono
              text-xs
              font-semibold
              tracking-widest
              text-neutral-400
              dark:text-neutral-500
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {item.badge && (
            <span
              className="
                rounded-full
                border
                border-neutral-200
                bg-neutral-50
                px-3.5
                py-1
                text-[11px]
                font-semibold
                uppercase
                tracking-wider
                text-neutral-600
                dark:border-neutral-800
                dark:bg-neutral-800
                dark:text-neutral-300
              "
            >
              {item.badge}
            </span>
          )}
        </div>

        {/* ==================================================
            TITLE
        ================================================== */}

        <h3
          className="
            mt-6
            min-h-[72px]
            text-2xl
            font-bold
            tracking-tight
            text-black
            dark:text-white
            sm:text-3xl
          "
        >
          {item.title}
        </h3>

        {/* ==================================================
            DESCRIPTION
        ================================================== */}

        <p
          className="
            mt-4
            min-h-[84px]
            text-sm
            leading-relaxed
            text-neutral-600
            dark:text-neutral-400
            sm:text-base
          "
        >
          {item.description}
        </p>

        {/* ==================================================
            DIVIDER
        ================================================== */}

        <div
          className="
            my-7
            h-px
            bg-neutral-100
            dark:bg-neutral-800
          "
        />

        {/* ==================================================
            POINTS
        ================================================== */}

        <div className="min-h-[120px] space-y-3.5">
          {[item.point_1, item.point_2, item.point_3]
            .filter(Boolean)
            .map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-3"
              >
                <div
                  className="
                    mt-0.5
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-neutral-100
                    text-neutral-800
                    dark:bg-neutral-800
                    dark:text-neutral-200
                  "
                >
                  <Check className="h-3 w-3" />
                </div>

                <p
                  className="
                    text-xs
                    leading-snug
                    text-neutral-700
                    dark:text-neutral-300
                    sm:text-sm
                  "
                >
                  {point}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* ==================================================
          ACTION BUTTON
      ================================================== */}

      <button
        type="button"
        onClick={() => onSelectService?.(item.title)}
        className="
          mt-8
          inline-flex
          items-center
          gap-2
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-black
          transition-all
          group-hover:text-neutral-600
          dark:text-white
          dark:group-hover:text-neutral-300
          sm:text-sm
        "
      >
        <span>
          {item.button_text || "Request Session"}
        </span>

        <ArrowRight
          className="
            h-4
            w-4
            transition-transform
            duration-300
            group-hover:translate-x-1.5
          "
        />
      </button>
    </article>
  );
}