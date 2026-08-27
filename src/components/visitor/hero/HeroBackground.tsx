export default function HeroBackground() {
  return (
    <div
      className="
        pointer-events-none

        absolute
        inset-0

        z-0

        overflow-hidden

        bg-white
      "
    >

      {/* CENTER LIGHT */}

      <div
        className="
          absolute

          left-1/2
          top-[45%]

          h-[65%]
          w-[55%]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-neutral-100/50

          blur-[140px]
        "
      />

    </div>
  );
}