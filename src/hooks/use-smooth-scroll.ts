import { useEffect } from "react";

const EASE_FACTOR = 0.062; // lower = slower, more gliding
const WHEEL_MULTIPLIER = 0.62; // <1 reduces perceived scroll speed
const ANCHOR_DURATION = 1150;

type ScrollController = {
  scrollToId: (id: string) => void;
};

let activeController: ScrollController | null = null;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function maxScroll() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

function jump(top: number) {
  window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
}

/**
 * Damped wheel scrolling + eased anchor navigation.
 * Desktop pointer devices only; native touch scrolling is untouched.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let wheelRaf = 0;
    let anchorRaf = 0;
    let target = window.scrollY;
    let current = window.scrollY;
    let gliding = false;
    let anchorGliding = false;

    const stopAnimations = () => {
      cancelAnimationFrame(wheelRaf);
      cancelAnimationFrame(anchorRaf);
      wheelRaf = 0;
      anchorRaf = 0;
      gliding = false;
      anchorGliding = false;
      target = current = window.scrollY;
    };

    const loop = () => {
      current += (target - current) * EASE_FACTOR;
      if (Math.abs(target - current) < 0.35) {
        current = target;
        jump(current);
        gliding = false;
        wheelRaf = 0;
        return;
      }
      jump(current);
      wheelRaf = requestAnimationFrame(loop);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.defaultPrevented) return;
      const path = event.composedPath() as HTMLElement[];
      // let inner scrollable areas (code block, textarea) behave natively
      if (path.some((node) => node?.scrollHeight > node?.clientHeight + 4 && node !== document.body && node !== document.documentElement && getComputedStyle(node).overflowY !== "visible")) return;

      event.preventDefault();
      if (anchorGliding) stopAnimations();
      const delta = event.deltaMode === 1 ? event.deltaY * 18 : event.deltaY;
      const base = gliding ? target : window.scrollY;
      target = Math.min(Math.max(base + delta * WHEEL_MULTIPLIER, 0), maxScroll());
      if (!gliding) {
        current = window.scrollY;
        gliding = true;
        wheelRaf = requestAnimationFrame(loop);
      }
    };

    const animateTo = (top: number) => {
      stopAnimations();
      const start = window.scrollY;
      const distance = Math.min(Math.max(top, 0), maxScroll()) - start;
      if (Math.abs(distance) < 2) return;
      anchorGliding = true;
      const startedAt = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - startedAt) / ANCHOR_DURATION, 1);
        jump(start + distance * easeInOutCubic(progress));
        if (progress < 1) anchorRaf = requestAnimationFrame(step);
        else {
          anchorGliding = false;
          anchorRaf = 0;
          target = current = window.scrollY;
        }
      };
      anchorRaf = requestAnimationFrame(step);
    };

    const scrollToId = (id: string) => {
      const element = document.getElementById(id);
      if (!element) return;
      const top = id === "top" ? 0 : element.getBoundingClientRect().top + window.scrollY - 88;
      if (reduced) {
        window.scrollTo({ top, behavior: "auto" });
        return;
      }
      animateTo(top);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")!.slice(1);
      if (!document.getElementById(id)) return;
      event.preventDefault();
      history.replaceState(null, "", `#${id}`);
      scrollToId(id);
    };

    activeController = { scrollToId };
    if (!reduced) {
      document.documentElement.style.scrollBehavior = "auto";
      document.addEventListener("click", onClick);
      if (fine) window.addEventListener("wheel", onWheel, { passive: false });
    }

    return () => {
      if (activeController?.scrollToId === scrollToId) activeController = null;
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", onWheel);
      stopAnimations();
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);
}

export function smoothScrollToId(id: string) {
  if (activeController) {
    activeController.scrollToId(id);
    return;
  }
  const element = document.getElementById(id);
  if (!element) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = element.getBoundingClientRect().top + window.scrollY - 88;
  if (reduced) {
    window.scrollTo({ top, behavior: "auto" });
    return;
  }
  const start = window.scrollY;
  const distance = top - start;
  const startedAt = performance.now();
  const step = (now: number) => {
    const progress = Math.min((now - startedAt) / ANCHOR_DURATION, 1);
    jump(start + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
