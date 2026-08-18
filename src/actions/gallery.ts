"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/* =====================================================
   CREATE
===================================================== */

export async function createGallery(formData: FormData) {
  const supabase = await createClient();

  const caption = formData.get("caption") as string;
  const sort_order = Number(formData.get("sort_order") || 0);

  const file = formData.get("image") as File;

  if (!file || file.size === 0) {
    throw new Error("Image is required.");
  }

  const extension = file.name.split(".").pop();

  const fileName = `gallery-${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(fileName, file, {
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("gallery")
    .getPublicUrl(fileName);

  const { error } = await supabase.from("gallery").insert({
    image: publicUrl,
    caption,
    sort_order,
  });

  if (error) throw error;

  revalidatePath("/dashboard/gallery");
  revalidatePath("/");
}

/* =====================================================
   UPDATE
===================================================== */

export async function updateGallery(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id") as string;

  const caption = formData.get("caption") as string;

  const sort_order = Number(formData.get("sort_order") || 0);

  const file = formData.get("image") as File | null;

  const updateData: {
    caption: string;
    sort_order: number;
    image?: string;
  } = {
    caption,
    sort_order,
  };

  if (file && file.size > 0) {
    const extension = file.name.split(".").pop();

    const fileName = `gallery-${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file, {
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    updateData.image = publicUrl;
  }

  const { error } = await supabase
    .from("gallery")
    .update(updateData)
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/dashboard/gallery");
  revalidatePath("/");
}

/* =====================================================
   DELETE
===================================================== */

export async function deleteGallery(id: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("gallery")
    .select("image")
    .eq("id", id)
    .single();

  if (data?.image) {
    const path = data.image.split("/gallery/")[1];

    if (path) {
      await supabase.storage
        .from("gallery")
        .remove([path]);
    }
  }

  const { error } = await supabase
    .from("gallery")
    .delete()
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/dashboard/gallery");
  revalidatePath("/");
}