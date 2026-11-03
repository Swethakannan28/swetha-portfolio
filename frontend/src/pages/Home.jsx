import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "../lib/gsap";
import { scrollToId } from "../lib/scroll";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Experience from "../sections/Experience";
import Education from "../sections/Education";
import Achievements from "../sections/Achievements";
import Projects from "../sections/Projects";
import Contact from "../sections/Contact";
import Footer from "../components/Footer";

export default function Home({ ready }) {
  const { hash } = useLocation();

  useDocumentMeta(
    "Swetha Kannan — Full Stack Developer",
    "Explore Swetha Kannan's developer portfolio, skills and projects."
  );

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    const t = setTimeout(() => ScrollTrigger.refresh(), 600);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready || !hash) return;

    const t = setTimeout(
      () => scrollToId(hash.slice(1), { immediate: true }),
      200
    );

    return () => clearTimeout(t);
  }, [ready, hash]);

  return (
    <main id="main">
      <Hero ready={ready} />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Achievements />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}