import Reveal from "@/components/shared/Reveal";

import { ServiceItem } from "@/types/service";

import ServiceCard from "./ServiceCard";

type Props = {
  items: ServiceItem[];
};

export default function ServicesGrid({
  items,
}: Props) {
  if (items.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-[32px] border border-dashed border-zinc-300 bg-zinc-50">
        <p className="text-lg text-zinc-500">
          No services available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {items.map((item, index) => (
        <Reveal
          key={item.id}
          delay={index * 0.08}
          className={
            index % 2 === 1
              ? "lg:translate-y-20"
              : ""
          }
        >
          <ServiceCard
            item={item}
            index={index}
          />
        </Reveal>
      ))}
    </div>
  );
}