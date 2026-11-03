import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../hooks/useMedia";

const Chars = ({ text, className = "" }) => (
  <span className={`inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em] ${className}`} aria-hidden="true">
    {text.split("").map((c, i) => (
      <span key={i} className="ch inline-block will-change-transform">
        {c}
      </span>
    ))}
  </span>
);

/**
 * Cinematic intro:  Hi  →  Vanakkam / வணக்கம்  →  Welcome  →  SWETHA KANNAN
 * then an arched curtain lifts to reveal the hero underneath.
 */
export default function Intro({ onReveal, onDone }) {
  const root = useRef(null);
  const tlRef = useRef(null);
  const counter = useRef(null);

  useLayoutEffect(() => {
    const reduced = prefersReducedMotion();
    const q = gsap.utils.selector(root);
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(q('[data-stage="hi"], [data-stage="van"], [data-stage="wel"]'), { display: "none" });
        gsap.set(q('[data-stage="name"]'), { opacity: 0 });
        const tl = gsap.timeline();
        tlRef.current = tl;
        tl.to(q('[data-stage="name"]'), { opacity: 1, duration: 0.6 })
          .add("reveal", "+=0.8")
          .add(() => onReveal())
          .to(root.current, { opacity: 0, duration: 0.6 })
          .add(() => onDone());
        return;
      }

      gsap.set(q(".ch"), { yPercent: 118 });
      gsap.set(q(".ln"), { yPercent: 118 });
      gsap.set(q(".fadein"), { opacity: 0, y: 14 });
      gsap.set(root.current, { clipPath: "inset(0% 0% 0% 0% round 0vw 0vw 0vw 0vw)" });

      const tl = gsap.timeline({
        onUpdate: () => {
          if (counter.current) counter.current.textContent = String(Math.round(tl.progress() * 100)).padStart(3, "0");
        },
      });
      tlRef.current = tl;

      // background glow & progress bar run the whole length
      tl.fromTo(q("[data-bar]"), { scaleX: 0 }, { scaleX: 1, duration: 6.7, ease: "power1.inOut" }, 0);
      tl.fromTo(q("[data-orb]"), { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.2, ease: "expo.out" }, 0);
      tl.to(q("[data-orb]"), { scale: 1.5, xPercent: -12, duration: 6.7, ease: "none" }, 0);

      const stage = (sel, at, hold = 0.55) => {
        const chars = q(`${sel} .ch`);
        const lines = q(`${sel} .ln`);
        const fades = q(`${sel} .fadein`);
        if (chars.length) tl.to(chars, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.07 }, at);
        if (lines.length) tl.to(lines, { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.12 }, at + 0.25);
        if (fades.length) tl.to(fades, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, at + 0.5);
        return at + 0.9 + hold;
      };
      const out = (sel, at) => {
        tl.to(q(`${sel} .ch, ${sel} .ln`), { yPercent: -118, duration: 0.6, ease: "power3.in", stagger: 0.035 }, at);
        tl.to(q(`${sel} .fadein`), { opacity: 0, duration: 0.3 }, at);
      };

      // Hi
      let t = 0.3;
      let end = stage('[data-stage="hi"]', t, 0.35);
      out('[data-stage="hi"]', end);
      // Vanakkam / வணக்கம்
      t = end + 0.45;
      end = stage('[data-stage="van"]', t, 0.55);
      out('[data-stage="van"]', end);
      // Welcome
      t = end + 0.45;
      end = stage('[data-stage="wel"]', t, 0.35);
      out('[data-stage="wel"]', end);
      // SWETHA KANNAN
      t = end + 0.45;
      end = stage('[data-stage="name"]', t, 0.7);

      tl.addLabel("reveal", end);
      tl.add(() => onReveal(), "reveal");
      tl.to(q('[data-stage="name"] .ln'), { yPercent: -35, duration: 1.3, ease: "power3.in" }, "reveal");
      tl.to(q("[data-chrome]"), { opacity: 0, duration: 0.4 }, "reveal");
      tl.to(
        root.current,
        { clipPath: "inset(0% 0% 100% 0% round 0vw 0vw 50vw 50vw)", duration: 1.35, ease: "expo.inOut" },
        "reveal+=0.1"
      );
      tl.add(() => onDone());
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (tl.time() >= tl.labels.reveal) return;
    tl.seek("reveal+=0.001", false); // false = fire the onReveal callback
    tl.timeScale(1.4).play();
  };

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] overflow-hidden bg-night text-paper"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Hi. Vanakkam. Welcome. Swetha Kannan.</span>

      {/* glow */}
      <div
        data-orb
        aria-hidden="true"
        className="absolute -right-[10%] top-[8%] h-[70vmax] w-[70vmax] rounded-full opacity-0 blur-3xl"
        style={{ background: "radial-gradient(circle at 40% 40%, rgba(255,106,85,.55), rgba(246,168,35,.22) 45%, transparent 70%)" }}
      />

      {/* chrome */}
      <div data-chrome className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-6 text-sm md:px-10">
        <span className="font-display text-lg font-bold tracking-tight">SK<span className="text-coral">.</span></span>
        <span className="text-paper/60">Tiruchirappalli, India</span>
      </div>

      {/* stages */}
      <div aria-hidden="true" className="absolute inset-0 grid place-items-center px-5">
        <div data-stage="hi" className="col-start-1 row-start-1 font-display text-[clamp(6rem,26vw,22rem)] font-extrabold leading-[0.9] tracking-tighter">
          <Chars text="Hi" />
          <Chars text="!" className="text-coral" />
        </div>

        <div data-stage="van" className="col-start-1 row-start-1 text-center">
          <div className="font-display text-[clamp(3.4rem,15vw,13rem)] font-extrabold leading-[0.95] tracking-tighter">
            <Chars text="Vanakkam" />
          </div>
          <div className="mt-2 overflow-hidden pb-3">
            <div className="ln font-tamil text-[clamp(2.4rem,9vw,7.5rem)] font-bold leading-tight text-amber">வணக்கம்</div>
          </div>
        </div>

        <div data-stage="wel" className="col-start-1 row-start-1 text-center font-display text-[clamp(3.6rem,16vw,14rem)] font-extrabold leading-[0.95] tracking-tighter">
          <Chars text="Welcome" />
        </div>

        <div data-stage="name" className="col-start-1 row-start-1 text-center">
          <div className="overflow-hidden pb-[0.1em]">
            <div className="ln font-display text-[clamp(3.4rem,15.5vw,15rem)] font-extrabold leading-[0.88] tracking-[-0.045em]">SWETHA</div>
          </div>
          <div className="overflow-hidden pb-[0.1em]">
            <div className="ln font-display text-[clamp(3.4rem,15.5vw,15rem)] font-extrabold leading-[0.88] tracking-[-0.045em]">KANNAN</div>
          </div>
          <p className="fadein mt-6 text-sm tracking-[0.2em] text-paper/70 md:text-base">Full Stack · MERN Developer</p>
        </div>
      </div>

      {/* progress */}
      <div data-chrome className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 px-5 pb-6 md:px-10">
        <span ref={counter} className="font-display text-sm tabular-nums text-paper/60" aria-hidden="true">000</span>
        <div className="mb-2 h-px flex-1 bg-paper/15" aria-hidden="true">
          <div data-bar className="h-full origin-left bg-coral" />
        </div>
        <button
          type="button"
          onClick={skip}
          className="rounded-full border border-paper/30 px-4 py-2 text-sm text-paper/80 transition-colors hover:border-coral hover:text-coral"
        >
          Skip intro
        </button>
      </div>
    </div>
  );
}
