import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import SectionShell from "../components/SectionShell";
import { Fade } from "../components/Reveal";
import { useGo } from "../components/Transition";
import { useHoverPreview } from "../hooks/useMedia";
import { useProjects } from "../hooks/useProjects";

const ease = [0.19, 1, 0.22, 1];

/** Floating image that follows the cursor on desktop; each project's image wipes in over the previous one. */
function FloatingPreview({ projects, active, mx, my }) {
  const x = useSpring(useTransform(mx, (v) => v + 84), { stiffness: 140, damping: 20, mass: 0.5 });
  const y = useSpring(my, { stiffness: 140, damping: 20, mass: 0.5 });
  const vx = useVelocity(mx);
  const rotate = useSpring(useTransform(vx, [-1800, 1800], [-9, 9], { clamp: true }), { stiffness: 180, damping: 18 });
  const open = active >= 0;

  return (
    <motion.div aria-hidden="true" style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-40">
      <motion.div
        style={{ rotate }}
        animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.8 }}
        transition={{ duration: 0.5, ease }}
        className="absolute left-0 top-0 aspect-[4/3] w-[min(32vw,460px)] -translate-y-1/2 overflow-hidden rounded-2xl bg-night-3 shadow-[0_30px_80px_-20px_rgba(255,106,85,.45)]"
      >
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={false}
            animate={{ clipPath: active === i ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0"
            style={{ zIndex: active === i ? 2 : 1 }}
          >
            <motion.img
              src={p.image}
              alt=""
              draggable="false"
              initial={false}
              animate={{ scale: active === i ? 1 : 1.3 }}
              transition={{ duration: 1.1, ease }}
              className="h-full w-full object-cover"
            />
            {p.imageIsPlaceholder && (
              <span className="absolute bottom-3 left-3 rounded-full bg-night/85 px-3 py-1 text-[11px] font-semibold text-amber">
                Placeholder image
              </span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function Row({ p, i, active, anyActive, hover, setActive, mx, my, go }) {
  const ref = useRef(null);
  // touch / small screens: image wipes in when the card is in the middle of the viewport, or when touched
  const centred = useInView(ref, { margin: "-35% 0px -35% 0px" });
  const [touched, setTouched] = useState(false);
  const showInline = !hover && (centred || touched);
  const dimmed = hover && anyActive && !active;

  const open = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button > 0) return;
    e.preventDefault();
    go(`/projects/${p.slug}`);
  };

  const place = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(r.left + r.width * 0.55);
    my.set(r.top + r.height / 2);
  };

  return (
    <li ref={ref} className="border-t border-paper/20 last:border-b">
      <a
        href={`/projects/${p.slug}`}
        onClick={open}
        onMouseEnter={() => hover && setActive(i)}
        onMouseLeave={() => hover && setActive(-1)}
        onFocus={(e) => { if (hover) { place(e); setActive(i); } }}
        onBlur={() => hover && setActive(-1)}
        onPointerDown={() => !hover && setTouched(true)}
        data-cursor="view"
        data-cursor-label="Open"
        className="group block py-8 transition-opacity duration-500 md:py-12"
        style={{ opacity: dimmed ? 0.28 : 1 }}
        aria-label={`${p.title} — ${p.subtitle}. Open project details.`}
      >
        <div className="grid grid-cols-[1fr_auto] items-center gap-6 md:grid-cols-[13rem_1fr_15rem_auto]">
          <p className="hidden text-sm text-paper/55 md:block">{p.kicker}</p>
          <div className="transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)] md:group-hover:translate-x-5 md:group-focus-visible:translate-x-5">
            <h3 className="display-tight font-display text-[clamp(2.5rem,8.4vw,8rem)] font-extrabold">{p.title}</h3>
            <p className="mt-3 text-lg text-paper/65">{p.subtitle}</p>
            <p className="mt-1 text-sm text-paper/45 md:hidden">{p.kicker}</p>
          </div>
          <p className="hidden text-sm leading-relaxed text-paper/55 md:block">{p.stack.join(", ")}</p>
          <span className="grid h-14 w-14 place-items-center rounded-full border border-paper/35 transition-all duration-500 group-hover:rotate-45 group-hover:border-coral group-hover:bg-coral group-hover:text-night md:h-20 md:w-20">
            <ArrowUpRight size={26} aria-hidden="true" />
          </span>
        </div>

        {/* inline preview: touch + small screens (space is always reserved, so scrolling never jumps) */}
        <div className="inline-preview mt-6">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-night-3">
            <p className="absolute inset-0 grid place-items-center text-sm text-paper/40">Tap to open · preview loading</p>
            <motion.div
              initial={false}
              animate={{ clipPath: showInline ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0"
            >
              <motion.img
                src={p.image}
                alt={`${p.title} project preview (placeholder image — replace with a real screenshot)`}
                loading="lazy"
                initial={false}
                animate={{ scale: showInline ? 1 : 1.25 }}
                transition={{ duration: 1.2, ease }}
                className="h-full w-full object-cover"
              />
              {p.imageIsPlaceholder && (
                <span className="absolute bottom-3 left-3 rounded-full bg-night/85 px-3 py-1 text-[11px] font-semibold text-amber">
                  Placeholder image
                </span>
              )}
            </motion.div>
          </div>
          <p className="mt-3 text-sm text-paper/50">{p.stack.join(" · ")}</p>
        </div>
      </a>
    </li>
  );
}

export default function Projects() {
  const { projects } = useProjects();
  const hover = useHoverPreview();
  const go = useGo();
  const [active, setActive] = useState(-1);
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);

  const onMove = (e) => {
    if (!hover) return;
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  return (
    <SectionShell
  id="projects"
  tone="dark"
  label="/selected work"
  title=".. featured projects"
  className="!pb-12 md:!pb-16"
>
      <Fade className="mt-8 max-w-xl text-lg text-paper/65 md:mt-10">
        Two featured builds across the MERN stack. {hover ? "Hover a project to preview it, click to open." : "Scroll or tap a project to preview it, tap again to open."}
      </Fade>

      <ul className="mt-12 md:mt-20" onMouseMove={onMove}>
        {projects.map((p, i) => (
          <Row key={p.slug} p={p} i={i} active={active === i} anyActive={active >= 0} hover={hover} setActive={setActive} mx={mx} my={my} go={go} />
        ))}
      </ul>

      {hover && <FloatingPreview projects={projects} active={active} mx={mx} my={my} />}
    </SectionShell>
  );
}
