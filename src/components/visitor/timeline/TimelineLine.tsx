export default function TimelineLine() {
  return (
    <>
      {/* Main Line */}

      <div
        className="
          absolute

          left-0
          right-0

          top-[64px]

          h-[2px]

          rounded-full

          bg-neutral-300
        "
      />

      {/* Highlight */}

      <div
        className="
          absolute

          left-0
          right-0

          top-[64px]

          h-px

          bg-gradient-to-r
          from-transparent
          via-neutral-500/40
          to-transparent
        "
      />
    </>
  );
}