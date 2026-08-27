"use client";

import {
  useState,
  useTransition,
} from "react";

import { Vision } from "@/types/vision";
import { updateVisionAction } from "@/actions/vision";

import VisionDetails from "./VisionDetails";
import VisionUSP from "./VisionUSP";
import VisionImage from "./VisionImage";
import VisionPreview from "./VisionPreview";

type Props = {
  vision: Vision;
};

export default function VisionForm({ vision }: Props) {
  const [formData, setFormData] = useState<Vision>(vision);

  const [isPending, startTransition] = useTransition();

  /* =========================================================
     HANDLE INPUT CHANGE
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     HANDLE IMAGE CHANGE
  ========================================================= */

  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      image_url: imageUrl,
    }));
  };

  /* =========================================================
     SAVE CONTENT
  ========================================================= */

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        const result = await updateVisionAction(formData);

        if (result.success) {
          alert("Vision section updated successfully.");
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error(
          "VISION UPDATE CLIENT ERROR:",
          error
        );

        alert(
          "Failed to update Vision section. Check the console."
        );
      }
    });
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* =====================================================
          LEFT — EDITOR
      ===================================================== */}

      <div className="space-y-8 lg:col-span-2">

        <VisionDetails
          data={formData}
          onChange={handleChange}
        />

        <VisionUSP
          data={formData}
          onChange={handleChange}
        />

        <VisionImage
          data={formData}
          onImageChange={handleImageChange}
        />

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
          {isPending
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>

      {/* =====================================================
          RIGHT — LIVE PREVIEW
      ===================================================== */}

      <div className="h-fit lg:sticky lg:top-24">
        <VisionPreview data={formData} />
      </div>
    </div>
  );
}