"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createCompany,
  updateCompany,
} from "@/actions/companies";

import { Company } from "@/types/company";

type Props = {
  company?: Company | null;
  onSuccess?: () => void;
};

export default function CompanyForm({
  company,
  onSuccess,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    formData: FormData
  ) {
    setLoading(true);

    try {
      if (company) {
        formData.append("id", company.id);
        await updateCompany(formData);
      } else {
        await createCompany(formData);
      }

      router.refresh();
      onSuccess?.();

    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">

      <div className="grid gap-5 md:grid-cols-2">

        <input
          name="company_name"
          placeholder="Company Name"
          defaultValue={company?.company_name}
          required
          className="rounded-lg border border-zinc-800 bg-zinc-900 p-3"
        />

        <input
          name="role"
          placeholder="Role"
          defaultValue={company?.role}
          required
          className="rounded-lg border border-zinc-800 bg-zinc-900 p-3"
        />

      </div>

      <textarea
        name="description"
        placeholder="Description"
        defaultValue={company?.description ?? ""}
        rows={5}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3"
      />

      <input
        name="website"
        placeholder="Website"
        defaultValue={company?.website ?? ""}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3"
      />

      <div className="grid gap-5 md:grid-cols-2">

        <input
          type="date"
          name="start_date"
          defaultValue={company?.start_date}
          required
          className="rounded-lg border border-zinc-800 bg-zinc-900 p-3"
        />

        <input
          type="date"
          name="end_date"
          defaultValue={company?.end_date ?? ""}
          className="rounded-lg border border-zinc-800 bg-zinc-900 p-3"
        />

      </div>

      <label className="flex items-center gap-3">

        <input
          type="checkbox"
          name="current_company"
          value="true"
          defaultChecked={company?.current_company}
        />

        Currently Working Here

      </label>


      <input
        type="number"
        name="sort_order"
        defaultValue={company?.sort_order ?? 0}
        placeholder="Sort Order"
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3"
      />

      <button
        disabled={loading}
        className="w-full rounded-lg bg-white py-3 font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : company
          ? "Update Company"
          : "Create Company"}
      </button>

    </form>
  );
}