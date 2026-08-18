import { Timeline } from "@/types/timeline";

type Props = {
  item: Timeline;
};

export default function TimelineCard({ item }: Props) {
  return (
    <div
      className="
        pointer-events-none

        w-72

        rounded-3xl
        border
        border-black/10

        bg-white/90
        backdrop-blur-xl

        p-6

        shadow-xl
        shadow-black/5

        opacity-0
        translate-y-6
        scale-95

        transition-all
        duration-500
        ease-out

        group-hover:opacity-100
        group-hover:translate-y-0
        group-hover:scale-100
      "
    >
      <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
        {item.company}
      </p>

      <h3 className="mt-3 text-2xl font-bold text-black">
        {item.title}
      </h3>

      <p className="mt-5 leading-7 text-neutral-600">
        {item.description}
      </p>
    </div>
  );
}