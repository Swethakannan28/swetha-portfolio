import { createContext, useCallback, useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { getLenis, scrollToId, scrollToTop } from "../lib/scroll";
import { prefersReducedMotion } from "../hooks/useMedia";

const Ctx = createContext({ go: () => {} });
export const useGo = () => useContext(Ctx).go;

/** Two-layer curtain wipe between routes. Hash links on the same page just scroll. */
export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const a = useRef(null);
  const b = useRef(null);
  const busy = useRef(false);

  const go = useCallback(
    (to) => {
      const [rawPath, hash] = to.split("#");
      const path = rawPath || "/";
      if (path === location.pathname) {
        hash ? scrollToId(hash) : scrollToTop();
        return;
      }
      if (busy.current) return;
      if (prefersReducedMotion()) {
        navigate(to);
        window.scrollTo(0, 0);
        return;
      }
      busy.current = true;
      const layers = [a.current, b.current];
      gsap
        .timeline({ onComplete: () => { busy.current = false; ScrollTrigger.refresh(); } })
        .set(layers, { display: "block", yPercent: 100 })
        .to(a.current, { yPercent: 0, duration: 0.7, ease: "expo.inOut" })
        .to(b.current, { yPercent: 0, duration: 0.7, ease: "expo.inOut" }, "<0.09")
        .add(() => {
          navigate(to);
          const l = getLenis();
          l ? l.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
        })
        .to(layers, { yPercent: -100, duration: 0.85, ease: "expo.inOut", stagger: 0.08 }, "+=0.2")
        .set(layers, { display: "none" });
    },
    [location.pathname, navigate]
  );

  return (
    <Ctx.Provider value={{ go }}>
      {children}
      <div ref={a} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95] hidden bg-coral" />
      <div ref={b} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[96] hidden bg-night" />
    </Ctx.Provider>
  );
}
