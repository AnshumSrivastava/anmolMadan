"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { submitContactForm } from "@/actions/contact";

export default function ContactForm() {
  const [pending, startTransition] = useTransition();

  return (
    <div className="rounded-[32px] border border-zinc-200 bg-white p-8 shadow-sm lg:p-12">
      <div className="mb-10">
        <span className="inline-flex rounded-full border border-zinc-300 bg-zinc-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-700">
          Booking Form
        </span>

        <h3 className="mt-6 text-3xl font-bold text-black">
          Let's Talk
        </h3>

        <p className="mt-3 max-w-2xl text-zinc-600">
          Fill in your details and I'll get back to you as soon as
          possible.
        </p>
      </div>

      <form
  action={(formData) =>
    startTransition(async () => {
      try {
        await submitContactForm(formData);

        toast.success("🎉 Enquiry Submitted Successfully!", {
          description:
            "Thank you for reaching out. I'll get back to you shortly.",
          duration: 4000,
        });

        // Reset the form
        (document.activeElement as HTMLElement)?.blur();
        const form = document.getElementById(
          "contact-form"
        ) as HTMLFormElement | null;

        form?.reset();
      } catch (error) {
        console.error(error);

        toast.error("Submission Failed", {
          description: "Something went wrong. Please try again.",
          duration: 4000,
        });
      }
    })
  }
  id="contact-form"
  className="space-y-8"
>
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Your Name"
            name="full_name"
            required
          />

          <Input
            label="Organisation / College"
            name="organization"
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            required
          />

          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            required
          />

          <Select
            label="Type of Session"
            name="session_type"
          />

          <Input
            label="Preferred Date"
            name="preferred_date"
            type="date"
          />
        </div>

        <Textarea
          label="Message"
          name="message"
        />

        <button
          disabled={pending}
          className="inline-flex items-center rounded-2xl bg-black px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Submitting..." : "Submit Enquiry →"}
        </button>
      </form>
    </div>
  );
}

/* ===================================================== */

type InputProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
};

function Input({
  label,
  name,
  type = "text",
  required,
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-700">
        {label}
      </label>

      <input
        name={name}
        type={type}
        required={required}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full rounded-2xl border border-zinc-300 bg-white px-5 py-4 text-black placeholder:text-zinc-400 outline-none transition-all duration-300 focus:border-black focus:ring-2 focus:ring-black/10"
      />
    </div>
  );
}

/* ===================================================== */

function Select({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-700">
        {label}
      </label>

      <select
        name={name}
        defaultValue=""
        className="w-full rounded-2xl border border-zinc-300 bg-white px-5 py-4 text-black outline-none transition-all duration-300 focus:border-black focus:ring-2 focus:ring-black/10"
      >
        <option value="" disabled>
          Select Session
        </option>

        <option value="Corporate Training">
          Corporate Training
        </option>

        <option value="Motivational Speaking">
          Motivational Speaking
        </option>

        <option value="Cybersecurity Workshop">
          Cybersecurity Workshop
        </option>

        <option value="Mentorship">
          Mentorship
        </option>

        <option value="Consultation">
          Consultation
        </option>
      </select>
    </div>
  );
}

/* ===================================================== */

function Textarea({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-700">
        {label}
      </label>

      <textarea
        rows={6}
        name={name}
        placeholder="Tell me about your requirements..."
        className="w-full resize-none rounded-2xl border border-zinc-300 bg-white px-5 py-4 text-black placeholder:text-zinc-400 outline-none transition-all duration-300 focus:border-black focus:ring-2 focus:ring-black/10"
      />
    </div>
  );
}