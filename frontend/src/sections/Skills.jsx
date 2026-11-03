import SectionShell from "../components/SectionShell";
import { Fade } from "../components/Reveal";
import { marqueeSkills, skills } from "../data/portfolio";

function MarqueeRow({ reverse = false, outline = false }) {
  const items = [...marqueeSkills, ...marqueeSkills];
  return (
    <div className="marquee overflow-hidden" aria-hidden="true">
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
        {items.map((s, i) => (
          <span key={i} className="flex items-center whitespace-nowrap font-display text-[clamp(2.6rem,7vw,6.5rem)] font-extrabold tracking-tight">
            <span
              className={outline ? "text-transparent" : ""}
              style={outline ? { WebkitTextStroke: "1.5px rgba(241,234,220,.55)" } : undefined}
            >
              {s}
            </span>
            <span className="mx-6 text-[0.5em] text-coral md:mx-10">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <SectionShell id="skills" tone="dark" label="/stack" title=".. skills & technologies">
      <div className="-mx-5 mt-14 space-y-2 md:-mx-10 md:mt-20">
        <MarqueeRow />
        <MarqueeRow reverse outline />
      </div>

      <div className="mt-16 md:mt-24">
        {skills.map((g, i) => (
          <Fade key={g.group} delay={0.04 * i} className="group grid gap-5 border-t border-paper/20 py-9 transition-colors duration-500 hover:border-coral md:grid-cols-12 md:py-12">
            <h3 className="font-display text-2xl font-bold tracking-tight md:col-span-4 md:text-4xl">{g.group}</h3>
            <ul className="flex flex-wrap gap-2.5 md:col-span-8">
              {g.items.map((it) => (
                <li
                  key={it}
                  className="rounded-full border border-paper/25 px-5 py-2.5 text-base text-paper/85 transition-all duration-300 hover:-translate-y-1 hover:border-coral hover:bg-coral hover:text-night"
                >
                  {it}
                </li>
              ))}
            </ul>
          </Fade>
        ))}
        <div className="border-t border-paper/20" />
      </div>
    </SectionShell>
  );
}
