import { createClient } from "@/lib/supabase/server";
import { Company } from "@/types/company";

/* =====================================================
   GET ALL COMPANIES
===================================================== */

export async function getCompanies(): Promise<Company[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}

/* =====================================================
   GET COMPANY BY ID
===================================================== */

export async function getCompanyById(
  id: string
): Promise<Company | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data;
}