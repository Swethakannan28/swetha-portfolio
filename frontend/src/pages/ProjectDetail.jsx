import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
ArrowLeft,
ArrowUpRight,
Github,
ExternalLink,
} from "lucide-react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { prefersReducedMotion } from "../hooks/useMedia";
import { useProjects } from "../hooks/useProjects";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useGo } from "../components/Transition";
import { Words, Fade } from "../components/Reveal";
import Button from "../components/Button";
import Footer from "../components/Footer";
import NotFound from "./NotFound";

function LinkSlot({ href, icon: Icon, label, placeholder }) {
if (href) {
return ( <Button href={href} external variant="solid"> <span className="flex items-center gap-2"> <Icon size={18} aria-hidden="true" />
{label} </span> </Button>
);
}

return ( <p className="inline-flex items-center gap-3 rounded-full border border-dashed border-paper/35 px-6 py-4 text-sm text-paper/60"> <Icon size={18} aria-hidden="true" />
{label} — {placeholder} </p>
);
}

export default function ProjectDetail() {
const { slug } = useParams();
const { projects } = useProjects();
const go = useGo();
const imgRef = useRef(null);

const idx = projects.findIndex((p) => p.slug === slug);
const p = projects[idx];

const next =
projects.length > 1
? projects[(idx + 1) % projects.length]
: null;

useDocumentMeta(
p
? `${p.title} — ${p.subtitle} | Swetha Kannan`
: "Project not found | Swetha Kannan",
p?.summary
);

useEffect(() => {
if (!p || prefersReducedMotion() || !imgRef.current) return;


const ctx = gsap.context(() => {
  gsap.fromTo(
    imgRef.current,
    { clipPath: "inset(0% 0% 100% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.6,
      ease: "expo.inOut",
      delay: 0.5,
    }
  );

  const heroImage = imgRef.current.querySelector("img");

  if (heroImage) {
    gsap.fromTo(
      heroImage,
      { scale: 1.35 },
      {
        scale: 1,
        duration: 2,
        ease: "expo.out",
        delay: 0.5,
      }
    );
  }
});

return () => ctx.revert();


}, [p]);

useEffect(() => {
const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
return () => clearTimeout(timer);
}, [slug]);

if (!p) return <NotFound />;

const screenshots = Array.isArray(p.screenshots)
? p.screenshots
: [];

return (
<> <main
     id="main"
     className="relative z-10 bg-night px-5 pb-32 pt-32 md:px-10 md:pt-40"
   > <div className="mx-auto max-w-[1500px]">
<a
href="/#projects"
onClick={(e) => {
e.preventDefault();
go("/#projects");
}}
className="group inline-flex items-center gap-2 text-paper/70 transition-colors hover:text-coral"
> <ArrowLeft
           size={18}
           className="transition-transform group-hover:-translate-x-1"
           aria-hidden="true"
         />
All projects </a>


      <p className="mt-12 text-paper/55">{p.kicker}</p>

      <Words
        as="h1"
        text={p.title}
        trigger="manual"
        className="display-tight mt-3 font-display text-[clamp(3.2rem,12vw,12rem)] font-extrabold"
        delay={0.2}
      />

      <Fade
        as="p"
        className="mt-6 max-w-2xl font-display text-2xl font-semibold leading-snug md:text-4xl"
      >
        {p.subtitle}
      </Fade>

      <div
        ref={imgRef}
        className="relative mx-auto mt-14 aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-3xl bg-night-3 md:mt-20"
      >
        <img
          src={p.image}
          alt={`${p.title} project preview`}
          className="h-full w-full object-cover"
        />

        {p.imageIsPlaceholder && (
          <span className="absolute bottom-4 left-4 rounded-full bg-night/85 px-4 py-1.5 text-xs font-semibold text-amber">
            Placeholder image — replace with a real screenshot
          </span>
        )}
      </div>

      <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12">
        <Fade className="md:col-span-5">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Overview
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-paper/75">
            {p.summary}
          </p>

          <h3 className="mt-12 font-display text-xl font-bold">
            Tech stack
          </h3>

          <ul className="mt-4 flex flex-wrap gap-2.5">
            {p.stack.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-paper/30 px-4 py-2 text-sm text-paper/85"
              >
                {skill}
              </li>
            ))}
          </ul>
        </Fade>

        <Fade
          className="md:col-span-6 md:col-start-7"
          delay={0.1}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            What it covers
          </h2>

          <ul className="mt-5">
            {p.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-4 border-t border-paper/20 py-5 text-lg leading-relaxed text-paper/80 last:border-b"
              >
                <span
                  aria-hidden="true"
                  className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-amber"
                />
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <LinkSlot
              href={p.links?.github}
              icon={Github}
              label="Source code"
              placeholder="GitHub link not added yet"
            />

            <LinkSlot
              href={p.links?.live}
              icon={ExternalLink}
              label="Live demo"
              placeholder="link not added yet"
            />
          </div>
        </Fade>
      </div>

      <section
        aria-labelledby="shots"
        className="mt-24 md:mt-32"
      >
        <h2
          id="shots"
          className="font-display text-3xl font-bold tracking-tight md:text-4xl"
        >
          Screenshots
        </h2>

        {screenshots.length > 0 ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {screenshots.map((src, i) => (
              <Fade key={src} delay={i * 0.07}>
                <div className="group overflow-hidden rounded-3xl border border-paper/20 bg-night-2">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={src}
                      alt={`${p.title} screenshot ${i + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <p className="px-4 py-3 text-sm text-paper/70">
                    {p.title} — Screenshot {i + 1}
                  </p>
                </div>
              </Fade>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-paper/55">
            Screenshots will be added soon.
          </p>
        )}
      </section>

      {next && (
        <a
          href={`/projects/${next.slug}`}
          onClick={(e) => {
            e.preventDefault();
            go(`/projects/${next.slug}`);
          }}
          data-cursor="view"
          data-cursor-label="Next"
          className="group mt-28 block border-t border-paper/20 pt-8 md:mt-40"
        >
          <p className="text-paper/55">Next project</p>

          <div className="mt-3 flex items-center justify-between gap-6">
            <span className="display-tight font-display text-[clamp(2.4rem,8vw,8rem)] font-extrabold transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover:translate-x-4">
              {next.title}
            </span>

            <ArrowUpRight
              size={44}
              className="flex-none transition-all duration-500 group-hover:rotate-45 group-hover:text-coral"
              aria-hidden="true"
            />
          </div>
        </a>
      )}
    </div>
  </main>

  <Footer />
</>


);
}
