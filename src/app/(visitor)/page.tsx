import Hero from "@/components/visitor/hero/Hero";
import { About, AudienceSection } from "@/components/visitor/about";
import Services from "@/components/visitor/services/Services";
import Experience from "@/components/visitor/experience/Experience";
import Testimonials from "@/components/visitor/testimonials/Testimonials";
import Footer from "@/components/visitor/layout/Footer";
import { Vision } from "@/components/visitor/vision";
import { Note } from "@/components/visitor/note";
import ConnectButton from "@/components/visitor/layout/ConnectButton";
import LoadingScreen from "@/components/shared/LoadingScreen";

import { getHero } from "@/services/hero/hero.service";
import { getAbout } from "@/services/about/about.service";
import { getServicesSection, getServiceItems } from "@/services/services/services.service";
import { getGallery } from "@/services/gallery/gallery.service";
import { getVision } from "@/services/vision/vision.service";
import { getNote } from "@/services/note/note.service";
import { getProjects } from "@/services/projects/project.service";
import { getContactContent, getContactLinks } from "@/services/contact";

export default async function HomePage() {
  // Fetch all initial data in parallel behind the loading screen
  const [
    hero,
    about,
    servicesSection,
    serviceItems,
    gallery,
    vision,
    note,
    projects,
    contactContent,
    contactLinks,
  ] = await Promise.all([
    getHero().catch((err) => {
      console.error("Error fetching hero:", err);
      return null;
    }),
    getAbout().catch((err) => {
      console.error("Error fetching about:", err);
      return null;
    }),
    getServicesSection().catch((err) => {
      console.error("Error fetching services section:", err);
      return null;
    }),
    getServiceItems().catch((err) => {
      console.error("Error fetching service items:", err);
      return [];
    }),
    getGallery().catch((err) => {
      console.error("Error fetching gallery:", err);
      return [];
    }),
    getVision().catch((err) => {
      console.error("Error fetching vision:", err);
      return null;
    }),
    getNote().catch((err) => {
      console.error("Error fetching note:", err);
      return null;
    }),
    getProjects().catch((err) => {
      console.error("Error fetching projects:", err);
      return [];
    }),
    getContactContent().catch((err) => {
      console.error("Error fetching contact content:", err);
      return null;
    }),
    getContactLinks().catch((err) => {
      console.error("Error fetching contact links:", err);
      return [];
    }),
  ]);

  return (
    <>
      {/* Brand split loading screen */}
      <LoadingScreen />

      {/* FIXED HERO LAYER */}
      <Hero hero={hero} />

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
        <About about={about} />
        <Testimonials gallery={gallery} />
        <AudienceSection about={about} />
        <Services section={servicesSection} items={serviceItems} />
        <Vision vision={vision} />
        <Note note={note} />
        <Experience experiences={projects} />
        <Footer links={contactLinks} />
      </main>

      {/* Sticky Connect Button */}
      <ConnectButton content={contactContent} links={contactLinks} />
    </>
  );
}