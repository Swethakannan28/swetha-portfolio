import { createElement, useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../hooks/useMedia";

/**
 * Words — splits text into masked words that rise into view on scroll.
 * Props: as, text, className, delay, stagger, trigger ("scroll" | "manual"), ready
 */
export function Words({ as = "span", text, className = "", delay = 0, stagger = 0.055, start = "top 88%", ready = true, trigger = "scroll", children }) {
  const ref = useRef(null);
  const words = String(text).split(" ");

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    const inners = el.querySelectorAll(".word-inner");
    const ctx = gsap.context(() => {
      gsap.set(inners, { yPercent: 115, rotate: 3 });
      if (!ready) return;
      const vars = { yPercent: 0, rotate: 0, duration: 1.15, ease: "expo.out", stagger, delay };
      if (trigger === "scroll") {
        gsap.to(inners, { ...vars, scrollTrigger: { trigger: el, start, once: true } });
      } else {
        gsap.to(inners, vars);
      }
    }, ref);
    return () => ctx.revert();
  }, [ready, text, delay, stagger, start, trigger]);

  return createElement(
    as,
    { ref, className },
    words.map((w, i) => (
      <span key={i} className="word-mask" aria-hidden="true">
        <span className="word-inner">{w}</span>
        {i < words.length - 1 ? "\u00A0" : ""}
      </span>
    )),
    <span className="sr-only">{text}</span>,
    children
  );
}

/** Fade — gentle fade/translate for blocks, triggered by scroll. */
export function Fade({ as = "div", className = "", y = 36, delay = 0, children, ...rest }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        { opacity: 1, y: 0, duration: 1.1, delay, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 90%", once: true } }
      );
    }, ref);
    return () => ctx.revert();
  }, [y, delay]);
  return createElement(as, { ref, className, ...rest }, children);
}

/** ScrubWords — each word brightens as you scroll through the paragraph. */
export function ScrubWords({ text, className = "", base = 0.18 }) {
  const ref = useRef(null);
  const words = text.split(" ");
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.querySelectorAll("[data-w]"),
        { opacity: base },
        { opacity: 1, stagger: 0.12, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 82%", end: "bottom 45%", scrub: 0.6 } }
      );
    }, ref);
    return () => ctx.revert();
  }, [base, text]);
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} data-w>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

/** CountUp — number animates from 0 when scrolled into view. */
export function CountUp({ to, className = "" }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (prefersReducedMotion()) {
      el.textContent = to;
      return;
    }
    const obj = { v: 0 };
    el.textContent = "0";
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: to, duration: 1.8, ease: "power3.out",
        onUpdate: () => (el.textContent = Math.round(obj.v)),
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [to]);
  return <span ref={ref} className={className}>{to}</span>;
}
