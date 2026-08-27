import { createClient } from "@/lib/supabase/server";

/* =========================================================
   TYPES
========================================================= */

export type ProjectImageInput = {
  id?: string;
  image_url: string;
  sort_order: number;
};

export type ProjectTestimonialInput = {
  id?: string;
  quote: string;
  author_name: string | null;
  author_role: string | null;
  sort_order: number;
};

export type ProjectInput = {
  id?: string;

  lesson_title: string;
  description: string;
  institution_name: string;

  duration: string;

  image_url: string | null;
  institution_logo_url: string | null;

  sort_order: number;

  images: ProjectImageInput[];

  testimonials: ProjectTestimonialInput[];
};

/* =========================================================
   STORAGE BUCKETS
========================================================= */

/*
 * IMPORTANT
 *
 * These MUST match your Supabase Storage buckets.
 *
 * Supabase currently has:
 *
 * experience-logos
 * experience-gallery
 *
 * Main experience images + gallery images both go into
 * experience-gallery, but different folders are used.
 */

const LOGO_BUCKET = "experience-logos";
const IMAGE_BUCKET = "experience-gallery";

/* =========================================================
   STORAGE UPLOAD HELPER
========================================================= */

async function uploadFile(
  file: File,
  bucket: string,
  folder: string
): Promise<string> {
  if (!(file instanceof File) || file.size <= 0) {
    throw new Error("Invalid image file.");
  }

  const supabase = await createClient();

  /* -------------------------------------------------------
     FILE EXTENSION
  ------------------------------------------------------- */

  const extension =
    file.name
      .split(".")
      .pop()
      ?.toLowerCase() || "jpg";

  /* -------------------------------------------------------
     SAFE ORIGINAL NAME
  ------------------------------------------------------- */

  const safeName =
    file.name
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .replace(/\.{2,}/g, ".");

  /* -------------------------------------------------------
     UNIQUE FILE NAME
  ------------------------------------------------------- */

  const fileName =
    `${Date.now()}-${crypto.randomUUID()}-${safeName || `image.${extension}`}`;

  const filePath =
    `${folder}/${fileName}`;

  /* -------------------------------------------------------
     FILE → BUFFER
  ------------------------------------------------------- */

  const arrayBuffer =
    await file.arrayBuffer();

  const buffer =
    new Uint8Array(arrayBuffer);

  /* -------------------------------------------------------
     UPLOAD
  ------------------------------------------------------- */

  const {
    error,
  } = await supabase.storage
    .from(bucket)
    .upload(
      filePath,
      buffer,
      {
        contentType:
          file.type || "image/jpeg",

        cacheControl:
          "3600",

        upsert:
          false,
      }
    );

  if (error) {
    console.error(
      "===================================="
    );

    console.error(
      "SUPABASE STORAGE UPLOAD FAILED"
    );

    console.error(
      "BUCKET:",
      bucket
    );

    console.error(
      "PATH:",
      filePath
    );

    console.error(
      "ERROR:",
      error
    );

    console.error(
      "===================================="
    );

    throw new Error(
      `Image upload failed: ${error.message}`
    );
  }

  /* -------------------------------------------------------
     PUBLIC URL
  ------------------------------------------------------- */

  const {
    data,
  } = supabase.storage
    .from(bucket)
    .getPublicUrl(
      filePath
    );

  if (!data?.publicUrl) {
    throw new Error(
      "Failed to generate public image URL."
    );
  }

  return data.publicUrl;
}

/* =========================================================
   UPLOAD INSTITUTION LOGO
========================================================= */

export async function uploadProjectLogo(
  file: File
): Promise<string> {
  return uploadFile(
    file,
    LOGO_BUCKET,
    "logos"
  );
}

/* =========================================================
   UPLOAD MAIN EXPERIENCE IMAGE
========================================================= */

export async function uploadProjectImage(
  file: File
): Promise<string> {
  return uploadFile(
    file,
    IMAGE_BUCKET,
    "experiences"
  );
}

/* =========================================================
   UPLOAD GALLERY IMAGE
========================================================= */

export async function uploadProjectGalleryImage(
  file: File
): Promise<string> {
  return uploadFile(
    file,
    IMAGE_BUCKET,
    "gallery"
  );
}

/* =========================================================
   GET ALL EXPERIENCES
========================================================= */

export async function getProjects() {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } = await supabase
    .from("experiences")
    .select(`
      *,
      images:experience_images(
        id,
        experience_id,
        image_url,
        sort_order
      ),
      testimonials:experience_testimonials(
        id,
        experience_id,
        quote,
        author_name,
        author_role,
        sort_order,
        created_at,
        updated_at
      )
    `)
    .order(
      "sort_order",
      {
        ascending: true,
      }
    );

  if (error) {
    console.error(
      "===================================="
    );

    console.error(
      "FAILED TO FETCH EXPERIENCES"
    );

    console.error(
      "CODE:",
      error.code
    );

    console.error(
      "MESSAGE:",
      error.message
    );

    console.error(
      "DETAILS:",
      error.details
    );

    console.error(
      "HINT:",
      error.hint
    );

    console.error(
      "===================================="
    );

    return [];
  }

  return data ?? [];
}

