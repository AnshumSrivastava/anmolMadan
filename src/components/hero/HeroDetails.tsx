"use client";

import { Hero } from "@/types/hero";

type Props = {
  form: Hero;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function HeroDetails({ form, onChange }: Props) {
  return (
    <div className="space-y-8">
      {/* Basic Information */}

      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-6 text-xl font-bold text-white">
          Basic Information
        </h2>

        <div className="space-y-5">
          <Field
            label="Pre Heading"
            name="pre_heading"
            value={form.pre_heading}
            onChange={onChange}
          />

          <Field
            label="Main Heading"
            name="title_line_1"
            value={form.title_line_1}
            onChange={onChange}
          />

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={form.description ?? ""}
              onChange={onChange}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none focus:border-white"
            />
          </div>
        </div>
      </section>

      {/* Statistics */}

      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-6 text-xl font-bold text-white">
          Statistics
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <StatCard
            numberName="stat_1_number"
            labelName="stat_1_label"
            number={form.stat_1_number}
            label={form.stat_1_label}
            onChange={onChange}
          />

          <StatCard
            numberName="stat_2_number"
            labelName="stat_2_label"
            number={form.stat_2_number}
            label={form.stat_2_label}
            onChange={onChange}
          />

          <StatCard
            numberName="stat_3_number"
            labelName="stat_3_label"
            number={form.stat_3_number}
            label={form.stat_3_label}
            onChange={onChange}
          />

          <StatCard
            numberName="stat_4_number"
            labelName="stat_4_label"
            number={form.stat_4_number}
            label={form.stat_4_label}
            onChange={onChange}
          />
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-400">
        {label}
      </label>

      <input
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none focus:border-white"
      />
    </div>
  );
}

function StatCard({
  numberName,
  labelName,
  number,
  label,
  onChange,
}: {
  numberName: string;
  labelName: string;
  number: string | null;
  label: string | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  return (
    <div className="rounded-lg border border-zinc-700 p-4">
      <h3 className="mb-4 font-semibold text-white">
        Stat
      </h3>

      <Field
        label="Number"
        name={numberName}
        value={number}
        onChange={onChange}
      />

      <div className="mt-4">
        <Field
          label="Label"
          name={labelName}
          value={label}
          onChange={onChange}
        />
      </div>
    </div>
  );
}