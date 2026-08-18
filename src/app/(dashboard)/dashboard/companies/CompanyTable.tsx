"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

import { Company } from "@/types/company";
import { deleteCompany } from "@/actions/companies";

import CompanyModal from "./CompanyModal";

type Props = {
  companies: Company[];
};

export default function CompanyTable({
  companies,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] =
    useState<Company | null>(null);

  function handleCreate() {
    setSelectedCompany(null);
    setOpen(true);
  }

  function handleEdit(company: Company) {
    setSelectedCompany(company);
    setOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this company?")) return;

    await deleteCompany(id);
  }

  return (
    <>
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Companies
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage work experience.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-black"
        >
          <Plus size={18} />

          New Company
        </button>

      </div>

      <div className="mt-8 space-y-4">

        {companies.map((company) => (

          <div
            key={company.id}
            className="flex items-center justify-between rounded-xl border border-zinc-800 p-5"
          >

            <div>

              <h2 className="font-semibold">
                {company.company_name}
              </h2>

              <p className="text-sm text-zinc-400">
                {company.role}
              </p>

            </div>

            <div className="flex gap-2">

              <button
                onClick={() =>
                  handleEdit(company)
                }
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() =>
                  handleDelete(company.id)
                }
              >
                <Trash2 size={18} />
              </button>

            </div>

          </div>

        ))}

      </div>

      <CompanyModal
        open={open}
        onClose={() => setOpen(false)}
        company={selectedCompany}
      />
    </>
  );
}