import { createClient } from "@/lib/supabase/server";
import { About } from "@/types/about";

export async function getAbout(): Promise<About | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("about")
    .select("*")
    .single();

  if (error) {
    console.error("Failed to fetch about:", error);
    return null;
  }

  return data;
}

export async function updateAbout(
  about: Partial<About> & { id: string }
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("about")
    .update({
      section_heading: about.section_heading,
      main_heading: about.main_heading,

      paragraph_1: about.paragraph_1,
      paragraph_2: about.paragraph_2,
      paragraph_3: about.paragraph_3,

      credential_1_title: about.credential_1_title,
      credential_1_subtitle: about.credential_1_subtitle,

      credential_2_title: about.credential_2_title,
      credential_2_subtitle: about.credential_2_subtitle,

      credential_3_title: about.credential_3_title,
      credential_3_subtitle: about.credential_3_subtitle,

      credential_4_title: about.credential_4_title,
      credential_4_subtitle: about.credential_4_subtitle,

      audience_1_title: about.audience_1_title,
      audience_1_description: about.audience_1_description,

      audience_2_title: about.audience_2_title,
      audience_2_description: about.audience_2_description,

      audience_3_title: about.audience_3_title,
      audience_3_description: about.audience_3_description,

      updated_at: new Date().toISOString(),
    })
    .eq("id", about.id);

  if (error) {
    console.error("Failed to update about:", error);
    throw error;
  }
}