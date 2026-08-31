"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { submitContactForm } from "@/actions/contact";

export default function ContactForm() {
  const [pending, startTransition] = useTransition();

  return (
    <div className="w-full bg-transparent p-0 shadow-none border-none">
      <div className="mb-8">
        <span className="inline-flex rounded-full border border-zinc-200 dark:border-neutral-800 bg-zinc-100 dark:bg-neutral-900 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-700 dark:text-neutral-300">
          Booking & Consultation
        </span>

        <h3 className="mt-4 text-3xl font-bold text-black dark:text-white tracking-tight">
          Let&apos;s Connect
        </h3>

        <p className="mt-2 text-sm text-zinc-600 dark:text-neutral-400">
          Fill in your details and I will get back to you directly.
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
        className="space-y-6"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Input label="Your Name" name="full_name" required />
          <Input label="Organisation / Institution" name="organization" />
          <Input label="Email Address" name="email" type="email" required />
          <Input label="Phone Number" name="phone" type="tel" required />
          <Select label="Type of Session" name="session_type" />
          <Input label="Preferred Date" name="preferred_date" type="date" />
        </div>

        <Textarea label="Message" name="message" />

        <button
          disabled={pending}
          className="inline-flex items-center justify-center rounded-2xl bg-black dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-black transition-all duration-200 hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60 shadow-none border-none"
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

function Input({ label, name, type = "text", required }: InputProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>

      <input
        name={name}
        type={type}
        required={required}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full rounded-xl border border-zinc-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 px-4 py-3 text-sm text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition-all duration-200 focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-neutral-900 shadow-none"
      />
    </div>
  );
}

/* ===================================================== */

function Select({ label, name }: { label: string; name: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>

      <select
        name={name}
        defaultValue=""
        className="w-full rounded-xl border border-zinc-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 px-4 py-3 text-sm text-black dark:text-white outline-none transition-all duration-200 focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-neutral-900 shadow-none"
      >
        <option value="" disabled>
          Select Session
        </option>
        <option value="Corporate Training">Corporate Training</option>
        <option value="Motivational Speaking">Motivational Speaking</option>
        <option value="Cybersecurity Workshop">Cybersecurity Workshop</option>
        <option value="Mentorship">Mentorship</option>
        <option value="Consultation">Consultation</option>
      </select>
    </div>
  );
}

/* ===================================================== */

function Textarea({ label, name }: { label: string; name: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>

      <textarea
        rows={4}
        name={name}
        placeholder="Tell me about your event or requirements..."
        className="w-full resize-none rounded-xl border border-zinc-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 px-4 py-3 text-sm text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition-all duration-200 focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-neutral-900 shadow-none"
      />
    </div>
  );
}