import { Words } from "./Reveal";

/** Panel wrapper: rounded top edge overlaps the previous section for a layered, curtain-like scroll. */
export default function SectionShell({ id, tone = "dark", label, title, children, className = "" }) {
  const light = tone === "light";
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative z-10 -mt-10 rounded-t-[2.25rem] px-5 pb-28 pt-20 md:-mt-14 md:rounded-t-[4rem] md:px-10 md:pb-40 md:pt-28 ${
        light ? "bg-paper text-ink" : "bg-night text-paper"
      } ${className}`}
    >
      <div className="mx-auto max-w-[1500px]">
        <div className={`flex items-center justify-between border-t pt-4 text-sm ${light ? "border-ink/25 text-ink/60" : "border-paper/20 text-paper/55"}`}>
          <span>{label}</span>
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-coral" />
        </div>
        <h2 className="display-tight mt-8 font-display text-[clamp(3rem,10.5vw,10rem)] font-extrabold md:mt-12">
  {title}
</h2>
        <div id={`${id}-title`} className="sr-only">{title}</div>
        {children}
      </div>
    </section>
  );
}
