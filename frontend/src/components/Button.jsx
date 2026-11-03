import { ArrowUpRight } from "lucide-react";
import Magnetic from "./Magnetic";

/**
 * Button — pill with a coral fill that sweeps up on hover + arrow swap.
 * Pass `href` for <a>, otherwise renders <button>.
 */
export default function Button({ children, href, onClick, variant = "solid", download, external, className = "", icon = true, disabled, ...rest }) {
  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm font-semibold tracking-wide transition-colors duration-500 isolate";
  const styles = {
    solid: "bg-paper text-night hover:text-night",
    outline: "border border-paper/35 text-paper hover:border-coral hover:text-night",
    dark: "bg-night text-paper hover:text-night",
    outlineDark: "border border-ink/40 text-ink hover:border-coral hover:text-night",
  }[variant];

  const content = (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 translate-y-[101%] rounded-[inherit] bg-coral transition-transform duration-500 ease-[cubic-bezier(.19,1,.22,1)] group-hover:translate-y-0"
      />
      <span className="relative">{children}</span>
      {icon && (
        <span className="relative grid h-5 w-5 place-items-center overflow-hidden">
          <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:translate-x-5 group-hover:-translate-y-5" aria-hidden="true" />
          <ArrowUpRight size={18} className="absolute -translate-x-5 translate-y-5 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" aria-hidden="true" />
        </span>
      )}
    </>
  );

  const cls = `${base} ${styles} ${disabled ? "pointer-events-none opacity-50" : ""} ${className}`;

  return (
    <Magnetic strength={0.28}>
      {href ? (
        <a
          href={href}
          className={cls}
          data-cursor="link"
          download={download}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          {content}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={cls} data-cursor="link" disabled={disabled} {...rest}>
          {content}
        </button>
      )}
    </Magnetic>
  );
}
