"use client";

type StatProps = {
  number: string;
  label: string;
};

type Props = {
  stats: StatProps[];
};

export default function HeroStats({ stats }: Props) {
  return (
    <div className="mt-14 grid grid-cols-2 gap-8">
      {stats.map((stat, index) => (
        <div key={index}>
          <h2 className="text-4xl font-bold text-black">
            {stat.number || "0+"}
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            {stat.label || "Label"}
          </p>
        </div>
      ))}
    </div>
  );
}