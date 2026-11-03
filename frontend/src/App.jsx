import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { createLenis, getLenis } from "./lib/scroll";
import { useReducedMotion } from "./hooks/useMedia";
import { TransitionProvider } from "./components/Transition";
import Intro from "./components/Intro";
import Nav from "./components/Nav";
import Cursor from "./components/Cursor";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

const KEY = "sk-intro-seen";
const seen = () => {
  try { return sessionStorage.getItem(KEY) === "1"; } catch { return false; }
};

export default function App() {
  const location = useLocation();
  const reduced = useReducedMotion();
  // The intro plays once per session, only when landing on the home page.
  const [intro, setIntro] = useState(() => (location.pathname === "/" && !seen() ? "playing" : "done"));

  useEffect(() => {
    if (reduced) return;
    return createLenis();
  }, [reduced]);

  useEffect(() => {
    const l = getLenis();
    if (intro === "playing") {
      l?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      l?.start();
      document.documentElement.style.overflow = "";
    }
    return () => { document.documentElement.style.overflow = ""; };
  }, [intro, reduced]);

  const reveal = () => {
    try { sessionStorage.setItem(KEY, "1"); } catch { /* storage unavailable */ }
    setIntro("revealing");
  };

  return (
    <TransitionProvider>
      <a href="#main" className="skip-link">Skip to content</a>
      <Cursor />
      <Nav visible={intro !== "playing"} />

      <Routes>
        <Route path="/" element={<Home ready={intro !== "playing"} />} />
        <Route
          path="/projects/:slug"
          element={<Suspense fallback={<div className="min-h-screen bg-night" />}><ProjectDetail /></Suspense>}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {intro !== "done" && <Intro onReveal={reveal} onDone={() => setIntro("done")} />}
    </TransitionProvider>
  );
}
