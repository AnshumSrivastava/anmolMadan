"use client";

import { useState, useTransition } from "react";

import {
  createServiceItemAction,
  deleteServiceItemAction,
  updateServiceItemAction,
  updateServicesSectionAction,
} from "@/actions/services";

import {
  ServiceItem as ServiceItemType,
  ServiceSection,
} from "@/types/service";

import ServicesDetails from "./ServicesDetails";
import ServiceItem from "./ServiceItem";
import ServicesPreview from "./ServicesPreview";

type Props = {
  section: ServiceSection;
  items: ServiceItemType[];
};

export default function ServicesForm({
  section,
  items,
}: Props) {
  const [sectionData, setSectionData] =
    useState<ServiceSection>(section);

  const [serviceItems, setServiceItems] =
    useState<ServiceItemType[]>(items);

  const [isPending, startTransition] =
    useTransition();

  function handleSectionChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setSectionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleItemChange(
    id: string,
    field: keyof ServiceItemType,
    value: string | number | boolean
  ) {
    setServiceItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  }

  async function handleAddService() {
    const result = await createServiceItemAction();

    if (!result.success || !result.data) {
      alert("Failed to create service.");
      return;
    }

    setServiceItems((prev) => [
      ...prev,
      result.data,
    ]);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this service?"))
      return;

    const result =
      await deleteServiceItemAction(id);

    if (!result.success) {
      alert("Failed to delete service.");
      return;
    }

    setServiceItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  function handleSubmit() {
    startTransition(async () => {
      const sectionResult =
        await updateServicesSectionAction(
          sectionData
        );

      for (const item of serviceItems) {
        await updateServiceItemAction(item);
      }

      if (sectionResult.success) {
        alert("Services updated successfully.");
      } else {
        alert(sectionResult.message);
      }
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-8 lg:col-span-2">
        <ServicesDetails
          data={sectionData}
          onChange={handleSectionChange}
        />

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Services ({serviceItems.length})
            </h2>

            <p className="text-sm text-zinc-400">
              Manage your service cards.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddService}
            className="rounded-xl bg-white px-5 py-2 font-medium text-black transition hover:bg-zinc-200"
          >
            + Add Service
          </button>
        </div>

        {serviceItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-700 p-10 text-center">
            <p className="text-zinc-400">
              No services added yet.
            </p>

            <button
              type="button"
              onClick={handleAddService}
              className="mt-5 rounded-xl bg-white px-5 py-2 font-medium text-black hover:bg-zinc-200"
            >
              + Add First Service
            </button>
          </div>
        ) : (
          serviceItems.map((item, index) => (
            <ServiceItem
              key={item.id}
              item={item}
              index={index}
              onChange={handleItemChange}
              onDelete={handleDelete}
            />
          ))
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full rounded-xl bg-white py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>

      <div className="sticky top-24 h-fit">
        <ServicesPreview
          section={sectionData}
          items={serviceItems}
        />
      </div>
    </div>
  );
}