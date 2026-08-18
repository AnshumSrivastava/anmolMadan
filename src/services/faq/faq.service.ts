import { createClient } from "@/lib/supabase/server";
import type { FAQItem } from "@/types/faq";

/* ---------------------------------- */
/* GET ALL FAQs                       */
/* ---------------------------------- */

export async function getFAQs(): Promise<FAQItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("faq")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }

  return data as FAQItem[];
}

/* ---------------------------------- */
/* CREATE FAQ                         */
/* ---------------------------------- */

export async function createFAQ(
  faq: Omit<FAQItem, "id" | "created_at" | "updated_at">
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("faq")
    .insert([faq]);

  if (error) {
    console.error("Error creating FAQ:", error);
    throw error;
  }
}

/* ---------------------------------- */
/* UPDATE FAQ                         */
/* ---------------------------------- */

export async function updateFAQ(
  id: string,
  faq: Partial<Omit<FAQItem, "id" | "created_at" | "updated_at">>
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("faq")
    .update({
      ...faq,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating FAQ:", error);
    throw error;
  }
}

/* ---------------------------------- */
/* DELETE FAQ                         */
/* ---------------------------------- */

export async function deleteFAQ(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("faq")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting FAQ:", error);
    throw error;
  }
}