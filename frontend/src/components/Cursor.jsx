import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../hooks/useMedia";

/** Custom cursor: dot + trailing ring. Grows on links, shows a label on [data-cursor="view"]. Desktop only. */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;
    document.documentElement.classList.add("has-cursor");

    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "none" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "none" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3.out" });

    const move = (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); };

    const set = (mode, text = "") => {
      label.current.textContent = text;
      if (mode === "view") {
        gsap.to(ring.current, { scale: 1, width: 92, height: 92, backgroundColor: "#ff6a55", borderColor: "#ff6a55", duration: 0.5, ease: "expo.out" });
        gsap.to(dot.current, { scale: 0, duration: 0.3 });
        gsap.to(label.current, { opacity: 1, duration: 0.3 });
      } else if (mode === "link") {
        gsap.to(ring.current, { scale: 1, width: 64, height: 64, backgroundColor: "rgba(241,234,220,0.08)", borderColor: "rgba(241,234,220,0.8)", duration: 0.5, ease: "expo.out" });
        gsap.to(dot.current, { scale: 0.5, duration: 0.3 });
        gsap.to(label.current, { opacity: 0, duration: 0.2 });
      } else {
        gsap.to(ring.current, { scale: 1, width: 36, height: 36, backgroundColor: "rgba(241,234,220,0)", borderColor: "rgba(241,234,220,0.55)", duration: 0.5, ease: "expo.out" });
        gsap.to(dot.current, { scale: 1, duration: 0.3 });
        gsap.to(label.current, { opacity: 0, duration: 0.2 });
      }
    };

    const over = (e) => {
      const t = e.target.closest?.("[data-cursor], a, button");
      if (!t) return set("default");
      const mode = t.getAttribute("data-cursor") || "link";
      set(mode, mode === "view" ? t.getAttribute("data-cursor-label") || "View" : "");
    };
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 });
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2 });

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    set("default");

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[120] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div ref={ring} className="fixed left-0 top-0 grid place-items-center rounded-full border" style={{ width: 36, height: 36 }}>
        <span ref={label} className="text-[11px] font-bold uppercase tracking-widest text-night opacity-0" />
      </div>
      <div ref={dot} className="fixed left-0 top-0 h-2 w-2 rounded-full bg-paper mix-blend-difference" />
    </div>
  );
}
