import { useGo } from "../components/Transition";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import Button from "../components/Button";

export default function NotFound() {
  const go = useGo();
  useDocumentMeta("Page not found | Swetha Kannan");
  return (
    <main id="main" className="grid min-h-[100svh] place-items-center bg-night px-5 text-center">
      <div>
        <p className="font-display text-[clamp(6rem,24vw,20rem)] font-extrabold leading-none tracking-tighter text-coral">404</p>
        <p className="mt-4 text-xl text-paper/70">This page doesn’t exist.</p>
        <div className="mt-8"><Button onClick={() => go("/")}>Back home</Button></div>
      </div>
    </main>
  );
}
