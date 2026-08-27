"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/* =====================================================
   YOUTUBE URL VALIDATION
===================================================== */

function isValidYouTubeUrl(url: string) {
  try {
    const parsed = new URL(url);

    return (
      parsed.hostname === "youtube.com" ||
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "youtu.be" ||
      parsed.hostname === "www.youtube-nocookie.com"
    );
  } catch {
    return false;
  }
}

/* =====================================================
   CREATE GALLERY VIDEO
===================================================== */

export async function createGallery(formData: FormData) {
  const supabase = await createClient();

  const video = String(
    formData.get("video") || ""
  ).trim();

  const caption = String(
    formData.get("caption") || ""
  ).trim();

  const sort_order = Number(
    formData.get("sort_order") || 0
  );

  /* -----------------------------------------------------
     VALIDATION
  ----------------------------------------------------- */

  if (!video) {
    throw new Error("YouTube video URL is required.");
  }

  if (!isValidYouTubeUrl(video)) {
    throw new Error(
      "Please enter a valid YouTube URL."
    );
  }

  /* -----------------------------------------------------
     INSERT
  ----------------------------------------------------- */

  const { error } = await supabase
    .from("gallery")
    .insert({
      video,
      caption: caption || null,
      sort_order,
    });

  if (error) {
    console.error(
      "FAILED TO CREATE GALLERY VIDEO:",
      error
    );

    throw error;
  }

  /* -----------------------------------------------------
     REVALIDATE
  ----------------------------------------------------- */

  revalidatePath("/dashboard/gallery");
  revalidatePath("/");
}


/* =====================================================
   UPDATE GALLERY VIDEO
===================================================== */

export async function updateGallery(
  formData: FormData
) {
  const supabase = await createClient();

  const id = String(
    formData.get("id") || ""
  ).trim();

  const video = String(
    formData.get("video") || ""
  ).trim();

  const caption = String(
    formData.get("caption") || ""
  ).trim();

  const sort_order = Number(
    formData.get("sort_order") || 0
  );

  /* -----------------------------------------------------
     VALIDATION
  ----------------------------------------------------- */

  if (!id) {
    throw new Error("Gallery ID is required.");
  }

  if (!video) {
    throw new Error("YouTube video URL is required.");
  }

  if (!isValidYouTubeUrl(video)) {
    throw new Error(
      "Please enter a valid YouTube URL."
    );
  }

  /* -----------------------------------------------------
     UPDATE
  ----------------------------------------------------- */

  const { error } = await supabase
    .from("gallery")
    .update({
      video,
      caption: caption || null,
      sort_order,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error(
      "FAILED TO UPDATE GALLERY VIDEO:",
      error
    );

    throw error;
  }

  /* -----------------------------------------------------
     REVALIDATE
  ----------------------------------------------------- */

  revalidatePath("/dashboard/gallery");
  revalidatePath("/");
}


/* =====================================================
   DELETE GALLERY VIDEO
===================================================== */

export async function deleteGallery(
  id: string
) {
  const supabase = await createClient();

  if (!id?.trim()) {
    throw new Error(
      "Gallery ID is required."
    );
  }

  /* -----------------------------------------------------
     DELETE DATABASE ROW
     
     No storage deletion is needed because
     we are storing YouTube URLs, not uploaded files.
  ----------------------------------------------------- */

  const { error } = await supabase
    .from("gallery")
    .delete()
    .eq("id", id.trim());

  if (error) {
    console.error(
      "FAILED TO DELETE GALLERY VIDEO:",
      error
    );

    throw error;
  }

  /* -----------------------------------------------------
     REVALIDATE
  ----------------------------------------------------- */

  revalidatePath("/dashboard/gallery");
  revalidatePath("/");
}