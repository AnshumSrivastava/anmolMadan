import { createClient } from "@/lib/supabase/server";
import { Vision } from "@/types/vision";

/* =========================================================
   GET VISION
========================================================= */

export async function getVision(): Promise<Vision | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vision")
    .select("*")
    .single();

  if (error) {
    console.error("Failed to fetch vision:", error);
    return null;
  }

  return data;
}


/* =========================================================
   UPDATE VISION
========================================================= */

export async function updateVision(
  vision: Partial<Vision> & { id: string }
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vision")
    .update({
      section_heading: vision.section_heading,
      main_heading: vision.main_heading,
      description: vision.description,

      usp_1_title: vision.usp_1_title,
      usp_1_description: vision.usp_1_description,

      usp_2_title: vision.usp_2_title,
      usp_2_description: vision.usp_2_description,

      usp_3_title: vision.usp_3_title,
      usp_3_description: vision.usp_3_description,

      usp_4_title: vision.usp_4_title,
      usp_4_description: vision.usp_4_description,

      closing_statement: vision.closing_statement,

      image_url: vision.image_url,

      updated_at: new Date().toISOString(),
    })
    .eq("id", vision.id)
    .select()
    .single();

  if (error) {
    console.error(
      "Failed to update vision:",
      error
    );

    throw error;
  }

  return data;
}