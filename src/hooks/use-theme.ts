import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "portfolio-theme";

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
  window.setTimeout(() => root.classList.remove("theme-transition"), 450);
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial: Theme = stored === "light" ? "light" : "dark";
    setTheme(initial);
    apply(initial);
  }, []);

  const toggle = useCallback(() => {
    setTheme((previous) => {
      const next: Theme = previous === "dark" ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEY, next);
      apply(next);
      return next;
    });
  }, []);

  return { theme, toggle };
}
