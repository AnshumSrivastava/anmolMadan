const companies = [
  "Progeta",
  "Microsoft",
  "Google",
  "Amazon",
  "Infosys",
  "Deloitte",
];

export default function TrustedBy() {
  return (
    <div className="mt-32 border-t border-zinc-200 pt-16">
      <p className="text-center text-xs font-medium uppercase tracking-[0.35em] text-zinc-500">
        Trusted by teams worldwide
      </p>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {companies.map((company) => (
          <span
            key={company}
            className="cursor-default text-2xl font-semibold tracking-tight text-zinc-300 transition-all duration-300 hover:text-black"
          >
            {company}
          </span>
        ))}
      </div>
    </div>
  );
}