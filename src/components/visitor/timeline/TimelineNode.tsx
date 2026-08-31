import Image from "next/image";

import { Timeline } from "@/types/timeline";

type Props = {
  item: Timeline;
};

export default function TimelineNode({ item }: Props) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Image */}

      <div
        className="
          relative
          z-20

          h-28
          w-28

          overflow-hidden
          rounded-full

          border-4
          border-white

          bg-neutral-100 dark:bg-neutral-800

          shadow-lg
          shadow-black/10

          transition-all
          duration-500

          group-hover:scale-110
          group-hover:shadow-[0_0_40px_rgba(0,0,0,.18)]
          dark:group-hover:shadow-[0_0_40px_rgba(255,255,255,.18)]
        "
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="
              object-cover
              transition-all
              duration-500
              group-hover:scale-125
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-500 dark:text-neutral-400">
            No Image
          </div>
        )}
      </div>

      {/* Year */}

      <h3
        className="
          mt-6

          text-2xl
          font-bold
          tracking-[0.2em]

          text-black dark:text-white

          transition-all
          duration-300

          group-hover:scale-110
        "
      >
        {item.year}
      </h3>
    </div>
  );
}