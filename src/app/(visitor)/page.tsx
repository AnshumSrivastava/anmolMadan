import Hero from "@/components/visitor/hero/Hero";
import { About, AudienceSection } from "@/components/visitor/about";
import Services from "@/components/visitor/services/Services";
import Experience from "@/components/visitor/experience/Experience";
import Testimonials from "@/components/visitor/testimonials/Testimonials";
import Footer from "@/components/visitor/layout/Footer";
import { Vision } from "@/components/visitor/vision";
import { Note } from "@/components/visitor/note";
import ConnectButton from "@/components/visitor/layout/ConnectButton";
import { getContactContent, getContactLinks } from "@/services/contact";

export default async function HomePage() {
  const contactContent = await getContactContent();
  const contactLinks = await getContactLinks();

  return (
    <>
      {/* FIXED HERO LAYER */}
      <Hero />

      {/* ELEVATED CARD STACK (Pulls up over hero on scroll) */}
      <main
        id="main-content"
        className="
          relative
          z-10
          mt-[100dvh]
          min-h-screen
          w-full
          rounded-t-[32px]
          sm:rounded-t-[44px]
          lg:rounded-t-[52px]
          bg-white
          dark:bg-black
          shadow-[0_-25px_60px_rgba(0,0,0,0.15)]
          transition-shadow
          duration-500
        "
      >
        <About />
        <Testimonials />
        <AudienceSection />
        <Services />
        <Vision />
        <Note />
        <Experience />
        <Footer links={contactLinks} />
      </main>

      {/* Sticky Connect Button */}
      <ConnectButton content={contactContent} links={contactLinks} />
    </>
  );
}