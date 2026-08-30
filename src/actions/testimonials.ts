"use server";

import { revalidatePath } from "next/cache";
import {
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
  submitPublicTestimonial,
} from "@/services/testimonials/testimonials.service";
import { Testimonial } from "@/types/testimonial";
import { sanitizeName, sanitizeText, sanitizeTestimonialMessage } from "@/utils/sanitize";

/* -------------------- CREATE (ADMIN) -------------------- */

export async function createTestimonialAction() {
  await createTestimonial();
  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
}

/* -------------------- UPDATE -------------------- */

export async function updateTestimonialAction(
  id: string,
  updates: Partial<Testimonial>
) {
  await updateTestimonial(id, updates);
  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
}

/* -------------------- DELETE -------------------- */

export async function deleteTestimonialAction(id: string) {
  await deleteTestimonial(id);
  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
}

/* -------------------- PUBLIC SUBMISSION -------------------- */

export async function submitPublicTestimonialAction(formData: FormData) {
  try {
    const rawName = String(formData.get("client_name") ?? "");
    const rawDesignation = String(formData.get("designation") ?? "");
    const rawCompany = String(formData.get("company") ?? "");
    const rawMessage = String(formData.get("message") ?? "");
    const honeypot = String(formData.get("website_url") ?? "");

    // 1. Honeypot check
    if (honeypot.trim().length > 0) {
      return {
        success: true,
        message: "Thank you for sharing your testimonial! It has been submitted for review.",
      };
    }

    // 2. Strict sanitization
    const client_name = sanitizeName(rawName);
    const designation = sanitizeText(rawDesignation, { maxLength: 100, allowNewlines: false });
    const company = sanitizeText(rawCompany, { maxLength: 100, allowNewlines: false });
    const message = sanitizeTestimonialMessage(rawMessage);

    if (!client_name || client_name.length < 2) {
      return { success: false, message: "Please enter a valid name (at least 2 characters)." };
    }

    if (!message || message.length < 10) {
      return {
        success: false,
        message: "Please write a meaningful testimonial message (at least 10 characters).",
      };
    }

    // 3. Submit
    await submitPublicTestimonial({
      client_name,
      designation: designation || "Professional Participant",
      company: company || "Organization",
      message,
    });

    revalidatePath("/dashboard/testimonials");
    revalidatePath("/");

    return {
      success: true,
      message: "Thank you! Your testimonial has been submitted and is pending moderation approval.",
    };
  } catch (error) {
    console.error("Error submitting public testimonial:", error);
    return {
      success: false,
      message: "An unexpected error occurred while submitting your testimonial. Please try again.",
    };
  }
}