import { createClient } from "@/lib/supabase/server";
import type {
  ContactContent,
  ContactMessage,
  ContactLink,
} from "@/types/contact";

/* ============================================================
   GET CONTACT LINKS
============================================================ */

export async function getContactLinks(): Promise<ContactLink[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact_links")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("CONTACT LINKS ERROR:", error);
    return [];
  }

  return data as ContactLink[];
}

/* ============================================================
   GET CONTACT CONTENT
============================================================ */

export async function getContactContent(): Promise<ContactContent | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact_content")
    .select("*")
    .maybeSingle();

  console.log("CONTACT DATA:", data);
  console.log("CONTACT ERROR:", error);

  if (error) {
    console.error("CONTACT CONTENT ERROR:", error);
    throw error;
  }

  return data as ContactContent | null;
}

/* ============================================================
   GET ALL CONTACT MESSAGES
============================================================ */

export async function getMessages(): Promise<ContactMessage[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("CONTACT MESSAGES ERROR:", error);
    throw error;
  }

  return (data as ContactMessage[]) ?? [];
}

/* ============================================================
   GET MESSAGE BY ID
   (Future: View Details / Reply)
============================================================ */

export async function getMessageById(
  id: string
): Promise<ContactMessage | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("CONTACT MESSAGE ERROR:", error);
    throw error;
  }

  return data as ContactMessage | null;
}

/* ============================================================
   DASHBOARD STATS
============================================================ */

export async function getMessageStats() {
  const messages = await getMessages();

  return {
    total: messages.length,

    new: messages.filter(
      (m) => m.status === "New"
    ).length,

    contacted: messages.filter(
      (m) => m.status === "Contacted"
    ).length,

    completed: messages.filter(
      (m) => m.status === "Completed"
    ).length,
  };
}
