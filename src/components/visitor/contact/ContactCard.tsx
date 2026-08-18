type Props = {
  title: string;
  value: string;
  description: string | null;
  href: string;
  accent: "cyan" | "emerald" | "violet" | "blue";
};

const accentStyles = {
  cyan: "bg-cyan-500",
  emerald: "bg-emerald-500",
  violet: "bg-violet-600",
  blue: "bg-blue-600",
};

export default function ContactCard({
  title,
  value,
  description,
  href,
  accent,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-5 rounded-3xl border border-zinc-200 bg-zinc-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:bg-white"
    >
      <div
        className={`h-16 w-1 rounded-full ${accentStyles[accent]}`}
      />

      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold text-black">
          {title}
        </h3>

        <p className="mt-2 break-all font-medium text-sky-600 transition group-hover:text-sky-700">
          {value}
        </p>

        {description && (
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            {description}
          </p>
        )}
      </div>
    </a>
  );
}