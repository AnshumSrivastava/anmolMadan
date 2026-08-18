import { Company } from "@/types/company";
import CompanyWebsite from "./CompanyWebsite";

type CompanyItemProps = {
  company: Company;
};

export default function CompanyItem({
  company,
}: CompanyItemProps) {
  const startYear = company.start_date
    ? new Date(company.start_date).getFullYear()
    : "";

  const endYear = company.current_company
    ? "Present"
    : company.end_date
      ? new Date(company.end_date).getFullYear()
      : "";

  return (
    <article className="group w-full rounded-2xl border border-black/10 bg-white p-8 transition-all duration-300 hover:border-black/20 md:p-10 lg:p-12">
      <div className="grid gap-10 lg:grid-cols-[180px_1fr_auto] lg:items-start lg:gap-12">

        {/* Duration */}

        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-400">
            {startYear} — {endYear}
          </p>
        </div>

        {/* Company Details */}

        <div>
          <p className="text-sm font-medium text-zinc-500">
            {company.role}
          </p>

          <h3 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-black md:text-4xl">
            {company.company_name}
          </h3>

          {company.description && (
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-500">
              {company.description}
            </p>
          )}
        </div>

        {/* Website */}

        <div className="lg:pt-1">
          <CompanyWebsite website={company.website} />
        </div>

      </div>
    </article>
  );
}