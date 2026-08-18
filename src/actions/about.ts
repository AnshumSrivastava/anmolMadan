"use server";

import { revalidatePath } from "next/cache";
import { updateAbout } from "@/services/about/about.service";
import { About } from "@/types/about";

export async function updateAboutAction(data: About) {
  try {
    await updateAbout(data);

    revalidatePath("/dashboard/about");
    revalidatePath("/");

    return {
      success: true,
      message: "About section updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to update About section.",
    };
  }
}