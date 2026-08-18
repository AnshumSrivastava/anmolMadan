"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/* =====================================================
   CREATE COMPANY
===================================================== */

export async function createCompany(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("companies")
    .insert({
      company_name: formData.get("company_name"),
      role: formData.get("role"),
      description: formData.get("description"),
      website: formData.get("website"),
      start_date: formData.get("start_date"),
      end_date: formData.get("end_date") || null,
      current_company:
        formData.get("current_company") === "true",
      sort_order: Number(formData.get("sort_order")),
    });

  if (error) {
    throw error;
  }

  revalidatePath("/dashboard/companies");
}

/* =====================================================
   UPDATE COMPANY
===================================================== */

export async function updateCompany(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id") as string;

  const updates = {
    company_name: formData.get("company_name"),
    role: formData.get("role"),
    description: formData.get("description"),
    website: formData.get("website"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date") || null,
    current_company:
      formData.get("current_company") === "true",
    sort_order: Number(formData.get("sort_order")),
  };

  const { error } = await supabase
    .from("companies")
    .update(updates)
    .eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath("/dashboard/companies");
}

/* =====================================================
   DELETE COMPANY
===================================================== */

export async function deleteCompany(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("companies")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath("/dashboard/companies");
}