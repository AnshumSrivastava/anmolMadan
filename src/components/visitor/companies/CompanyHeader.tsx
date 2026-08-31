export default function CompanyHeader() {
  return (
    <div className="max-w-2xl">
      <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-400 dark:text-neutral-500">
        Experience
      </span>

      <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-black dark:text-white sm:text-5xl lg:text-6xl">
        Companies I've Worked With.
      </h2>

      <p className="mt-6 max-w-xl text-base leading-7 text-zinc-500 dark:text-neutral-400 sm:text-lg">
        A journey through the companies, teams and products where I've built
        scalable software, solved real-world problems and grown as an engineer.
      </p>
    </div>
  );
}