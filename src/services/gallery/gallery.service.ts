import { createAdminClient } from "@/lib/supabase/admin";
import { Gallery } from "@/types/gallery";

/* =====================================================
   GET ALL IMAGES / VIDEOS
===================================================== */

export async function getGallery(): Promise<Gallery[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching gallery from Supabase:", error);
    return [];
  }

  return data ?? [];
}

/* =====================================================
   GET IMAGE BY ID
===================================================== */

export async function getGalleryById(
  id: string
): Promise<Gallery | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;

  return data;
}