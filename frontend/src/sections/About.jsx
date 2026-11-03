import SectionShell from "../components/SectionShell";
import { ScrubWords, Fade, CountUp } from "../components/Reveal";
import Button from "../components/Button";
import { about, profile } from "../data/portfolio";
import { scrollToId } from "../lib/scroll";

export default function About() {
  return (
    <SectionShell id="about" tone="light" label="/introduction" title=".. about me">
      <ScrubWords
        text={about.statement}
        className="mt-14 max-w-6xl font-display text-[clamp(1.9rem,4.7vw,4.4rem)] font-semibold leading-[1.08] tracking-tight md:mt-20"
      />

      <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12">
        <Fade className="space-y-6 text-lg leading-relaxed text-ink/80 md:col-span-5">
          {about.body.map((p) => <p key={p}>{p}</p>)}
          <p className="border-l-2 border-coral pl-5 text-ink">{about.open}</p>
          <p className="text-base text-ink/60">Languages: {about.languages.join(" · ")}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="dark" href={profile.resume} download>Download Resume</Button>
            <Button variant="outlineDark" onClick={() => scrollToId("projects")}>View Projects</Button>
          </div>
        </Fade>

        <div className="md:col-span-6 md:col-start-7">
          <dl className="grid grid-cols-2 border-ink/25">
            {about.facts.map((f, i) => (
              <Fade
                key={f.label}
                delay={i * 0.08}
                className={`border-ink/25 py-8 pr-4 ${i % 2 === 0 ? "border-r" : "pl-6 md:pl-10"} ${i < 2 ? "border-b" : ""}`}
              >
                <dd className="font-display text-[clamp(3.5rem,8vw,7rem)] font-extrabold leading-none tracking-tighter">
                  <CountUp to={f.value} />
                </dd>
                <dt className="mt-3 text-ink/65">{f.label}</dt>
              </Fade>
            ))}
          </dl>
        </div>
      </div>
    </SectionShell>
  );
}
