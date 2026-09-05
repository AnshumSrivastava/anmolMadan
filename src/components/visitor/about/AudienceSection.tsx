import { getAbout } from "@/services/about/about.service";
import Audience from "./Audience";

interface AudienceSectionProps {
  about?: any;
}

export default async function AudienceSection({ about: initialAbout }: AudienceSectionProps = {}) {
  const about = initialAbout !== undefined ? initialAbout : await getAbout();

  if (!about) return null;

  return (
    <section className="relative overflow-hidden bg-white dark:bg-black py-20 lg:py-24 text-black dark:text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Audience about={about} />
      </div>
    </section>
  );
}
