import Reveal from "@/components/shared/Reveal";
import {
  getServicesSection,
  getServiceItems,
} from "@/services/services/services.service";
import ServicesHeader from "./ServicesHeader";
import ServicesGrid from "./ServicesGrid";

export default async function Services() {
  const section = await getServicesSection();
  const items = await getServiceItems();

  const activeItems = items
    .filter((item) => item.is_active)
    .sort((a, b) => a.display_order - b.display_order);

  const defaultSection = {
    id: "services-default",
    section_heading: "WAYS WE CAN WORK TOGETHER",
    main_heading: "Ways We Can Work Together",
    description:
      "Whether you're looking for an interactive keynote, custom enterprise security training, or one-on-one executive advisory — explore the core formats available.",
  };

  const displaySection = section || defaultSection;

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#fafafa] dark:bg-neutral-950 py-20 lg:py-24 text-black dark:text-white"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <ServicesHeader section={displaySection} />
        </Reveal>

        <div className="mt-12 lg:mt-16">
          <ServicesGrid items={activeItems} />
        </div>
      </div>
    </section>
  );
}