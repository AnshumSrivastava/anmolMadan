import type { ContactContent } from "@/types/contact";
import ContactCard from "./ContactCard";

type Props = {
  content: ContactContent | null;
};

export default function ContactCards({ content }: Props) {
  if (!content) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ContactCard
        title="Email"
        value={content.email}
        description={content.email_description}
        href={`mailto:${content.email}`}
        accent="cyan"
      />

      <ContactCard
        title="WhatsApp"
        value={content.whatsapp}
        description={content.whatsapp_description}
        href={`https://wa.me/${content.whatsapp.replace(/\D/g, "")}`}
        accent="emerald"
      />

      <ContactCard
        title="Book a Call"
        value={content.booking_link}
        description={content.booking_description}
        href={content.booking_link}
        accent="violet"
      />

      <ContactCard
        title="LinkedIn"
        value={content.linkedin}
        description={content.linkedin_description}
        href={content.linkedin}
        accent="blue"
      />
    </div>
  );
}