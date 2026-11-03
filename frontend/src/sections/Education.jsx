import SectionShell from "../components/SectionShell";
import { Fade } from "../components/Reveal";
import { education, training } from "../data/portfolio";

export default function Education() {
  return (
    <SectionShell id="education" tone="dark" label="/learning" title=".. education">
      <div className="mt-14 md:mt-24">
        {education.map((e) => (
          <Fade key={e.title} className="group grid items-baseline gap-4 border-t border-paper/20 py-9 transition-colors duration-500 hover:border-amber md:grid-cols-12 md:py-12">
            <p className="font-display text-2xl font-bold text-amber md:col-span-3 md:text-3xl">{e.when}</p>
            <div className="md:col-span-7">
              <h3 className="font-display text-[clamp(1.7rem,3.4vw,3rem)] font-bold leading-tight tracking-tight transition-transform duration-700 group-hover:translate-x-2">{e.title}</h3>
              <p className="mt-2 text-lg text-paper/65">{e.place}</p>
            </div>
            <div className="md:col-span-2 md:text-right">
              {e.result && <span className="inline-block rounded-full border border-paper/30 px-4 py-1.5 text-sm">{e.result}</span>}
            </div>
          </Fade>
        ))}
        <div className="border-t border-paper/20" />
      </div>

      <div className="mt-20 grid gap-10 md:mt-28 md:grid-cols-12">
        <h3 className="font-display text-3xl font-bold tracking-tight md:col-span-4 md:text-5xl">Training &amp; workshops</h3>
        <ul className="md:col-span-8">
          {training.map((t) => (
            <Fade as="li" key={t.title} y={20} className="group flex flex-col gap-1 border-t border-paper/20 py-6 last:border-b md:flex-row md:items-baseline md:justify-between">
              <span className="text-xl font-medium transition-colors duration-300 group-hover:text-coral">{t.title}</span>
              <span className="text-paper/60">{t.org}</span>
            </Fade>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
