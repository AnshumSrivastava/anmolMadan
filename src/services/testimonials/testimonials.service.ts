import { createClient } from "@/lib/supabase/server";
import { Testimonial } from "@/types/testimonial";

const initialFallbackTestimonials: Testimonial[] = [
  {
    id: "test-1",
    client_name: "Vikram Sharma",
    designation: "Head of Information Security",
    company: "Apex Global Tech",
    photo: null,
    message:
      "Anmol delivered an unforgettable session on modern social engineering vectors. His presentation style was engaging, energetic, and completely transformed our team's day-to-day security posture.",
    sort_order: 1,
    is_active: true,
    status: "approved",
  },
  {
    id: "test-2",
    client_name: "Dr. Ananya Roy",
    designation: "Associate Dean & Professor",
    company: "Institute of Technology",
    photo: null,
    message:
      "Rarely do you find a speaker who bridges technical depth with such charisma. The students were captivated for two hours straight, and the feedback has been phenomenal.",
    sort_order: 2,
    is_active: true,
    status: "approved",
  },
  {
    id: "test-3",
    client_name: "Rajesh Malhotra",
    designation: "VP, Engineering",
    company: "CloudCore Networks",
    photo: null,
    message:
      "Working with Anmol was seamless. His insights into practical cybersecurity drills gave our enterprise actionable takeaways we implemented immediately.",
    sort_order: 3,
    is_active: true,
    status: "approved",
  },
];

let runtimeTestimonialsStore: Testimonial[] = [...initialFallbackTestimonials];

/* -------------------- GET ALL (ADMIN) -------------------- */

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return [...runtimeTestimonialsStore].sort((a, b) => a.sort_order - b.sort_order);
    }

    return data as Testimonial[];
  } catch {
    return [...runtimeTestimonialsStore].sort((a, b) => a.sort_order - b.sort_order);
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

    if (error || !data || data.length === 0) {
      return runtimeTestimonialsStore
        .filter((t) => t.is_active && (t.status === "approved" || !t.status))
        .sort((a, b) => a.sort_order - b.sort_order);
    }

    return data.filter((t) => t.status === "approved" || !t.status) as Testimonial[];
  } catch {
    return runtimeTestimonialsStore
      .filter((t) => t.is_active && (t.status === "approved" || !t.status))
      .sort((a, b) => a.sort_order - b.sort_order);
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
  } catch (err) {
    console.warn("Supabase insert testimonial fallback to runtime store:", err);
  }

  runtimeTestimonialsStore.push(newRecord);
  return newRecord;
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
      runtimeTestimonialsStore.push(newRecord);
    }
  } catch {
    runtimeTestimonialsStore.push(newRecord);
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
      const target = runtimeTestimonialsStore.find((t) => t.id === id);
      if (target) {
        Object.assign(target, updates);
      }
    }
  } catch {
    const target = runtimeTestimonialsStore.find((t) => t.id === id);
    if (target) {
      Object.assign(target, updates);
    }
  }
}

/* -------------------- DELETE -------------------- */

export async function deleteTestimonial(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) {
      runtimeTestimonialsStore = runtimeTestimonialsStore.filter((t) => t.id !== id);
    }
  } catch {
    runtimeTestimonialsStore = runtimeTestimonialsStore.filter((t) => t.id !== id);
  }
}