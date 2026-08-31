import { createClient } from "@/lib/supabase/server";
import { Testimonial } from "@/types/testimonial";


/* -------------------- GET ALL (ADMIN) -------------------- */

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error(error);
      return [];
    }

    return (data as Testimonial[]) || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

/* -------------------- GET PUBLIC APPROVED -------------------- */

export async function getPublicApprovedTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error(error);
      return [];
    }

    return (data.filter((t) => t.status === "approved" || !t.status) as Testimonial[]) || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

/* -------------------- SUBMIT PUBLIC TESTIMONIAL -------------------- */

export async function submitPublicTestimonial(input: {
  client_name: string;
  designation: string;
  company: string;
  message: string;
}): Promise<Testimonial> {
  const newRecord: Testimonial = {
    id: `test-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    client_name: input.client_name,
    designation: input.designation,
    company: input.company,
    photo: null,
    message: input.message,
    sort_order: 999,
    is_active: false,
    status: "pending",
    created_at: new Date().toISOString(),
  };

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .insert({
        client_name: input.client_name,
        designation: input.designation,
        company: input.company,
        photo: null,
        message: input.message,
        sort_order: 999,
        is_active: false,
        status: "pending",
      })
      .select()
      .single();

    if (!error && data) {
      return data;
    }
    throw error || new Error("Failed to submit testimonial");
  } catch (err) {
    console.error("Supabase insert testimonial error:", err);
    throw err;
  }
}

/* -------------------- CREATE (ADMIN) -------------------- */

export async function createTestimonial() {
  const newRecord: Testimonial = {
    id: `test-${Date.now()}`,
    client_name: "New Client",
    designation: "",
    company: "",
    photo: null,
    message: "",
    sort_order: 999,
    is_active: true,
    status: "approved",
    created_at: new Date().toISOString(),
  };

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("testimonials").insert({
      client_name: "New Client",
      designation: "",
      company: "",
      photo: null,
      message: "",
      sort_order: 999,
      is_active: true,
      status: "approved",
    });

    if (error) {
      console.error(error);
      throw error;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/* -------------------- UPDATE -------------------- */

export async function updateTestimonial(
  id: string,
  updates: Partial<Testimonial>
) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("testimonials")
      .update(updates)
      .eq("id", id);

    if (error) {
      console.error(error);
      throw error;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/* -------------------- DELETE -------------------- */

export async function deleteTestimonial(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) {
      console.error(error);
      throw error;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}