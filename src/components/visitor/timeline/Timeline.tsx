import { getTimeline } from "@/services/timeline/timeline.service";

import TimelineLine from "./TimelineLine";
import TimelineItem from "./TimelineItem";

export default async function Timeline() {
  const timeline = await getTimeline();

  return (
    <section
      id="timeline"
      className="relative overflow-hidden bg-[#fafafa] dark:bg-neutral-950 py-24 text-black dark:text-white lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-20 max-w-2xl">
          <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-400">
            MY JOURNEY
          </span>

          <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl lg:text-6xl">
            Timeline
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          <TimelineLine />

          <div
            className="
              relative
              z-10
              flex
              items-start
              justify-between
              gap-16
              pt-8
              pb-24
              lg:gap-20
            "
          >
            {timeline.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}