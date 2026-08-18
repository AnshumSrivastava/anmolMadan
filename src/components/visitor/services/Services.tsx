import Reveal from "@/components/shared/Reveal";

import {
  getServicesSection,
  getServiceItems,
} from "@/services/services/services.service";

import ServicesHeader from "./ServicesHeader";
import ServicesGrid from "./ServicesGrid";
import CTA from "./CTA";

export default async function Services() {
  const section = await getServicesSection();
  const items = await getServiceItems();

  if (!section) return null;

  const activeItems = items
    .filter((item) => item.is_active)
    .sort(
      (a, b) =>
        a.display_order - b.display_order
    );

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#fafafa] py-28 text-black lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <Reveal>
          <ServicesHeader section={section} />
        </Reveal>

        <Reveal delay={0.15}>
          <ServicesGrid items={activeItems} />
        </Reveal>

        <Reveal delay={0.3}>
          <CTA />
        </Reveal>

      </div>
    </section>
  );
}