"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { MessageStatus } from "@/types/contact";

/* ============================================================
   UPDATE CONTACT CONTENT (CMS)
============================================================ */

export async function updateContactContent(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Contact content record not found.");
  }

  const updates = {
    email: formData.get("email"),
    email_description: formData.get("email_description"),

    whatsapp: formData.get("whatsapp"),
    whatsapp_description: formData.get("whatsapp_description"),

    linkedin: formData.get("linkedin"),
    linkedin_description: formData.get("linkedin_description"),

    booking_link: formData.get("booking_link"),
    booking_description: formData.get("booking_description"),

    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("contact_content")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error("UPDATE CONTACT CONTENT ERROR:", error);
    throw error;
  }

  revalidatePath("/dashboard/contact");
  revalidatePath("/");
}

/* ============================================================
   SUBMIT VISITOR CONTACT FORM
============================================================ */

export async function submitContactForm(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_messages")
    .insert({
      full_name: formData.get("full_name"),
      organization: formData.get("organization"),

      email: formData.get("email"),
      phone: formData.get("phone"),

      session_type: formData.get("session_type"),
      preferred_date: formData.get("preferred_date"),

      message: formData.get("message"),

      status: "New",
    });

  if (error) {
    console.error("SUBMIT CONTACT ERROR:", error);
    throw error;
  }

  // 📧 Resend email notification yahin add karenge

  revalidatePath("/dashboard/contact");

  return {
    success: true,
    message: "Message sent successfully.",
  };
}

/* ============================================================
   UPDATE MESSAGE STATUS
============================================================ */

export async function updateMessageStatus(
  id: string,
  status: MessageStatus
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_messages")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("UPDATE STATUS ERROR:", error);
    throw error;
  }

  revalidatePath("/dashboard/contact");
}

/* ============================================================
   DELETE MESSAGE
============================================================ */

export async function deleteMessage(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("DELETE MESSAGE ERROR:", error);
    throw error;
  }

  revalidatePath("/dashboard/contact");
}