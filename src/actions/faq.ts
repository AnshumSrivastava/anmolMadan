"use server";

import { revalidatePath } from "next/cache";

import {
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from "@/services/faq/faq.service";

/* ---------------------------------- */
/* CREATE FAQ                         */
/* ---------------------------------- */

export async function createFAQAction(formData: FormData) {
  const question = formData.get("question")?.toString() || "";
  const answer = formData.get("answer")?.toString() || "";
  const sort_order = Number(formData.get("sort_order") || 0);
  const is_active = formData.get("is_active") === "true";

  await createFAQ({
    question,
    answer,
    sort_order,
    is_active,
  });

  revalidatePath("/dashboard/faq");
  revalidatePath("/");
}

/* ---------------------------------- */
/* UPDATE FAQ                         */
/* ---------------------------------- */

export async function updateFAQAction(formData: FormData) {
  const id = formData.get("id")?.toString() || "";

  const question = formData.get("question")?.toString() || "";
  const answer = formData.get("answer")?.toString() || "";
  const sort_order = Number(formData.get("sort_order") || 0);
  const is_active = formData.get("is_active") === "true";

  await updateFAQ(id, {
    question,
    answer,
    sort_order,
    is_active,
  });

  revalidatePath("/dashboard/faq");
  revalidatePath("/");
}

/* ---------------------------------- */
/* DELETE FAQ                         */
/* ---------------------------------- */

export async function deleteFAQAction(id: string) {
  await deleteFAQ(id);

  revalidatePath("/dashboard/faq");
  revalidatePath("/");
}