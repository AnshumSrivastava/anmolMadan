"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/* =====================================================
   CREATE PROJECT
===================================================== */

export async function createProject(
  formData: FormData
) {
  const supabase = await createClient();

  const projectData = {
    title: formData.get("title") as string,

    slug: formData.get("slug") as string,

    category: formData.get("category") as string,

    year: Number(formData.get("year")),

    description:
      formData.get("description") as string,

    github:
      (formData.get("github") as string) || null,

    live_link:
      (formData.get("live_link") as string) || null,

    featured:
      formData.get("featured") === "on",

    sort_order: Number(
      formData.get("sort_order")
    ),
  };

  const { error } = await supabase
    .from("projects")
    .insert(projectData);

  if (error) {
    throw error;
  }

  revalidatePath("/dashboard/projects");
}

/* =====================================================
   UPDATE PROJECT
===================================================== */

export async function updateProject(
  formData: FormData
) {
  const supabase = await createClient();

  const id = formData.get("id") as string;

  const projectData = {
    title: formData.get("title") as string,

    slug: formData.get("slug") as string,

    category: formData.get("category") as string,

    year: Number(formData.get("year")),

    description:
      formData.get("description") as string,

    github:
      (formData.get("github") as string) || null,

    live_link:
      (formData.get("live_link") as string) || null,

    featured:
      formData.get("featured") === "on",

    sort_order: Number(
      formData.get("sort_order")
    ),

    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("projects")
    .update(projectData)
    .eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath("/dashboard/projects");
}

/* =====================================================
   DELETE PROJECT
===================================================== */

export async function deleteProject(
  id: string
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath("/dashboard/projects");
}