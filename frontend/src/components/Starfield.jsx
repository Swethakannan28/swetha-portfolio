import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks/useMedia";

/** Canvas starfield with slow drift, twinkle and pointer parallax. Pauses off-screen. */
export default function Starfield({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = prefersReducedMotion();
    let w = 0, h = 0, dpr = 1, stars = [], raf = 0, visible = true;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const palette = ["241,234,220", "241,234,220", "241,234,220", "246,168,35", "255,106,85"];

    const build = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(240, Math.floor((w * h) / 7500));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        z: Math.random() * 0.9 + 0.1,
        r: Math.random() * 1.3 + 0.2,
        tw: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.02 + 0.005,
        c: palette[Math.floor(Math.random() * palette.length)],
      }));
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      for (const s of stars) {
        if (!reduced) {
          s.y -= s.z * 0.08;
          s.tw += s.sp;
          if (s.y < -2) { s.y = h + 2; s.x = Math.random() * w; }
        }
        const a = reduced ? 0.7 * s.z : (0.35 + 0.65 * Math.abs(Math.sin(s.tw))) * s.z;
        const x = s.x + pointer.x * s.z * 22;
        const y = s.y + pointer.y * s.z * 22;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.c},${a})`;
        ctx.arc(x, y, s.r * s.z + 0.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t) => {
      if (visible && window.scrollY < window.innerHeight * 1.4) draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      pointer.tx = e.clientX / window.innerWidth - 0.5;
      pointer.ty = e.clientY / window.innerHeight - 0.5;
    };

    build();
    if (reduced) draw(0);
    else raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(canvas);
    const ro = new ResizeObserver(() => { build(); if (reduced) draw(0); });
    ro.observe(canvas);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
