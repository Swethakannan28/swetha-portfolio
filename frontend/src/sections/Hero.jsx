import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../hooks/useMedia";
import { profile } from "../data/portfolio";
import Starfield from "../components/Starfield";
import Button from "../components/Button";
import { scrollToId } from "../lib/scroll";

const Line = ({ text, className = "" }) => (
  <span className={`flex overflow-hidden pb-[0.08em] -mb-[0.08em] ${className}`} aria-hidden="true">
    {text.split("").map((c, i) => (
      <span key={i} data-hero="ch" className="inline-block will-change-transform">{c}</span>
    ))}
  </span>
);

function useClock() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: profile.timezone }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Hero({ ready }) {
  const root = useRef(null);
  const time = useClock();

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.set('[data-hero="ch"]', { yPercent: 118 });
      gsap.set('[data-hero="fade"]', { opacity: 0, y: 28 });
      gsap.set('[data-hero="orb"]', { opacity: 0, scale: 0.6 });

      if (ready) {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to('[data-hero="orb"]', { opacity: 1, scale: 1, duration: 2.4 }, 0)
          .to('[data-hero="ch"]', { yPercent: 0, duration: 1.5, stagger: 0.055 }, 0.1)
          .to('[data-hero="fade"]', { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 }, 0.55);
      }

      // as the next panel slides over, the hero recedes
      gsap.to('[data-hero="content"]', {
        yPercent: -8, scale: 0.97, opacity: 0.35, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={root} id="top" aria-label="Introduction" className="sticky top-0 z-0 h-[100svh] min-h-[640px] overflow-hidden bg-night">
      <Starfield />
      <div
        data-hero="orb"
        aria-hidden="true"
        className="orb pointer-events-none absolute -right-[18%] -top-[22%] h-[75vmax] w-[75vmax] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle at 35% 40%, rgba(255,106,85,.6), rgba(246,168,35,.25) 42%, transparent 70%)" }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night via-night/60 to-transparent" />

      <div data-hero="content" className="relative z-10 mx-auto flex h-full max-w-[1700px] flex-col justify-between px-5 pb-8 pt-24 md:px-10 md:pb-10 md:pt-28">
        {/* top meta */}
        <div className="flex items-start justify-between gap-6 text-sm text-paper/75">
          <ul data-hero="fade" className="space-y-0.5">
            {profile.roles.map((r) => <li key={r}>{r}</li>)}
          </ul>
          <div data-hero="fade" className="text-right">
            
            <p className="tabular-nums text-paper/55">{time} IST</p>
          </div>
        </div>

        {/* wordmark + actions */}
        <div>
          <h1 aria-label={`${profile.firstName} ${profile.lastName}`} className="display-tight font-display text-[clamp(3.6rem,17.5vw,19rem)] font-extrabold">
            <Line text={profile.firstName} />
            <Line text={profile.lastName} className="md:pl-[10vw]" />
          </h1>

          <div className="mt-8 grid items-end gap-8 md:mt-12 md:grid-cols-12">
            <div data-hero="fade" className="md:col-span-6 lg:col-span-5">
              <p className="font-display text-xl font-semibold leading-snug text-paper md:text-2xl">{profile.tagline}</p>
              <p className="mt-3 max-w-md text-paper/60">{profile.intro}</p>
            </div>
            <div data-hero="fade" className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end lg:col-span-7">
              <Button onClick={() => scrollToId("projects")}>View Projects</Button>
              <Button variant="outline" href={profile.resume} download>Download Resume</Button>
            </div>
          </div>
        </div>
      </div>

      <div data-hero="fade" className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-paper/50 lg:flex" aria-hidden="true">
        <span>Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}
