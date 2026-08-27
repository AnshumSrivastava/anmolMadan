"use client";

import { useState, useTransition } from "react";
import { About } from "@/types/about";
import { updateAboutAction } from "@/actions/about";

import AboutDetails from "./AboutDetails";
import AboutCredentials from "./AboutCredentials";
import AboutAudience from "./AboutAudience";
import AboutPreview from "./AboutPreview";
import AboutImageUpload from "./AboutImageUpload";

type Props = {
  about: About;
};

export default function AboutForm({ about }: Props) {
  const [formData, setFormData] = useState<About>(about);

  const [isPending, startTransition] = useTransition();

  /* =========================================================
     HANDLE TEXT INPUT CHANGES
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     HANDLE ABOUT CONTENT SAVE
  ========================================================= */

  const handleSubmit = () => {
    startTransition(async () => {
      const result = await updateAboutAction(formData);

      if (result.success) {
        alert("About section updated successfully.");
      } else {
        alert(result.message);
      }
    });
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="grid gap-8 lg:grid-cols-3">

      {/* =====================================================
          LEFT — EDITOR
      ===================================================== */}

      <div className="space-y-8 lg:col-span-2">

        {/* ================= IMAGE ================= */}

        <AboutImageUpload
          aboutId={formData.id}
          currentImageUrl={formData.image_url}
          onUploaded={(imageUrl) => {
            setFormData((prev) => ({
              ...prev,
              image_url: imageUrl,
            }));
          }}
        />

        {/* ================= BASIC DETAILS ================= */}

        <AboutDetails
          data={formData}
          onChange={handleChange}
        />

        {/* ================= CREDENTIALS ================= */}

        <AboutCredentials
          data={formData}
          onChange={handleChange}
        />

        {/* ================= AUDIENCE ================= */}

        <AboutAudience
          data={formData}
          onChange={handleChange}
        />

        {/* ================= SAVE ================= */}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="
            w-full

            rounded-xl

            bg-white

            py-3

            font-semibold

            text-black

            transition

            hover:bg-zinc-200

            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* =====================================================
          RIGHT — LIVE PREVIEW
      ===================================================== */}

      <div className="h-fit lg:sticky lg:top-24">
        <AboutPreview data={formData} />
      </div>
    </div>
  );
}