"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { updateAbout } from "@/services/about/about.service";
import { About } from "@/types/about";

export async function updateAboutAction(data: About) {
  try {
    await updateAbout(data);

    revalidatePath("/dashboard/about");
    revalidatePath("/");

    return {
      success: true,
      message: "About section updated successfully.",
    };
  } catch (error) {
    console.error("Failed to update About:", error);

    return {
      success: false,
      message: "Failed to update About section.",
    };
  }
}

export async function uploadAboutImageAction(formData: FormData) {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message: "You must be logged in to upload an image.",
      };
    }

    const file = formData.get("file");
    const aboutId = formData.get("aboutId");
    const oldImageUrl = formData.get("oldImageUrl");

    if (!(file instanceof File)) {
      return {
        success: false,
        message: "No image was selected.",
      };
    }

    if (typeof aboutId !== "string" || !aboutId) {
      return {
        success: false,
        message: "About ID is missing.",
      };
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        message: "Only JPG, PNG, WebP or AVIF images are allowed.",
      };
    }

    const MAX_SIZE = 10 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      return {
        success: false,
        message: "Image must be smaller than 10 MB.",
      };
    }

    const extension =
      file.name.split(".").pop()?.toLowerCase() || "webp";

    const fileName = `about-${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("about")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error("About image upload failed:", uploadError);

      return {
        success: false,
        message: `Image upload failed: ${uploadError.message}`,
      };
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("about")
      .getPublicUrl(fileName);

    const { error: databaseError } = await supabase
      .from("about")
      .update({
        image_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", aboutId);

    if (databaseError) {
      console.error(
        "Failed to update About image URL:",
        databaseError
      );

      await supabase.storage
        .from("about")
        .remove([fileName]);

      return {
        success: false,
        message: "Image uploaded but database update failed.",
      };
    }

    if (
      typeof oldImageUrl === "string" &&
      oldImageUrl.trim()
    ) {
      try {
        const marker = "/about/";

        const index = oldImageUrl.indexOf(marker);

        if (index !== -1) {
          const oldFilePath = decodeURIComponent(
            oldImageUrl.substring(index + marker.length)
          );

          if (oldFilePath && oldFilePath !== fileName) {
            await supabase.storage
              .from("about")
              .remove([oldFilePath]);
          }
        }
      } catch (error) {
        console.warn(
          "Failed to remove old About image:",
          error
        );
      }
    }

    revalidatePath("/dashboard/about");
    revalidatePath("/");

    return {
      success: true,
      message: "About image uploaded successfully.",
      imageUrl: publicUrl,
    };
  } catch (error) {
    console.error(
      "Unexpected About image upload error:",
      error
    );

    return {
      success: false,
      message: "Something went wrong while uploading the image.",
    };
  }
}