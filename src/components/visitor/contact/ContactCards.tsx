import type { ContactContent } from "@/types/contact";
import ContactCard from "./ContactCard";

type Props = {
  content: ContactContent | null;
};

const fallbackContent: ContactContent = {
  id: "contact-1",
  email: "anmolmadan.official@gmail.com",
  email_description: "Best for formal corporate and keynote inquiries",
  whatsapp: "+91 98765 43210",
  whatsapp_description: "Fastest response for quick session queries",
  booking_link: "https://calendly.com",
  booking_description: "Schedule a 30-minute discovery consultation",
  linkedin: "https://linkedin.com/in/anmol-madan",
  linkedin_description: "Connect for cybersecurity insights & updates",
  phone: null,
  phone_description: null,
  instagram: null,
  instagram_description: null,
  updated_at: new Date().toISOString(),
};

export default function ContactCards({ content }: Props) {
  const data = content || fallbackContent;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ContactCard
        title="Email"
        value={data.email}
        description={data.email_description}
        href={`mailto:${data.email}`}
        accent="cyan"
      />

      <ContactCard
        title="WhatsApp"
        value={data.whatsapp}
        description={data.whatsapp_description}
        href={`https://wa.me/${data.whatsapp.replace(/\D/g, "")}`}
        accent="emerald"
      />

      <ContactCard
        title="Book a Call"
        value={data.booking_link}
        description={data.booking_description}
        href={data.booking_link}
        accent="violet"
      />

      <ContactCard
        title="LinkedIn"
        value={data.linkedin}
        description={data.linkedin_description}
        href={data.linkedin}
        accent="blue"
      />
    </div>
  );
}