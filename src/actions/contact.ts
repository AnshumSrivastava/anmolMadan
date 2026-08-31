"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { MessageStatus, ContactLink } from "@/types/contact";

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
   CONTACT LINKS CRUD & REORDER (CMS)
============================================================ */

export async function createContactLink(data: {
  label: string;
  url: string;
  icon_name: string;
}) {
  const supabase = await createClient();

  // Get max sort order
  const { data: existing } = await supabase
    .from("contact_links")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);

  const nextSort = (existing?.[0]?.sort_order ?? 0) + 1;

  const { data: created, error } = await supabase
    .from("contact_links")
    .insert({
      label: data.label,
      url: data.url,
      icon_name: data.icon_name || "Link",
      sort_order: nextSort,
    })
    .select()
    .single();

  if (error) {
    console.error("CREATE CONTACT LINK ERROR:", error);
    throw error;
  }

  revalidatePath("/dashboard/contact");
  revalidatePath("/");
  return created as ContactLink;
}

export async function updateContactLink(
  id: string,
  data: {
    label: string;
    url: string;
    icon_name: string;
  }
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_links")
    .update({
      label: data.label,
      url: data.url,
      icon_name: data.icon_name || "Link",
    })
    .eq("id", id);

  if (error) {
    console.error("UPDATE CONTACT LINK ERROR:", error);
    throw error;
  }

  revalidatePath("/dashboard/contact");
  revalidatePath("/");
}

export async function deleteContactLink(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_links")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("DELETE CONTACT LINK ERROR:", error);
    throw error;
  }

  revalidatePath("/dashboard/contact");
  revalidatePath("/");
}

export async function reorderContactLinks(
  orderedItems: { id: string; sort_order: number }[]
) {
  const supabase = await createClient();

  // Batch update sort orders
  for (const item of orderedItems) {
    const { error } = await supabase
      .from("contact_links")
      .update({ sort_order: item.sort_order })
      .eq("id", item.id);

    if (error) {
      console.error("REORDER CONTACT LINK ERROR:", error);
      throw error;
    }
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