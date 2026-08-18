"use client";

import { useState, useTransition } from "react";
import { About } from "@/types/about";
import { updateAboutAction } from "@/actions/about";

import AboutDetails from "./AboutDetails";
import AboutCredentials from "./AboutCredentials";
import AboutAudience from "./AboutAudience";
import AboutPreview from "./AboutPreview";

type Props = {
  about: About;
};

export default function AboutForm({ about }: Props) {
  const [formData, setFormData] = useState<About>(about);
  const [isPending, startTransition] = useTransition();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Left */}
      <div className="space-y-8 lg:col-span-2">
        <AboutDetails
          data={formData}
          onChange={handleChange}
        />

        <AboutCredentials
          data={formData}
          onChange={handleChange}
        />

        <AboutAudience
          data={formData}
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full rounded-xl bg-white py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Right */}
      <div className="lg:sticky lg:top-24 h-fit">
        <AboutPreview data={formData} />
      </div>
    </div>
  );
}