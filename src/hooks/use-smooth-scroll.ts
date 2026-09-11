import { useEffect, useLayoutEffect } from "react";

const EASE_FACTOR = 0.062; // lower = slower, more gliding
const WHEEL_MULTIPLIER = 0.62; // <1 reduces perceived scroll speed
const ANCHOR_DURATION = 1150;

type ScrollController = {
  scrollToId: (id: string) => void;
};

let activeController: ScrollController | null = null;

// Register input handlers before the browser paints the hydrated page. This
// keeps the first wheel interaction from escaping to native scrolling while
// the rest of the portfolio is mounting. `useEffect` remains the SSR-safe
// fallback because this module also renders on the server.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

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
 * Wheel/trackpad input is damped while native touch scrolling is untouched.
 */
export function useSmoothScroll() {
  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // The root shell has already disabled browser restoration before
    // hydration. Reassert the portfolio's defined initial position here so
    // the wheel controller and the page always share a zero-scroll baseline.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

    let wheelRaf = 0;
    let anchorRaf = 0;
    let target = 0;
    let current = 0;
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
      // Let actual nested scroll containers (such as a textarea) keep native
      // scrolling. `overflow: clip` and `hidden` are not scroll containers:
      // the portfolio shell uses `clip`, and treating it as one caused every
      // initial wheel event inside the page to bypass this smoother.
      const hasNestedScroller = path.some((node) => {
        if (!(node instanceof HTMLElement) || node === document.body || node === document.documentElement) {
          return false;
        }
        const overflowY = getComputedStyle(node).overflowY;
        return (overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight + 4;
      });
      if (hasNestedScroller) return;

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

    // Keep the smoother's baseline aligned with keyboard, scrollbar, browser
    // history, and any scroll that occurred before hydration. We deliberately
    // do not overwrite it while the wheel animation owns the scroll position.
    const onScroll = () => {
      if (!gliding && !anchorGliding) target = current = window.scrollY;
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
      // Do not gate this behind `(pointer: fine)`: hybrid laptops commonly
      // report a coarse primary pointer even when a mouse/trackpad emits wheel
      // events. That gate made initial scrolling fall back to native behavior.
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      if (activeController?.scrollToId === scrollToId) activeController = null;
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
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
