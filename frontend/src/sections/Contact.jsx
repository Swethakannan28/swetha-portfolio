import { ArrowUpRight, Mail, Linkedin, Github } from "lucide-react";
import SectionShell from "../components/SectionShell";
import { profile } from "../data/portfolio";

export default function Contact() {
  return (
    <SectionShell
      id="contact"
      tone="dark"
      label="/connect"
      title="Let's connect."
      className="!pb-24 md:!pb-32"
    >
      <div className="mt-10 grid gap-10 border-t border-paper/20 pt-10 md:grid-cols-2">
        <div>
          <p className="max-w-xl text-xl leading-relaxed text-paper/65 md:text-2xl">
            Have an opportunity, project or collaboration in mind?
            I'd love to hear from you.
          </p>
        </div>

        <div className="space-y-4">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center justify-between rounded-2xl border border-paper/25 p-5 transition-colors hover:border-coral hover:text-coral"
          >
            <span className="flex items-center gap-3">
              <Mail size={22} />
              Email Me
            </span>
            <ArrowUpRight size={22} />
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl border border-paper/25 p-5 transition-colors hover:border-coral hover:text-coral"
          >
            <span className="flex items-center gap-3">
              <Linkedin size={22} />
              LinkedIn
            </span>
            <ArrowUpRight size={22} />
          </a>

          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-paper/25 p-5 transition-colors hover:border-coral hover:text-coral"
            >
              <span className="flex items-center gap-3">
                <Github size={22} />
                GitHub
              </span>
              <ArrowUpRight size={22} />
            </a>
          )}
        </div>
      </div>
    </SectionShell>
  );
}