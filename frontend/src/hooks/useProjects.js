import { useEffect, useState } from "react";
import { projects as staticProjects } from "../data/portfolio";
import { fetchProjects } from "../lib/api";

// Static data renders instantly. If the Express/MongoDB API responds, its
// text fields (summary, highlights, stack, links) are merged on top.
// If the API is offline the site still works with the static data.
export function useProjects() {
  const [list, setList] = useState(staticProjects);
  const [source, setSource] = useState("static");

  useEffect(() => {
    let alive = true;
    fetchProjects()
      .then((remote) => {
        if (!alive || !remote?.length) return;
        const merged = staticProjects.map((p) => {
          const r = remote.find((x) => x.slug === p.slug);
          if (!r) return p;
          return {
            ...p,
            summary: r.summary || p.summary,
            stack: r.stack?.length ? r.stack : p.stack,
            highlights: r.highlights?.length ? r.highlights : p.highlights,
            links: { ...p.links, ...(r.links || {}) },
            image: r.image || p.image,
            imageIsPlaceholder: r.imageIsPlaceholder ?? p.imageIsPlaceholder,
          };
        });
        setList(merged);
        setSource("api");
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return { projects: list, source };
}
