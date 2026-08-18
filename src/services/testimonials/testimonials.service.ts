import { createClient } from "@/lib/supabase/server";
import { Testimonial } from "@/types/testimonial";

/* -------------------- GET -------------------- */

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }

  return data as Testimonial[];
}

/* -------------------- CREATE -------------------- */

export async function createTestimonial() {
  const supabase = await createClient();

  const { error } = await supabase
    .from("testimonials")
    .insert({
      client_name: "New Client",
      designation: "",
      company: "",
      photo: null,
      message: "",
      sort_order: 999,
      is_active: true,
    });

  if (error) {
    console.error("Error creating testimonial:", error);
    throw error;
  }
}

/* -------------------- UPDATE -------------------- */

export async function updateTestimonial(
  id: string,
  updates: Partial<Testimonial>
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("testimonials")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error("Error updating testimonial:", error);
    throw error;
  }
}

/* -------------------- DELETE -------------------- */

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting testimonial:", error);
    throw error;
  }
}