/* =========================================================
   GET SINGLE EXPERIENCE
========================================================= */

export async function getProject(
  id: string
) {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } = await supabase
    .from("experiences")
    .select(`
      *,
      images:experience_images(
        id,
        experience_id,
        image_url,
        sort_order
      ),
      testimonials:experience_testimonials(
        id,
        experience_id,
        quote,
        author_name,
        author_role,
        sort_order,
        created_at,
        updated_at
      )
    `)
    .eq(
      "id",
      id
    )
    .single();

  if (error) {
    console.error(
      "FAILED TO FETCH EXPERIENCE:",
      error
    );

    return null;
  }

  return data;
}

/* =========================================================
   SAVE EXPERIENCE
========================================================= */

export async function saveProject(
  input: ProjectInput
) {
  const supabase =
    await createClient();

  /* =======================================================
     NORMALIZE MAIN DATA
  ======================================================= */

  const lesson_title =
    input.lesson_title
      ?.trim() || "";

  const description =
    input.description
      ?.trim() || "";

  const institution_name =
    input.institution_name
      ?.trim() || "";

  const duration =
    input.duration
      ?.trim() || "";

  const image_url =
    input.image_url
      ?.trim() || null;

  const institution_logo_url =
    input.institution_logo_url
      ?.trim() || null;

  const sort_order =
    Number.isFinite(
      input.sort_order
    )
      ? input.sort_order
      : 0;

  /* =======================================================
     CLEAN GALLERY
  ======================================================= */

  const images =
    (input.images ?? [])
      .map(
        (
          image,
          index
        ) => ({
          image_url:
            image.image_url
              ?.trim() || "",

          sort_order:
            index,
        })
      )
      .filter(
        (image) =>
          image.image_url.length > 0
      );

  /* =======================================================
     CLEAN TESTIMONIALS
  ======================================================= */

  const testimonials =
    (input.testimonials ?? [])
      .map(
        (
          testimonial,
          index
        ) => ({
          quote:
            testimonial.quote
              ?.trim() || "",

          author_name:
            testimonial.author_name
              ?.trim() || null,

          author_role:
            testimonial.author_role
              ?.trim() || null,

          sort_order:
            index,
        })
      )
      .filter(
        (testimonial) =>
          testimonial.quote.length > 0
      );

  /* =======================================================
     UPDATE EXISTING EXPERIENCE
  ======================================================= */

  if (input.id) {
    /* -------------------------------------------------------
       UPDATE MAIN EXPERIENCE
    ------------------------------------------------------- */

    const {
      data: experience,
      error:
        experienceError,
    } = await supabase
      .from("experiences")
      .update({
        lesson_title,
        description,
        institution_name,
        duration,
        image_url,
        institution_logo_url,
        sort_order,
      })
      .eq(
        "id",
        input.id
      )
      .select()
      .single();

    if (experienceError) {
      console.error(
        "FAILED TO UPDATE EXPERIENCE:",
        experienceError
      );

      throw experienceError;
    }

    /* -------------------------------------------------------
       DELETE OLD GALLERY
    ------------------------------------------------------- */

    const {
      error:
        deleteImagesError,
    } = await supabase
      .from(
        "experience_images"
      )
      .delete()
      .eq(
        "experience_id",
        input.id
      );

    if (deleteImagesError) {
      console.error(
        "FAILED TO DELETE OLD IMAGES:",
        deleteImagesError
      );

      throw deleteImagesError;
    }

    /* -------------------------------------------------------
       INSERT NEW GALLERY
    ------------------------------------------------------- */

    if (images.length > 0) {
      const imageRows =
        images.map(
          (
            image,
            index
          ) => ({
            experience_id:
              input.id,

            image_url:
              image.image_url,

            sort_order:
              index,
          })
        );

      const {
        error:
          imagesError,
      } = await supabase
        .from(
          "experience_images"
        )
        .insert(
          imageRows
        );

      if (imagesError) {
        console.error(
          "FAILED TO SAVE EXPERIENCE IMAGES:",
          imagesError
        );

        throw imagesError;
      }
    }

    /* -------------------------------------------------------
       DELETE OLD TESTIMONIALS
    ------------------------------------------------------- */

    const {
      error:
        deleteTestimonialsError,
    } = await supabase
      .from(
        "experience_testimonials"
      )
      .delete()
      .eq(
        "experience_id",
        input.id
      );

    if (deleteTestimonialsError) {
      console.error(
        "FAILED TO DELETE OLD TESTIMONIALS:",
        deleteTestimonialsError
      );

      throw deleteTestimonialsError;
    }

    /* -------------------------------------------------------
       INSERT NEW TESTIMONIALS
    ------------------------------------------------------- */

    if (
      testimonials.length > 0
    ) {
      const testimonialRows =
        testimonials.map(
          (
            testimonial,
            index
          ) => ({
            experience_id:
              input.id,

            quote:
              testimonial.quote,

            author_name:
              testimonial.author_name,

            author_role:
              testimonial.author_role,

            sort_order:
              index,
          })
        );

      const {
        error:
          testimonialsError,
      } = await supabase
        .from(
          "experience_testimonials"
        )
        .insert(
          testimonialRows
        );

      if (testimonialsError) {
        console.error(
          "FAILED TO SAVE TESTIMONIALS:",
          testimonialsError
        );

        throw testimonialsError;
      }
    }

    /* -------------------------------------------------------
       RETURN UPDATED EXPERIENCE
    ------------------------------------------------------- */

    return getProject(
      experience.id
    );
  }

  /* =======================================================
     CREATE NEW EXPERIENCE
  ======================================================= */

  const {
    data: experience,
    error:
      experienceError,
  } = await supabase
    .from("experiences")
    .insert({
      lesson_title,
      description,
      institution_name,
      duration,
      image_url,
      institution_logo_url,
      sort_order,
    })
    .select()
    .single();

  if (experienceError) {
    console.error(
      "FAILED TO CREATE EXPERIENCE:",
      experienceError
    );

    throw experienceError;
  }

  const experienceId =
    experience.id;

  /* =======================================================
     CREATE GALLERY
  ======================================================= */

  if (
    images.length > 0
  ) {
    const imageRows =
      images.map(
        (
          image,
          index
        ) => ({
          experience_id:
            experienceId,

          image_url:
            image.image_url,

          sort_order:
            index,
        })
      );

    const {
      error:
        imagesError,
    } = await supabase
      .from(
        "experience_images"
      )
      .insert(
        imageRows
      );

    if (imagesError) {
      console.error(
        "FAILED TO CREATE EXPERIENCE IMAGES:",
        imagesError
      );

      /* ---------------------------------------------------
         CLEANUP EXPERIENCE
      --------------------------------------------------- */

      await supabase
        .from("experiences")
        .delete()
        .eq(
          "id",
          experienceId
        );

      throw imagesError;
    }
  }

  /* =======================================================
     CREATE TESTIMONIALS
  ======================================================= */

  if (
    testimonials.length > 0
  ) {
    const testimonialRows =
      testimonials.map(
        (
          testimonial,
          index
        ) => ({
          experience_id:
            experienceId,

          quote:
            testimonial.quote,

          author_name:
            testimonial.author_name,

          author_role:
            testimonial.author_role,

          sort_order:
            index,
        })
      );

    const {
      error:
        testimonialsError,
    } = await supabase
      .from(
        "experience_testimonials"
      )
      .insert(
        testimonialRows
      );

    if (testimonialsError) {
      console.error(
        "FAILED TO CREATE EXPERIENCE TESTIMONIALS:",
        testimonialsError
      );

      /* ---------------------------------------------------
         CLEANUP GALLERY
      --------------------------------------------------- */

      await supabase
        .from(
          "experience_images"
        )
        .delete()
        .eq(
          "experience_id",
          experienceId
        );

      /* ---------------------------------------------------
         CLEANUP EXPERIENCE
      --------------------------------------------------- */

      await supabase
        .from("experiences")
        .delete()
        .eq(
          "id",
          experienceId
        );

      throw testimonialsError;
    }
  }

  /* =======================================================
     RETURN CREATED EXPERIENCE
  ======================================================= */

  return getProject(
    experienceId
  );
}

