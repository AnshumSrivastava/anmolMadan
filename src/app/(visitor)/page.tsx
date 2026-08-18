import Hero from "@/components/visitor/hero/Hero";
import About from "@/components/visitor/about/About";
import Timeline from "@/components/visitor/timeline/Timeline";
import Projects from "@/components/visitor/projects";
import Companies from "@/components/visitor/companies/Companies";
import Gallery from "@/components/visitor/gallery";
import Contact from "@/components/visitor/contact/Contact";
import Services from "@/components/visitor/services/Services";
import Testimonials from "@/components/visitor/testimonials/Testimonials";


export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Timeline />
      <Projects />
      <Testimonials />
      <Companies />      
      <Gallery />
      <Contact />
    </>
  );
}