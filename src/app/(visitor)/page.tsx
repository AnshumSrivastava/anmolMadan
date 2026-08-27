import Hero from "@/components/visitor/hero/Hero";
import About from "@/components/visitor/about/About";
import Experience from "@/components/visitor/experience/Experience";
import Gallery from "@/components/visitor/gallery";
import Contact from "@/components/visitor/contact/Contact";

import { Vision } from "@/components/visitor/vision";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Vision />         
      <Experience />
      <Gallery />      
      <Contact />
    </>
  );
}