/* =========================================================
   DELETE EXPERIENCE
========================================================= */

export async function deleteProject(
  id: string
) {
  const supabase =
    await createClient();

  /* -------------------------------------------------------
     DELETE IMAGES
  ------------------------------------------------------- */

  const {
    error:
      imagesError,
  } = await supabase
    .from(
      "experience_images"
    )
    .delete()
    .eq(
      "experience_id",
      id
    );

  if (imagesError) {
    console.error(
      "FAILED TO DELETE EXPERIENCE IMAGES:",
      imagesError
    );

    throw imagesError;
  }

  /* -------------------------------------------------------
     DELETE TESTIMONIALS
  ------------------------------------------------------- */

  const {
    error:
      testimonialsError,
  } = await supabase
    .from(
      "experience_testimonials"
    )
    .delete()
    .eq(
      "experience_id",
      id
    );

  if (testimonialsError) {
    console.error(
      "FAILED TO DELETE EXPERIENCE TESTIMONIALS:",
      testimonialsError
    );

    throw testimonialsError;
  }

  /* -------------------------------------------------------
     DELETE EXPERIENCE
  ------------------------------------------------------- */

  const {
    error:
      experienceError,
  } = await supabase
    .from("experiences")
    .delete()
    .eq(
      "id",
      id
    );

  if (experienceError) {
    console.error(
      "FAILED TO DELETE EXPERIENCE:",
      experienceError
    );

    throw experienceError;
  }

  return true;
}