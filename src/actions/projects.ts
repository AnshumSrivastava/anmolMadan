"use server";

import { revalidatePath } from "next/cache";

import {
  saveProject,
  deleteProject,
  uploadProjectLogo,
  uploadProjectImage,
  uploadProjectGalleryImage,
  type ProjectInput,
} from "@/services/projects/project.service";

/* =========================================================
   TYPES
========================================================= */

type ImageSource =
  | "upload"
  | "link"
  | "none";

type ImageMeta = {
  source: ImageSource;
  url?: string;
};

type TestimonialMeta = {
  quote: string;
  author_name: string;
  author_role: string;
};

/* =========================================================
   SAVE EXPERIENCE
========================================================= */

export async function saveProjectAction(
  formData: FormData
) {
  try {
    /* =======================================================
       BASIC INFORMATION
    ======================================================= */

    const id =
      String(
        formData.get("id") ?? ""
      ).trim() || undefined;

    const lesson_title =
      String(
        formData.get(
          "lesson_title"
        ) ?? ""
      ).trim();

    const description =
      String(
        formData.get(
          "description"
        ) ?? ""
      ).trim();

    const institution_name =
      String(
        formData.get(
          "institution_name"
        ) ?? ""
      ).trim();

    const duration =
      String(
        formData.get(
          "duration"
        ) ?? ""
      ).trim();

    const sort_order =
      Number(
        formData.get(
          "sort_order"
        ) ?? 0
      ) || 0;

    /* =======================================================
       VALIDATION
    ======================================================= */

    if (
      !lesson_title ||
      !description ||
      !institution_name
    ) {
      return {
        success: false,
        message:
          "Please fill all required experience details.",
        project: null,
      };
    }

    /* =======================================================
       INSTITUTION LOGO
    ======================================================= */

    const logoSource =
      String(
        formData.get(
          "institution_logo_source"
        ) ?? "none"
      ) as ImageSource;

    const logoUrl =
      String(
        formData.get(
          "institution_logo_url"
        ) ?? ""
      ).trim();

    const logoFile =
      formData.get(
        "institution_logo_file"
      );

    let institution_logo_url:
      | string
      | null = null;

    /* -------------------------------------------------------
       LINK
    ------------------------------------------------------- */

    if (
      logoSource === "link"
    ) {
      institution_logo_url =
        logoUrl || null;
    }

    /* -------------------------------------------------------
       UPLOAD
    ------------------------------------------------------- */

    if (
      logoSource === "upload"
    ) {
      if (
        !(logoFile instanceof File) ||
        logoFile.size <= 0
      ) {
        throw new Error(
          "Please select an institution logo."
        );
      }

      institution_logo_url =
        await uploadProjectLogo(
          logoFile
        );
    }

    /* -------------------------------------------------------
       NONE
    ------------------------------------------------------- */

    if (
      logoSource === "none"
    ) {
      institution_logo_url =
        null;
    }

    /* =======================================================
       MAIN EXPERIENCE IMAGE
    ======================================================= */

    const imageSource =
      String(
        formData.get(
          "image_source"
        ) ?? "none"
      ) as ImageSource;

    const imageUrl =
      String(
        formData.get(
          "image_url"
        ) ?? ""
      ).trim();

    const imageFile =
      formData.get(
        "image_file"
      );

    let image_url:
      | string
      | null = null;

    /* -------------------------------------------------------
       LINK
    ------------------------------------------------------- */

    if (
      imageSource === "link"
    ) {
      image_url =
        imageUrl || null;
    }

    /* -------------------------------------------------------
       UPLOAD
    ------------------------------------------------------- */

    if (
      imageSource === "upload"
    ) {
      if (
        !(imageFile instanceof File) ||
        imageFile.size <= 0
      ) {
        throw new Error(
          "Please select a main experience image."
        );
      }

      image_url =
        await uploadProjectImage(
          imageFile
        );
    }

    /* -------------------------------------------------------
       NONE
    ------------------------------------------------------- */

    if (
      imageSource === "none"
    ) {
      image_url =
        null;
    }

    /* =======================================================
       GALLERY
    ======================================================= */

    const galleryRaw =
      String(
        formData.get(
          "gallery"
        ) ?? "[]"
      );

    let galleryMeta:
      ImageMeta[] = [];

    try {
      galleryMeta =
        JSON.parse(
          galleryRaw
        ) as ImageMeta[];

      if (
        !Array.isArray(
          galleryMeta
        )
      ) {
        throw new Error();
      }
    } catch {
      throw new Error(
        "Gallery data is invalid."
      );
    }

    const images:
      ProjectInput["images"] =
      [];

    /* -------------------------------------------------------
       PROCESS GALLERY ITEMS
    ------------------------------------------------------- */

    for (
      let index = 0;
      index <
      galleryMeta.length;
      index++
    ) {
      const item =
        galleryMeta[index];

      if (!item) {
        continue;
      }

      /* ---------------------------------------------------
         LINK
      --------------------------------------------------- */

      if (
        item.source === "link"
      ) {
        const url =
          item.url?.trim();

        if (url) {
          images.push({
            image_url:
              url,
            sort_order:
              images.length,
          });
        }

        continue;
      }

      /* ---------------------------------------------------
         UPLOAD
      --------------------------------------------------- */

      if (
        item.source === "upload"
      ) {
        const file =
          formData.get(
            `gallery_file_${index}`
          );

        if (
          file instanceof File &&
          file.size > 0
        ) {
          const url =
            await uploadProjectGalleryImage(
              file
            );

          images.push({
            image_url:
              url,
            sort_order:
              images.length,
          });
        }

        continue;
      }

      /* ---------------------------------------------------
         NONE
      --------------------------------------------------- */

      if (
        item.source === "none"
      ) {
        continue;
      }
    }

    /* =======================================================
       TESTIMONIALS
    ======================================================= */

    const testimonialsRaw =
      String(
        formData.get(
          "testimonials"
        ) ?? "[]"
      );

    let testimonialsMeta:
      TestimonialMeta[] =
      [];

    try {
      testimonialsMeta =
        JSON.parse(
          testimonialsRaw
        ) as TestimonialMeta[];

      if (
        !Array.isArray(
          testimonialsMeta
        )
      ) {
        throw new Error();
      }
    } catch {
      throw new Error(
        "Testimonials data is invalid."
      );
    }

    const testimonials:
      ProjectInput["testimonials"] =
      testimonialsMeta
        .map(
          (
            item,
            index
          ) => ({
            quote:
              String(
                item?.quote ??
                ""
              ).trim(),

            author_name:
              String(
                item?.author_name ??
                ""
              ).trim() ||
              null,

            author_role:
              String(
                item?.author_role ??
                ""
              ).trim() ||
              null,

            sort_order:
              index,
          })
        )
        .filter(
          (
            item
          ) =>
            item.quote.length >
            0
        );

    /* =======================================================
       SAVE TO DATABASE
    ======================================================= */

    const project =
      await saveProject({
        id,

        lesson_title,

        description,

        institution_name,

        duration,

        image_url,

        institution_logo_url,

        sort_order,

        images,

        testimonials,
      });

    /* =======================================================
       REVALIDATE
    ======================================================= */

    revalidatePath(
      "/dashboard/projects"
    );

    revalidatePath(
      "/"
    );

    return {
      success: true,

      message:
        "Experience saved successfully.",

      project,
    };
  } catch (error) {
    console.error(
      "===================================="
    );

    console.error(
      "FAILED TO SAVE EXPERIENCE"
    );

    console.error(
      "ERROR:",
      error
    );

    console.error(
      "MESSAGE:",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );

    console.error(
      "===================================="
    );

    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Failed to save experience.",

      project: null,
    };
  }
}

/* =========================================================
   DELETE EXPERIENCE
========================================================= */

export async function deleteProjectAction(
  id: string
) {
  try {
    if (
      !id?.trim()
    ) {
      return {
        success: false,

        message:
          "Experience ID is required.",
      };
    }

    await deleteProject(
      id.trim()
    );

    revalidatePath(
      "/dashboard/projects"
    );

    revalidatePath(
      "/"
    );

    return {
      success: true,

      message:
        "Experience deleted successfully.",
    };
  } catch (error) {
    console.error(
      "FAILED TO DELETE EXPERIENCE:",
      error
    );

    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Failed to delete experience.",
    };
  }
}