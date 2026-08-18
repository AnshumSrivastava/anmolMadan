"use server";

import { revalidatePath } from "next/cache";

import {
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from "@/services/testimonials/testimonials.service";

import { Testimonial } from "@/types/testimonial";

/* -------------------- CREATE -------------------- */

export async function createTestimonialAction() {
  await createTestimonial();

  revalidatePath("/dashboard/testimonials");
}

/* -------------------- UPDATE -------------------- */

export async function updateTestimonialAction(
  id: string,
  updates: Partial<Testimonial>
) {
  await updateTestimonial(id, updates);

  revalidatePath("/dashboard/testimonials");
}

/* -------------------- DELETE -------------------- */

export async function deleteTestimonialAction(id: string) {
  await deleteTestimonial(id);

  revalidatePath("/dashboard/testimonials");
}