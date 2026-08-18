import { createClient } from "@/lib/supabase/server";
import { Gallery } from "@/types/gallery";

/* =====================================================
   GET ALL IMAGES
===================================================== */

export async function getGallery(): Promise<Gallery[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return data ?? [];
}

/* =====================================================
   GET IMAGE BY ID
===================================================== */

export async function getGalleryById(
  id: string
): Promise<Gallery | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;

  return data;
}