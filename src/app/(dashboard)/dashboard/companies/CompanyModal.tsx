"use client";

import { Company } from "@/types/company";
import CompanyForm from "./CompanyForm";

type Props = {
  open: boolean;
  onClose: () => void;
  company: Company | null;
};

export default function CompanyModal({
  open,
  onClose,
  company,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {company ? "Edit Company" : "New Company"}
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        <CompanyForm
          company={company}
          onSuccess={onClose}
        />
      </div>
    </div>
  );
}