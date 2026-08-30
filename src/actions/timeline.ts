"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/* =====================================================
   CREATE TIMELINE
===================================================== */

export async function createTimeline(
  formData: FormData
) {
  const supabase = await createClient();

  const timelineData: Record<string, any> = {
    year: Number(formData.get("year")),
    title: formData.get("title"),
    company: formData.get("company"),
    description: formData.get("description"),
  };

  const imageFile =
    formData.get("image") as File | null;

  if (imageFile && imageFile.size > 0) {
    const extension =
      imageFile.name.split(".").pop();

    const imagePath = `timeline/timeline-${Date.now()}.${extension}`;

    const { error } = await supabase.storage
      .from("timeline")
      .upload(imagePath, imageFile, {
        upsert: true,
      });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
      .from("timeline")
      .getPublicUrl(imagePath);

    timelineData.image = data.publicUrl;
  }

  const { error } = await supabase
    .from("timeline")
    .insert(timelineData);

  if (error) {
    throw error;
  }

  revalidatePath("/dashboard/timeline");
}

/* =====================================================
   UPDATE TIMELINE
===================================================== */

export async function updateTimeline(
  formData: FormData
) {
  const supabase = await createClient();

  const id = formData.get("id") as string;

  const timelineData: Record<string, any> = {
    year: Number(formData.get("year")),
    title: formData.get("title"),
    company: formData.get("company"),
    description: formData.get("description"),
  };
  const imageFile =
    formData.get("image") as File | null;

  if (imageFile && imageFile.size > 0) {
    const extension =
      imageFile.name.split(".").pop();

    const imagePath = `timeline/timeline-${Date.now()}.${extension}`;

    const { error } = await supabase.storage
      .from("timeline")
      .upload(imagePath, imageFile, {
        upsert: true,
      });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
      .from("timeline")
      .getPublicUrl(imagePath);

    timelineData.image = data.publicUrl;
  }

  const { error } = await supabase
    .from("timeline")
    .update(timelineData)
    .eq("id", id);

if (error) {
  console.log("INSERT ERROR:");
  console.log(error);

  throw error;
}
  revalidatePath("/dashboard/timeline");
}

/* =====================================================
   DELETE TIMELINE
===================================================== */

export async function deleteTimeline(
  id: string
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("timeline")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath("/dashboard/timeline");
}