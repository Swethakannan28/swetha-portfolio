import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "../data/portfolio";
import { useGo } from "./Transition";
import { getLenis } from "../lib/scroll";

export default function Nav({ visible }) {
  const go = useGo();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // hide on scroll down, show on scroll up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 120 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y < 120) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const l = getLenis();
    if (open) l?.stop();
    else l?.start();
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const nav = (id) => {
    setOpen(false);
    setTimeout(() => go(`/#${id}`), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible && !hidden ? 0 : -90, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        className="fixed inset-x-0 top-0 z-[80] text-white mix-blend-difference"
      >
        <nav aria-label="Primary" className="flex items-center justify-between px-5 py-5 md:px-10">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); setOpen(false); go("/"); }}
            className="font-display text-xl font-extrabold tracking-tight"
            aria-label="Swetha Kannan — home"
          >
            SK<span className="text-white">.</span>
          </a>

          <ul className="hidden items-center gap-8 text-sm lg:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`/#${l.id}`}
                  onClick={(e) => { e.preventDefault(); nav(l.id); }}
                  className="group relative inline-block py-1"
                >
                  {l.label}
                  <span className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-white transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href={profile.resume} download className="hidden rounded-full border border-white/70 px-5 py-2 text-sm transition-colors hover:bg-white hover:text-black sm:inline-block">
              Resume
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/70 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[70] flex flex-col justify-center bg-night px-6 text-paper"
          >
            <ul className="space-y-1">
              {navLinks.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.a
                    href={`/#${l.id}`}
                    onClick={(e) => { e.preventDefault(); nav(l.id); }}
                    initial={{ y: "110%" }}
                    animate={{ y: 0, transition: { delay: 0.25 + i * 0.07, duration: 0.8, ease: [0.19, 1, 0.22, 1] } }}
                    exit={{ y: "110%", transition: { duration: 0.3 } }}
                    className="block font-display text-[clamp(2.6rem,12vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight active:text-coral"
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <a href={profile.resume} download className="mt-10 text-lg text-amber underline underline-offset-8">
              Download resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
