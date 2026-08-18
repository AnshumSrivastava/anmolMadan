import { getAbout } from "@/services/about/about.service";
import Reveal from "@/components/shared/Reveal";

import AboutContent from "./AboutContent";
import Credentials from "./Credentials";
import Audience from "./Audience";
import CTA from "./CTA";

export default async function About() {
  const about = await getAbout();

  if (!about) return null;

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#fafafa] py-28 text-black"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24">

        <Reveal>
          <AboutContent about={about} />
        </Reveal>

        <Reveal delay={0.1}>
          <Credentials about={about} />
        </Reveal>

        <Reveal delay={0.2}>
          <Audience about={about} />
        </Reveal>

        <Reveal delay={0.3}>
          <CTA />
        </Reveal>

      </div>
    </section>
  );
}