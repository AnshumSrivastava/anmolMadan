import { createClient } from "@/lib/supabase/server";
import { Hero } from "@/types/hero";

export async function getHero() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hero")
    .select("*")
    .single();

  if (error) throw error;

  return {
    ...data,
    stats: [
      {
        number: data.stat_1_number,
        label: data.stat_1_label,
      },
      {
        number: data.stat_2_number,
        label: data.stat_2_label,
      },
      {
        number: data.stat_3_number,
        label: data.stat_3_label,
      },
      {
        number: data.stat_4_number,
        label: data.stat_4_label,
      },
    ],
  };
}

export async function updateHero(hero: Partial<Hero>) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hero")
    .update(hero)
    .eq("id", hero.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}