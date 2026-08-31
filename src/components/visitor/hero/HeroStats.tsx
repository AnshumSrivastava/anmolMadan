"use client";

import { useEffect, useState } from "react";

type Stat = {
  number: string | null;
  label: string | null;
};

type Props = {
  stats: Stat[];
};

function AnimatedNumber({ value }: { value: string | null }) {
  const target = parseInt(value?.replace(/\D/g, "") || "0", 10);
  const hasPlus = value?.includes("+");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!target) {
      setCount(0);
      return;
    }

    setCount(0);
    const duration = 3000; // 3 seconds
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const current = Math.floor(easeOutQuart * target);

      setCount(current);

      if (progress < duration) {
        animationFrameId = window.requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [target]);

  return (
    <>
      {count.toLocaleString()}
      {hasPlus ? "+" : ""}
    </>
  );
}

export default function HeroStats({ stats }: Props) {
  return (
    <div className="flex flex-wrap items-start gap-8 sm:gap-12 lg:gap-14 text-left select-none">
      {stats.map((stat, index) => {
        if (!stat.number && !stat.label) return null;

        return (
          <div key={index} className="flex flex-col">
            {/* Number */}
            <div className="text-[clamp(1.5rem,2.2vw,2.25rem)] font-extrabold tracking-tight text-neutral-950 dark:text-white leading-none">
              <AnimatedNumber value={stat.number} />
            </div>

            {/* Label */}
            <div className="mt-1.5 text-[clamp(11px,0.8vw,13px)] font-medium text-neutral-500 dark:text-neutral-400">
              {stat.label?.trim()}
            </div>
          </div>
        );
      })}
    </div>
  );
}