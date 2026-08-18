import {
  getServicesSection,
  getServiceItems,
} from "@/services/services/services.service";

import { ServicesForm } from "@/components/services";

export default async function ServicesPage() {
  const section = await getServicesSection();
  const items = await getServiceItems();

  if (!section) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
        <h2 className="text-lg font-semibold text-red-500">
          Failed to load Services
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Please make sure the Services record exists.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Services
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage your services section.
        </p>
      </div>

      <ServicesForm
        section={section}
        items={items}
      />
    </div>
  );
}