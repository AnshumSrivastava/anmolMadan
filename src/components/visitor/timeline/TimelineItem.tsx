import Reveal from "@/components/shared/Reveal";

import { Timeline } from "@/types/timeline";

import TimelineNode from "./TimelineNode";
import TimelineCard from "./TimelineCard";

type Props = {
  item: Timeline;
  index: number;
};

export default function TimelineItem({
  item,
  index,
}: Props) {
  const top = index % 2 === 0;

  return (
    <Reveal delay={index * 0.15}>
      <div
        className="
          group
          relative
          flex
          w-44
          flex-col
          items-center
          justify-center
        "
      >
        {/* Card Above */}

        {top && (
          <div
            className="
              absolute
              bottom-[180px]
              left-1/2
              z-30
              -translate-x-1/2
            "
          >
            <TimelineCard item={item} />
          </div>
        )}

        <TimelineNode item={item} />

        {/* Card Below */}

        {!top && (
          <div
            className="
              absolute
              top-[180px]
              left-1/2
              z-30
              -translate-x-1/2
            "
          >
            <TimelineCard item={item} />
          </div>
        )}
      </div>
    </Reveal>
  );
}