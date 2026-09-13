import { useEffect, useRef, useState } from "react";

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, .skill-pill, .tech-chip, .social-pill, .project-card, .glass-card, label';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let visible = false;

    const root = document.documentElement;

    const render = () => {
      ringX += (mouseX - ringX) * (reduced ? 1 : 0.16);
      ringY += (mouseY - ringY) * (reduced ? 1 : 0.16);
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!visible) {
        visible = true;
        root.classList.add("cursor-visible");
      }
    };
    const onLeave = () => {
      visible = false;
      root.classList.remove("cursor-visible");
    };
    const onOver = (event: MouseEvent) => {
      const hit = (event.target as HTMLElement | null)?.closest?.(INTERACTIVE);
      root.classList.toggle("cursor-hover", Boolean(hit));
    };
    const onDown = () => root.classList.add("cursor-press");
    const onUp = () => root.classList.remove("cursor-press");

    root.classList.add("has-custom-cursor");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.classList.remove("has-custom-cursor", "cursor-visible", "cursor-hover", "cursor-press");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
