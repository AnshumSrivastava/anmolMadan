import Reveal from "@/components/shared/Reveal";
import { getCompanies } from "@/services/companies/companies.service";

import CompanyHeader from "./CompanyHeader";
import CompanyItem from "./CompanyItem";

export default async function Companies() {
  const companies = await getCompanies();

  return (
    <section
      id="companies"
      className="relative overflow-hidden bg-[#fafafa] dark:bg-neutral-950 py-24 text-black dark:text-white md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}

        <Reveal>
          <CompanyHeader />
        </Reveal>

        {/* Companies */}

        <div className="mt-20">
          {companies.map((company, index) => (
            <Reveal
              key={company.id}
              delay={index * 0.06}
            >
              <div
                className={
                  index !== companies.length - 1
                    ? "border-b border-black/10 dark:border-white/10 py-10"
                    : "py-10"
                }
              >
                <CompanyItem company={company} />
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}