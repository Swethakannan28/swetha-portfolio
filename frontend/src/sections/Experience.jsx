import SectionShell from "../components/SectionShell";
import { Fade } from "../components/Reveal";
import { experience } from "../data/portfolio";

export default function Experience() {
  return (
    <SectionShell id="experience" tone="light" label="/work" title=".. experience">
      <div className="mt-14 md:mt-24">
        {experience.map((e) => (
          <Fade key={e.role} as="article" className="group relative grid gap-8 border-t border-ink/25 py-12 md:grid-cols-12 md:py-16">
            <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-coral transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-x-100" />
            <div className="md:col-span-7">
              <h3 className="font-display text-[clamp(2.2rem,5.4vw,5rem)] font-extrabold leading-[0.95] tracking-tight transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover:translate-x-3">
                {e.role}
              </h3>
              <p className="mt-4 text-xl text-coral md:text-2xl">{e.company}</p>
            </div>
            <ul className="space-y-4 text-lg leading-relaxed text-ink/80 md:col-span-5">
              {e.points.map((p) => (
                <li key={p} className="flex gap-4">
                  <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-amber" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Fade>
        ))}
        <div className="border-t border-ink/25" />
      </div>
    </SectionShell>
  );
}
