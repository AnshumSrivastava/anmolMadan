import Hero from "@/components/visitor/hero/Hero";
import About from "@/components/visitor/about/About";
import Experience from "@/components/visitor/experience/Experience";
import Gallery from "@/components/visitor/gallery/Gallery";
import Testimonials from "@/components/visitor/testimonials/Testimonials";
import Contact from "@/components/visitor/contact/Contact";
import { Vision } from "@/components/visitor/vision";

export default function HomePage() {
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
          shadow-[0_-25px_60px_rgba(0,0,0,0.15)]
          transition-shadow
          duration-500
        "
      >
        <About />
        <Vision />
        <Experience />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}