"use client";

import { useState } from "react";

import { Hero } from "@/types/hero";
import { updateHero } from "@/actions/hero";
import { createClient } from "@/lib/supabase/client";

import HeroDetails from "./HeroDetails";
import HeroImageUpload from "./HeroImageUpload";
import HeroPreview from "./HeroPreview";

type Props = {
  hero: Hero;
};

export default function HeroForm({ hero }: Props) {
  const [form, setForm] = useState<Hero>({
    ...hero,

    pre_heading: hero.pre_heading ?? "",
    title_line_1: hero.title_line_1 ?? "",
    description: hero.description ?? "",

    stat_1_number: hero.stat_1_number ?? "",
    stat_1_label: hero.stat_1_label ?? "",

    stat_2_number: hero.stat_2_number ?? "",
    stat_2_label: hero.stat_2_label ?? "",

    stat_3_number: hero.stat_3_number ?? "",
    stat_3_label: hero.stat_3_label ?? "",

    stat_4_number: hero.stat_4_number ?? "",
    stat_4_label: hero.stat_4_label ?? "",

    hero_image: hero.hero_image ?? null,
  });

  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState<string | null>(
    hero.hero_image ?? null
  );

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("id", form.id);

      formData.append("pre_heading", form.pre_heading);
      formData.append("title_line_1", form.title_line_1);
      formData.append("description", form.description);

      formData.append("stat_1_number", form.stat_1_number);
      formData.append("stat_1_label", form.stat_1_label);

      formData.append("stat_2_number", form.stat_2_number);
      formData.append("stat_2_label", form.stat_2_label);

      formData.append("stat_3_number", form.stat_3_number);
      formData.append("stat_3_label", form.stat_3_label);

      formData.append("stat_4_number", form.stat_4_number);
      formData.append("stat_4_label", form.stat_4_label);

      const supabase = createClient();

      let heroImage = form.hero_image;

      if (image) {
        const extension = image.name.split(".").pop();
        const fileName = `hero-${Date.now()}.${extension}`;

        const { error } = await supabase.storage
          .from("hero")
          .upload(fileName, image, {
            upsert: true,
          });

        if (error) throw error;

        heroImage = supabase.storage
          .from("hero")
          .getPublicUrl(fileName).data.publicUrl;
      }

      formData.append("hero_image", heroImage ?? "");

      await updateHero(formData);

      alert("Hero updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update hero.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-8 xl:grid-cols-2"
    >
      <div className="space-y-8">
        <HeroDetails
          form={form}
          onChange={handleChange}
        />

        <HeroImageUpload
          preview={preview}
          setPreview={setPreview}
          setImage={setImage}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-white py-4 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <HeroPreview
        form={form}
        preview={preview}
      />
    </form>
  );
}