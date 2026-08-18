import { createClient } from "@/lib/supabase/server";
import { ServiceItem, ServiceSection } from "@/types/service";

export async function getServicesSection(): Promise<ServiceSection | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .single();

  if (error) {
    console.error(
      "Failed to fetch services:",
      error.message,
      error.details,
      error.hint,
      error.code
    );
    return null;
  }

  return data;
}

export async function getServiceItems(): Promise<ServiceItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error(
      "Failed to fetch service items:",
      error.message,
      error.details,
      error.hint,
      error.code
    );
    return [];
  }

  return data ?? [];
}

export async function updateServicesSection(
  data: Partial<ServiceSection> & { id: string }
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("services")
    .update({
      section_heading: data.section_heading,
      main_heading: data.main_heading,
      description: data.description,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.id);

  if (error) throw error;
}

export async function updateServiceItem(
  item: Partial<ServiceItem> & { id: string }
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("service_items")
    .update({
      service_number: item.service_number,
      title: item.title,
      badge: item.badge,
      description: item.description,
      point_1: item.point_1,
      point_2: item.point_2,
      point_3: item.point_3,
      button_text: item.button_text,
      display_order: item.display_order,
      is_active: item.is_active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", item.id);

  if (error) throw error;
}

/* ---------------- CREATE ---------------- */

export async function createServiceItem() {
  const supabase = await createClient();

  // Get parent service
  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("id")
    .single();

  if (serviceError) throw serviceError;

  // Count existing items
  const { count, error: countError } = await supabase
    .from("service_items")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (countError) throw countError;

  const next = (count ?? 0) + 1;

  const { data, error } = await supabase
    .from("service_items")
    .insert({
      service_id: service.id,

      service_number: next,
      display_order: next,

      title: `Service ${next}`,
      badge: "",

      description: "",

      point_1: "",
      point_2: "",
      point_3: "",

      button_text: "Learn More",

      is_active: true,
    })
    .select()
    .single();

  if (error) {
    console.log(error);
    throw error;
  }

  return data;
}

/* ---------------- DELETE ---------------- */

export async function deleteServiceItem(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("service_items")
    .delete()
    .eq("id", id);

  if (error) throw error;
}