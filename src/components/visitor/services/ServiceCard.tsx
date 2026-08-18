import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { ServiceItem } from "@/types/service";

type Props = {
  item: ServiceItem;
  index: number;
};

export default function ServiceCard({
  item,
  index,
}: Props) {
  return (
    <article className="group relative overflow-hidden rounded-[32px] border border-zinc-200 bg-white p-10 transition-all duration-500 hover:-translate-y-2 hover:border-black">
      {/* Number & Badge */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold tracking-[0.35em] text-zinc-400">
          {String(index + 1).padStart(2, "0")}
        </span>

        {item.badge && (
          <span className="rounded-full border border-zinc-200 px-4 py-2 text-xs font-medium uppercase tracking-widest text-zinc-500 transition-colors duration-300 group-hover:border-black group-hover:text-black">
            {item.badge}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="mt-8 text-3xl font-semibold leading-tight tracking-tight text-black">
        {item.title}
      </h3>

      {/* Description */}
      <p className="mt-5 text-base leading-8 text-zinc-600">
        {item.description}
      </p>

      {/* Divider */}
      <div className="my-10 h-px bg-zinc-200" />

      {/* Points */}
      <div className="space-y-5">
        {[item.point_1, item.point_2, item.point_3]
          .filter(Boolean)
          .map((point, i) => (
            <div
              key={i}
              className="flex items-start gap-4"
            >
              <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-zinc-300 transition-colors duration-300 group-hover:border-black">
                <Check className="h-3.5 w-3.5 text-black" />
              </div>

              <p className="text-sm leading-7 text-zinc-700">
                {point}
              </p>
            </div>
          ))}
      </div>

      {/* CTA */}
      <Link
        href="#contact"
        className="mt-12 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-black"
      >
        {item.button_text}

        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
      </Link>
    </article>
  );
}