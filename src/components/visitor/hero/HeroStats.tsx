"use client";

import { useEffect, useState } from "react";

type Stat = {
  number: string | null;
  label: string | null;
};

type Props = {
  stats: Stat[];
};


/* ==========================================================
   ANIMATED NUMBER

   Initial load:
   0 → 1 → 2 → 3 → ... → TARGET

   Once target is reached:
   STOP.

   No live +1 every 3 seconds.
========================================================== */

function AnimatedNumber({
  value,
}: {
  value: string | null;
}) {
  const target = parseInt(
    value?.replace(/\D/g, "") || "0",
    10
  );

  const hasPlus = value?.includes("+");

  const [count, setCount] = useState(0);


  /* ========================================================
     INITIAL FAST COUNT
  ======================================================== */

  useEffect(() => {
    if (!target) {
      setCount(0);
      return;
    }

    setCount(0);

    let current = 0;

    const interval = window.setInterval(() => {
      current += 1;

      if (current >= target) {
        current = target;

        setCount(target);

        window.clearInterval(interval);

        return;
      }

      setCount(current);
    }, 4);

    return () => {
      window.clearInterval(interval);
    };
  }, [target]);


  /* ========================================================
     OUTPUT
  ======================================================== */

  return (
    <>
      {count.toLocaleString()}
      {hasPlus ? "+" : ""}
    </>
  );
}


/* ==========================================================
   HERO STATS
========================================================== */

export default function HeroStats({
  stats,
}: Props) {
  return (
    <div
      className="
        flex
        flex-col

        gap-[clamp(28px,4vh,52px)]
      "
    >

      {stats.map((stat, index) => (
        <div
          key={index}
          className="
            flex
            items-stretch
          "
        >

          {/* =================================================
              LINE
          ================================================= */}

          <div
            className="
              mr-[clamp(14px,1.2vw,22px)]

              w-px

              shrink-0

              bg-neutral-300
            "
          />


          {/* =================================================
              CONTENT
          ================================================= */}

          <div>

            <h3
              className="
                text-[clamp(30px,2.5vw,48px)]

                font-bold

                leading-none

                tracking-[-0.045em]

                text-black
              "
            >
              <AnimatedNumber
                value={stat.number}
              />
            </h3>


            <p
              className="
                mt-2

                max-w-[190px]

                text-[clamp(12px,0.8vw,15px)]

                leading-5

                text-neutral-500
              "
            >
              {stat.label}
            </p>

          </div>

        </div>
      ))}

    </div>
  );
}