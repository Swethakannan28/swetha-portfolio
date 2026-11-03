import SectionShell from "../components/SectionShell";
import { Fade } from "../components/Reveal";
import { achievements } from "../data/portfolio";

export default function Achievements() {
  return (
    <SectionShell id="achievements" tone="light" label="/milestones" title=".. achievements">
      <ul className="mt-14 md:mt-24">
        {achievements.map((a) => (
          <Fade as="li" key={a.title} y={26} className="group relative border-t border-ink/25 py-8 md:py-10">
            <span aria-hidden="true" className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-paper-2 transition-transform duration-500 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-y-100" />
            <div className="relative grid gap-3 md:grid-cols-12 md:gap-8 md:px-4">
              <h3 className="font-display text-[clamp(1.5rem,2.9vw,2.5rem)] font-bold leading-tight tracking-tight md:col-span-7">{a.title}</h3>
              <p className="text-lg text-ink/70 md:col-span-5">{a.detail}</p>
            </div>
          </Fade>
        ))}
        <li className="border-t border-ink/25" aria-hidden="true" />
      </ul>

      
    </SectionShell>
  );
}
