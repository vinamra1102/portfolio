import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ScrollAmbience from "@/components/ScrollAmbience";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

/* Below-fold sections are code-split so hydration happens in smaller
   tasks after the hero is interactive (HTML is still server-rendered). */
const Projects = dynamic(() => import("@/components/Projects"));
const Skills = dynamic(() => import("@/components/Skills"));
const About = dynamic(() => import("@/components/About"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function HomePage() {
  return (
    <>
      <Navbar />
      <ScrollAmbience />
      <main>
        <Hero />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider section-divider--inv" />
        <Skills />
        <About />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
