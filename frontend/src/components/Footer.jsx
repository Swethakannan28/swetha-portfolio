import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/portfolio";
import { Words, Fade } from "./Reveal";
import Button from "./Button";
import { scrollToTop } from "../lib/scroll";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 -mt-10 overflow-hidden rounded-t-[2.25rem] bg-paper px-5 pb-8 pt-20 text-ink md:-mt-14 md:rounded-t-[4rem] md:px-10 md:pt-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p lang="ta" className="font-tamil text-xl font-bold text-coral">நன்றி</p>
            <Words
              as="p"
              text="Thanks for stopping by. I hope something here sparks an idea."
              className="mt-4 max-w-2xl font-display text-[clamp(2rem,4.6vw,4rem)] font-bold leading-[1.05] tracking-tight"
            />
          </div>

          <Fade className="md:col-span-5">
            <ul className="space-y-1 text-lg">
              <li>
                <a href={`mailto:${profile.email}`} className="group flex items-center justify-between border-b border-ink/20 py-4 transition-colors hover:text-coral" data-cursor="link">
                  <span className="flex items-center gap-3"><Mail size={20} aria-hidden="true" /> {profile.email}</span>
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b border-ink/20 py-4 transition-colors hover:text-coral" data-cursor="link">
                  <span className="flex items-center gap-3"><Linkedin size={20} aria-hidden="true" /> LinkedIn</span>
                  <span className="text-sm text-ink/55">{profile.linkedinLabel}</span>
                </a>
              </li>
              <li>
                {profile.github ? (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border-b border-ink/20 py-4 transition-colors hover:text-coral" data-cursor="link">
                    <Github size={20} aria-hidden="true" /> GitHub
                  </a>
                ) : (
                  <p className="flex items-center justify-between border-b border-dashed border-ink/25 py-4 text-ink/55">
                    <span className="flex items-center gap-3"><Github size={20} aria-hidden="true" /> GitHub</span>
                    <span className="text-sm">Placeholder — link not added yet</span>
                  </p>
                )}
              </li>
            </ul>
            <div className="mt-8">
              <Button variant="dark" onClick={() => scrollToTop()} icon={false}>
                <span className="flex items-center gap-2">Back to top <ArrowUp size={16} aria-hidden="true" /></span>
              </Button>
            </div>
          </Fade>
        </div>

        <div aria-hidden="true" className="mt-20 select-none overflow-hidden md:mt-28">
          <p className="display-tight break-words text-center font-display text-[clamp(2.5rem,12vw,11rem)] leading-[0.95] font-extrabold tracking-tight text-ink">
            SWETHA KANNAN
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-ink/20 pt-5 text-sm text-ink/60 md:flex-row md:items-center md:justify-between">
          <p>© {year} Swetha Kannan · {profile.location}</p>
          <p>Built with React, GSAP, Motion and Lenis.</p>
        </div>
      </div>
    </footer>
  );
}
