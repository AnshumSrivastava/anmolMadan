"use client";

import { useTransition } from "react";
import { updateContactContent } from "@/actions/contact";
import type { ContactContent } from "@/types/contact";

type Props = {
  content: ContactContent | null;
};

export default function ContactContentForm({ content }: Props) {
  const [pending] = useTransition();

  console.log("CONTACT CONTENT:", content);

  return (
    <form
      action={updateContactContent}
      className="space-y-8"
    >
      <input
        type="hidden"
        name="id"
        defaultValue={content?.id ?? ""}
      />

      {/* Header */}

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <h2 className="text-2xl font-semibold">
          Contact Information
        </h2>

        <p className="mt-2 text-zinc-400">
          Update the contact information displayed on your public portfolio.
        </p>
      </div>

      {/* Cards */}

      <div className="grid gap-6 lg:grid-cols-2">
        <ContactCard
          title="Email"
          placeholder="john@example.com"
          field="email"
          descriptionField="email_description"
          value={content?.email}
          description={content?.email_description}
        />

        <ContactCard
          title="WhatsApp"
          placeholder="+91 9876543210"
          field="whatsapp"
          descriptionField="whatsapp_description"
          value={content?.whatsapp}
          description={content?.whatsapp_description}
        />

        <ContactCard
          title="LinkedIn"
          placeholder="https://linkedin.com/in/username"
          field="linkedin"
          descriptionField="linkedin_description"
          value={content?.linkedin}
          description={content?.linkedin_description}
        />

        <ContactCard
          title="Booking Link"
          placeholder="https://cal.com/..."
          field="booking_link"
          descriptionField="booking_description"
          value={content?.booking_link}
          description={content?.booking_description}
        />

        <ContactCard
          title="Call (Phone)"
          placeholder="+1 234 567 890"
          field="phone"
          descriptionField="phone_description"
          value={content?.phone}
          description={content?.phone_description}
        />

        <ContactCard
          title="Instagram"
          placeholder="https://instagram.com/username"
          field="instagram"
          descriptionField="instagram_description"
          value={content?.instagram}
          description={content?.instagram_description}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-2xl bg-white py-4 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Save Changes
      </button>
    </form>
  );
}

type CardProps = {
  title: string;
  field: string;
  descriptionField: string;
  value?: string | null;
  description?: string | null;
  placeholder: string;
};

function ContactCard({
  title,
  field,
  descriptionField,
  value,
  description,
  placeholder,
}: CardProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="text-lg font-semibold">{title}</h3>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            {title}
          </label>

          <input
            name={field}
            defaultValue={value ?? ""}
            placeholder={placeholder}
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 outline-none transition focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Description
          </label>

          <textarea
            rows={3}
            name={descriptionField}
            defaultValue={description ?? ""}
            placeholder={`Short description for ${title}`}
            className="w-full resize-none rounded-xl border border-zinc-700 bg-black px-4 py-3 outline-none transition focus:border-white"
          />
        </div>
      </div>
    </div>
  );
}