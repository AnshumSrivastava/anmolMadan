"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { updateVision } from "@/services/vision/vision.service";
import { Vision } from "@/types/vision";

/* =========================================================
   UPDATE VISION CONTENT
========================================================= */

export async function updateVisionAction(
  data: Vision
) {
  try {
    await updateVision(data);

    revalidatePath("/dashboard/vision");
    revalidatePath("/");

    return {
      success: true,
      message: "Vision section updated successfully.",
    };
  } catch (error) {
    console.error(
      "Failed to update Vision:",
      error
    );

    return {
      success: false,
      message: "Failed to update Vision section.",
    };
  }
}

/* =========================================================
   UPLOAD / REPLACE VISION IMAGE
========================================================= */

export async function uploadVisionImageAction(
  formData: FormData
) {
  const supabase = await createClient();

  try {
    /* =======================================================
       1. AUTHENTICATION
    ======================================================= */

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message:
          "You must be logged in to upload an image.",
      };
    }

    /* =======================================================
       2. FORM DATA
    ======================================================= */

    const file = formData.get("file");
    const visionId = formData.get("visionId");
    const oldImageUrl =
      formData.get("oldImageUrl");

    if (!(file instanceof File)) {
      return {
        success: false,
        message: "No image was selected.",
      };
    }

    if (
      typeof visionId !== "string" ||
      !visionId
    ) {
      return {
        success: false,
        message: "Vision ID is missing.",
      };
    }

    /* =======================================================
       3. VALIDATE FILE TYPE
    ======================================================= */

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        message:
          "Only JPG, PNG, WebP or AVIF images are allowed.",
      };
    }

    /* =======================================================
       4. VALIDATE FILE SIZE
       10 MB
    ======================================================= */

    const MAX_SIZE =
      10 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      return {
        success: false,
        message:
          "Image must be smaller than 10 MB.",
      };
    }

    /* =======================================================
       5. CREATE UNIQUE FILE NAME
    ======================================================= */

    const extension =
      file.name
        .split(".")
        .pop()
        ?.toLowerCase() || "webp";

    const fileName =
      `vision-${crypto.randomUUID()}.${extension}`;

    const filePath = fileName;

    /* =======================================================
       6. UPLOAD TO SUPABASE STORAGE
    ======================================================= */

    const {
      error: uploadError,
    } = await supabase.storage
      .from("vision")
      .upload(
        filePath,
        file,
        {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        }
      );

    if (uploadError) {
      console.error(
        "Vision image upload failed:",
        uploadError
      );

      return {
        success: false,
        message:
          `Image upload failed: ${uploadError.message}`,
      };
    }

    /* =======================================================
       7. GET PUBLIC URL
    ======================================================= */

    const {
      data: publicData,
    } = supabase.storage
      .from("vision")
      .getPublicUrl(filePath);

    const publicUrl =
      publicData.publicUrl;

    if (!publicUrl) {
      /* Rollback upload */

      await supabase.storage
        .from("vision")
        .remove([filePath]);

      return {
        success: false,
        message:
          "Could not generate image URL.",
      };
    }

    /* =======================================================
       8. UPDATE DATABASE
    ======================================================= */

    const {
      error: databaseError,
    } = await supabase
      .from("vision")
      .update({
        image_url: publicUrl,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", visionId);

    if (databaseError) {
      console.error(
        "Failed to update Vision image URL:",
        databaseError
      );

      /* Rollback uploaded image */

      await supabase.storage
        .from("vision")
        .remove([filePath]);

      return {
        success: false,
        message:
          "Image uploaded but database update failed.",
      };
    }

    /* =======================================================
       9. DELETE OLD IMAGE
    ======================================================= */

    if (
      typeof oldImageUrl === "string" &&
      oldImageUrl.trim()
    ) {
      try {
        const marker = "/vision/";

        const index =
          oldImageUrl.indexOf(marker);

        if (index !== -1) {
          const oldFilePath =
            decodeURIComponent(
              oldImageUrl.substring(
                index + marker.length
              )
            );

          if (
            oldFilePath &&
            oldFilePath !== filePath
          ) {
            const {
              error: deleteError,
            } = await supabase.storage
              .from("vision")
              .remove([
                oldFilePath,
              ]);

            if (deleteError) {
              console.warn(
                "Old Vision image could not be deleted:",
                deleteError
              );
            }
          }
        }
      } catch (deleteError) {
        console.warn(
          "Failed to remove old Vision image:",
          deleteError
        );
      }
    }

    /* =======================================================
       10. REVALIDATE
    ======================================================= */

    revalidatePath(
      "/dashboard/vision"
    );

    revalidatePath("/");

    /* =======================================================
       SUCCESS
    ======================================================= */

    return {
      success: true,
      message:
        "Vision image uploaded successfully.",
      imageUrl: publicUrl,
    };
  } catch (error) {
    console.error(
      "Unexpected Vision image upload error:",
      error
    );

    return {
      success: false,
      message:
        "Something went wrong while uploading the image.",
    };
  }
}