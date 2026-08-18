type Stat = {
  number: string | null;
  label: string | null;
};

type Props = {
  stats: Stat[];
};

export default function HeroStats({ stats }: Props) {
  return (
    <div
      className="
        grid

        grid-cols-2

        gap-x-14
        gap-y-10

        pt-14
      "
    >
      {stats.map((stat, index) => (
        <div key={index}>

          <h3
            className="
              text-[42px]
              font-bold

              tracking-[-0.04em]

              text-black
            "
          >
            {stat.number}
          </h3>

          <p
            className="
              mt-3

              max-w-[120px]

              text-sm

              leading-6

              text-neutral-500
            "
          >
            {stat.label}
          </p>

        </div>
      ))}
    </div>
  );
}