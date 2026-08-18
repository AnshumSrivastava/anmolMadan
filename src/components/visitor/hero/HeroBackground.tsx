export default function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-white"
    >
      {/* Very Soft Top Glow */}

    <div
  className="
    absolute

    left-1/2
    top-[180px]

    h-[700px]
    w-[700px]

    -translate-x-1/2

    rounded-full

    bg-black/[0.025]

    blur-[170px]
  "
/>
      {/* Bottom Fade */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0

          h-32

          bg-gradient-to-b
          from-transparent
          to-white
        "
      />
    </div>
  );
}