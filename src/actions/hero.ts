"use server";

import { revalidatePath } from "next/cache";
import { updateHero as updateHeroService } from "@/services/hero/hero.service";

export async function updateHero(formData: FormData) {
  await updateHeroService({
    id: formData.get("id") as string,

    pre_heading: formData.get("pre_heading") as string,
    title_line_1: formData.get("title_line_1") as string,
    description: formData.get("description") as string,

    stat_1_number: formData.get("stat_1_number") as string,
    stat_1_label: formData.get("stat_1_label") as string,

    stat_2_number: formData.get("stat_2_number") as string,
    stat_2_label: formData.get("stat_2_label") as string,

    stat_3_number: formData.get("stat_3_number") as string,
    stat_3_label: formData.get("stat_3_label") as string,

    stat_4_number: formData.get("stat_4_number") as string,
    stat_4_label: formData.get("stat_4_label") as string,

    hero_image: formData.get("hero_image") as string,
  });

  revalidatePath("/dashboard/hero");
}