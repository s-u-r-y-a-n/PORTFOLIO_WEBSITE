import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomCursor } from "@/components/custom-cursor";
import { smoothScrollToId } from "@/hooks/use-smooth-scroll";
import { useTheme } from "@/hooks/use-theme";
import navItems from "@/data/navigation";
import { Hero } from "@/pages/Hero/Hero";
import { About } from "@/pages/About/About";
import { Skills } from "@/pages/Skills/Skills";
import { Architecture } from "@/pages/Architecture/Architecture";
import { Work } from "@/pages/Work/Work";
import { Experience } from "@/pages/Experience/Experience";
import { Contact } from "@/pages/Contact/Contact";

function scrollTo(id: string) {
  smoothScrollToId(id);
}

function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      className={`theme-toggle ${theme === "light" ? "is-light" : ""} ${className}`}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={theme === "light"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      <Moon className="theme-icon theme-icon-moon size-4" aria-hidden="true" />
      <Sun className="theme-icon theme-icon-sun size-4" aria-hidden="true" />
    </button>
  );
}

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const navListRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));
    const sectionItems = ["about", "skills", "work", "experience", "contact"]
      .map((id) => document.getElementById(id))
      .filter((item): item is HTMLElement => Boolean(item));

    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        }),
      // Start the one-shot reveal after the element has moved meaningfully
      // into view, without making tall sections wait for a large ratio.
      { threshold: 0, rootMargin: "0px 0px -18%" },
    );

    const visible = new Map<string, number>();
    const resolveActive = () => {
      if (window.scrollY < 140) return setActiveSection("top");
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        return setActiveSection("contact");
      }
      let best = "";
      let bestRatio = 0;
      visible.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      });
      if (best) setActiveSection(best);
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });
        resolveActive();
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.9], rootMargin: "-20% 0px -45%" },
    );

    // Resolve the initial viewport synchronously so reveals never wait for the first scroll.
    const revealInViewport = () => {
      revealItems.forEach((item) => {
        if (item.classList.contains("is-visible")) return;
        const rect = item.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight * 0.82) {
          item.classList.add("is-visible");
          revealObserver.unobserve(item);
        }
      });
    };

    revealInViewport();
    revealItems.forEach((item) => {
      if (!item.classList.contains("is-visible")) revealObserver.observe(item);
    });
    sectionItems.forEach((item) => sectionObserver.observe(item));
    resolveActive();
    window.addEventListener("scroll", resolveActive, { passive: true });
    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", resolveActive);
    };
  }, []);

  const measureIndicator = useCallback(() => {
    const list = navListRef.current;
    const link = linkRefs.current[activeSection];
    if (!list || !link) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    const listBox = list.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    setIndicator({ left: linkBox.left - listBox.left, width: linkBox.width, visible: true });
  }, [activeSection]);

  useEffect(() => {
    measureIndicator();
    window.addEventListener("resize", measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
  }, [measureIndicator]);

  return (
    <div className="portfolio-shell">
      <CustomCursor />
      <header
        className={`navbar-shell fixed inset-x-0 top-4 z-50 px-4 sm:top-6 ${scrolled ? "navbar-scrolled" : ""}`}
      >
        <nav
          className="glass-nav nav-inner mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center px-3 py-2"
          aria-label="Primary navigation"
        >
          <a
            href="#top"
            className="nav-brand flex min-w-0 items-center gap-3 rounded-full pr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="nav-brand-mark grid size-10 shrink-0 place-items-center rounded-full bg-primary font-mono text-xs font-bold text-primary-foreground">
              SN
            </span>
            <span className="truncate text-sm font-semibold">Surya N</span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            <div ref={navListRef} className="relative flex items-center gap-1">
              <span
                aria-hidden="true"
                className={`nav-indicator ${indicator.visible ? "is-visible" : ""}`}
                style={{
                  transform: `translateX(${indicator.left}px)`,
                  width: `${indicator.width}px`,
                }}
              />
              {navItems.map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  ref={(node) => {
                    linkRefs.current[id] = node;
                  }}
                  className={`nav-link ${activeSection === id ? "is-active" : ""}`}
                  aria-current={activeSection === id ? "location" : undefined}
                >
                  {label}
                </a>
              ))}
            </div>
            <Button
              asChild
              variant="outline"
              className="ml-2 h-10 rounded-full border-border bg-secondary/60 px-4 text-xs backdrop-blur-xl"
            >
              <a href="/surya-n-resume.pdf" download>
                <Download /> Resume{" "}
                <span className="font-mono text-[10px] text-muted-foreground">PDF</span>
              </a>
            </Button>
            <ThemeToggle className="ml-1" />
          </div>
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className={`menu-toggle relative rounded-full ${menuOpen ? "is-open" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Menu className="menu-icon menu-icon-open" />
              <X className="menu-icon menu-icon-close" />
            </Button>
          </div>
          <div
            className={`mobile-menu col-span-2 grid gap-1 md:hidden ${menuOpen ? "is-open" : ""}`}
            aria-hidden={!menuOpen}
          >
            <div className="grid gap-1 border-t border-border/60 px-1 pt-3 pb-1">
              {navItems.map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`mobile-nav-link rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground ${activeSection === id ? "is-active" : ""}`}
                  aria-current={activeSection === id ? "location" : undefined}
                >
                  {label}
                </a>
              ))}
              <a
                href="/surya-n-resume.pdf"
                download
                className="mt-1 flex items-center justify-between rounded-lg bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground"
              >
                Resume (PDF)
                <Download className="size-4" />
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main id="top">
        <Hero />
        <About />
        <Skills />
        <Architecture />
        <Work />
        <Experience />
        <Contact />
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-border/60 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>© 2026 Surya N. Built with intent.</p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/s-u-r-y-a-n"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-foreground"
          >
            <Github className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/surya30112000/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-foreground"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=surya86104@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email (Gmail)"
            className="hover:text-foreground"
          >
            <Mail className="size-4" />
          </a>
          <a
            href="https://wa.me/918903091256"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hover:text-foreground"
          >
            <MessageCircle className="size-4" />
          </a>
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              scrollTo("top");
            }}
            className="flex items-center gap-2 hover:text-foreground"
          >
            Back to top <ArrowUpRight className="size-3" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Portfolio;
