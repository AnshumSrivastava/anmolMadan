import { createClient } from "@/lib/supabase/server";
import type { Timeline } from "@/types/timeline";

export async function getTimeline(): Promise<Timeline[]> {
  const supabase = await createClient();

const { data, error } = await supabase
  .from("timeline")
  .select("*")
  .order("year", {
    ascending: true,
  });
  if (error) {
    throw error;
  }

  return data ?? [];
}