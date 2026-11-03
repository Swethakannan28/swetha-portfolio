import { useEffect, useState } from "react";

export function useMedia(query, initial = false) {
  const get = () => (typeof window !== "undefined" ? window.matchMedia(query).matches : initial);
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}

export const useReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");
export const useFinePointer = () => useMedia("(hover: hover) and (pointer: fine)");
// Desktop-style hover interactions (fine pointer AND wide enough for the floating preview)
export const useHoverPreview = () => useMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)");

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
