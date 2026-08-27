type Props = {
  testimonial?: string | null;
  name?: string | null;
};

export default function ProjectTestimonial({
  testimonial,
  name,
}: Props) {
  if (!testimonial) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-sm text-zinc-600">
          No testimonial added yet.
        </p>
      </div>
    );
  }

  return (
    <blockquote
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-950
        p-6
      "
    >

      <div className="mb-4 text-3xl text-zinc-600">
        “
      </div>

      <p className="text-base leading-8 text-zinc-300">
        {testimonial}
      </p>

      {name && (
        <footer className="mt-5 text-sm font-medium text-white">
          — {name}
        </footer>
      )}

    </blockquote>
  );
}