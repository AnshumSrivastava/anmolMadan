import { createClient } from "@/lib/supabase/server";
import { Project } from "@/types/project";

/* =====================================================
   GET ALL PROJECTS
===================================================== */

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("featured", {
      ascending: false,
    })
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}

/* =====================================================
   GET FEATURED PROJECTS
===================================================== */

export async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}

/* =====================================================
   GET PROJECT BY ID
===================================================== */

export async function getProjectById(
  id: string
): Promise<Project | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data;
}

/* =====================================================
   GET PROJECT BY SLUG
===================================================== */

export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return null;
  }

  return data;
}