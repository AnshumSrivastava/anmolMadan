import { getCompanies } from "@/services/companies/companies.service";

import CompanyTable from "./CompanyTable";

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return (
    <main className="space-y-6">
      <CompanyTable companies={companies} />
    </main>
  );
}