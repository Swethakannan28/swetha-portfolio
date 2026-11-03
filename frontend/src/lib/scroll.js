import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let lenis = null;

export const getLenis = () => lenis;

export function createLenis() {
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.4,
  });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time) => lenis && lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis && lenis.destroy();
    lenis = null;
  };
}

export function scrollToId(id, { immediate = false } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: immediate ? 0 : 1.6, immediate });
  } else {
    el.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" });
  }
}

export function scrollToTop(immediate = false) {
  if (lenis) lenis.scrollTo(0, { immediate, duration: 1.6 });
  else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}
