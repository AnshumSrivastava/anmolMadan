import ContactHero from "./ContactHero";
import ContactCards from "./ContactCards";
import ContactForm from "./ContactForm";

import { getContactContent } from "@/services/contact";

export default async function Contact() {
  const content = await getContactContent();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#fafafa] dark:bg-neutral-950 py-24 text-black dark:text-white md:py-28 lg:py-32"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 lg:px-8">

        {/* Hero */}

        <ContactHero />

        {/* Contact Options */}

        <ContactCards content={content} />

        {/* Contact Form */}

        <ContactForm />

      </div>
    </section>
  );
}