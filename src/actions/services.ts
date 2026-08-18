"use server";

import { revalidatePath } from "next/cache";

import {
  createServiceItem,
  deleteServiceItem,
  updateServiceItem,
  updateServicesSection,
} from "@/services/services/services.service";

import {
  ServiceItem,
  ServiceSection,
} from "@/types/service";

/* ---------------- SECTION ---------------- */

export async function updateServicesSectionAction(
  data: ServiceSection
) {
  try {
    await updateServicesSection(data);

    revalidatePath("/dashboard/services");
    revalidatePath("/");

    return {
      success: true,
      message: "Services section updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to update services section.",
    };
  }
}

/* ---------------- ITEM UPDATE ---------------- */

export async function updateServiceItemAction(
  item: ServiceItem
) {
  try {
    await updateServiceItem(item);

    revalidatePath("/dashboard/services");
    revalidatePath("/");

    return {
      success: true,
      message: "Service updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to update service.",
    };
  }
}
/* ---------------- CREATE ---------------- */

export async function createServiceItemAction() {
  try {
    const item = await createServiceItem();

    revalidatePath("/dashboard/services");
    revalidatePath("/");

    return {
      success: true,
      data: item,
    };
  } catch (error) {
    console.error("CREATE SERVICE ERROR:", error);

    if (
      error &&
      typeof error === "object" &&
      "message" in error
    ) {
      console.error(
        (error as { message: string }).message
      );
    }

    throw error; // 👈 IMPORTANT
  }
}

/* ---------------- DELETE ---------------- */

export async function deleteServiceItemAction(
  id: string
) {
  try {
    await deleteServiceItem(id);

    revalidatePath("/dashboard/services");
    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
    };
  }
}