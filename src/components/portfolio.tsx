import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Send,
  Sun,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomCursor } from "@/components/custom-cursor";
import { useSmoothScroll, smoothScrollToId } from "@/hooks/use-smooth-scroll";
import { useTheme } from "@/hooks/use-theme";
import financeImage from "@/assets/project-finance.jpg";
import admissionsImage from "@/assets/project-admissions.jpg";
import commerceImage from "@/assets/project-commerce.jpg";

const navItems = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Work", "work"],
  ["Experience", "experience"],
  ["Contact", "contact"],
] as const;

const skillGroups = [
  {
    number: "01",
    title: "Frontend Architecture",
    copy: "Interfaces that stay fast, intuitive, and maintainable as products grow.",
    skills: ["React", "TypeScript", "Next.js", "Redux / Zustand", "Tailwind", "HTML5 / CSS3"],
    primary: ["React", "TypeScript", "Next.js"],
  },
  {
    number: "02",
    title: "Backend & APIs",
    copy: "Reliable service layers designed around clear contracts and safe data flow.",
    skills: ["Node.js", "Express", "RESTful APIs", "GraphQL", "Auth / JWT", "WebSockets"],
    primary: ["Node.js", "Express", "RESTful APIs"],
  },
  {
    number: "03",
    title: "Database & Cloud",
    copy: "Pragmatic infrastructure that is observable, resilient, and ready to scale.",
    skills: ["MongoDB", "MySQL", "AWS Services", "Docker", "CI / CD", "Serverless"],
    primary: ["MongoDB", "AWS Services", "Serverless"],
  },
];

const architecture = [
  ["React Application", "Interfaces & State"],
  ["API Gateway & Router", "REST, GraphQL, DTO Validation"],
  ["Security & Guardrails", "JWT, RBAC, Middleware"],
  ["Node.js Core Services", "Express, Async Logic, WebSockets"],
  ["Data & Cloud Infrastructure", "MongoDB, AWS, Serverless, S3"],
] as const;

const projects = [
  {
    number: "01",
    title: "Finance & Expenses Tracker",
    type: "FINTECH · FULL STACK",
    image: financeImage,
    description: "A secure financial command center that turns daily transactions into useful, actionable insight.",
    highlights: ["Role-aware expense workflows", "Live analytics and category trends", "Optimized relational data model"],
    stack: ["Node.js", "Express", "MySQL", "React", "Chart.js"],
  },
  {
    number: "02",
    title: "Admission & Student Management",
    type: "EDTECH · SERVERLESS",
    image: admissionsImage,
    description: "A serverless operations platform for the complete student journey, from enquiry to enrollment.",
    highlights: ["Event-driven admissions pipeline", "Granular access and audit trails", "Scalable AWS infrastructure"],
    stack: ["Node.js", "AWS SAM", "DynamoDB", "React"],
  },
  {
    number: "03",
    title: "Scalable Commerce Platform",
    type: "COMMERCE · SAAS",
    image: commerceImage,
    description: "A modular storefront and operations suite built for conversion, dependable payments, and growth.",
    highlights: ["Stripe checkout and webhooks", "Inventory and order orchestration", "Reusable storefront system"],
    stack: ["MERN Stack", "Stripe", "Tailwind"],
  },
];

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
  const [typedName, setTypedName] = useState("");
  const [sent, setSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const navListRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  useSmoothScroll();

  useEffect(() => {
    const text = "Hi, I'm Surya N.";
    if (typedName.length >= text.length) return;
    const timer = window.setTimeout(() => setTypedName(text.slice(0, typedName.length + 1)), 72);
    return () => window.clearTimeout(timer);
  }, [typedName]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const delta = y - last;
      if (Math.abs(delta) > 6) {
        setHidden(y > 320 && delta > 0);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) setHidden(false);
  }, [menuOpen]);


  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));
    const sectionItems = ["about", "skills", "work", "experience", "contact"]
      .map((id) => document.getElementById(id))
      .filter((item): item is HTMLElement => Boolean(item));

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
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

    revealItems.forEach((item) => revealObserver.observe(item));
    sectionItems.forEach((item) => sectionObserver.observe(item));
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


  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <div className="portfolio-shell">
      <CustomCursor />
      <header className={`navbar-shell fixed inset-x-0 top-4 z-50 px-4 sm:top-6 ${scrolled ? "navbar-scrolled" : ""} ${hidden ? "navbar-hidden" : ""}`}>
        <nav className="glass-nav nav-inner mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center px-3 py-2" aria-label="Primary navigation">
          <a href="#top" className="nav-brand flex min-w-0 items-center gap-3 rounded-full pr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="nav-brand-mark grid size-10 shrink-0 place-items-center rounded-full bg-primary font-mono text-xs font-bold text-primary-foreground">SN</span>
            <span className="truncate text-sm font-semibold">Surya N</span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            <div ref={navListRef} className="relative flex items-center gap-1">
              <span
                aria-hidden="true"
                className={`nav-indicator ${indicator.visible ? "is-visible" : ""}`}
                style={{ transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }}
              />
              {navItems.map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  ref={(node) => { linkRefs.current[id] = node; }}
                  className={`nav-link ${activeSection === id ? "is-active" : ""}`}
                  aria-current={activeSection === id ? "location" : undefined}
                >{label}</a>
              ))}
            </div>
            <Button asChild variant="outline" className="ml-2 h-10 rounded-full border-border bg-secondary/60 px-4 text-xs backdrop-blur-xl">
              <a href="/surya-n-resume.pdf" download><Download /> Resume <span className="font-mono text-[10px] text-muted-foreground">PDF</span></a>
            </Button>
            <ThemeToggle className="ml-1" />
          </div>
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className={`menu-toggle relative rounded-full ${menuOpen ? "is-open" : ""}`} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
              <Menu className="menu-icon menu-icon-open" />
              <X className="menu-icon menu-icon-close" />
            </Button>
          </div>
          <div className={`mobile-menu col-span-2 grid gap-1 md:hidden ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
            <div className="grid gap-1 border-t border-border/60 px-1 pt-3 pb-1">
              {navItems.map(([label, id]) => (
                <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className={`mobile-nav-link rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground ${activeSection === id ? "is-active" : ""}`} aria-current={activeSection === id ? "location" : undefined}>{label}</a>
              ))}
              <a href="/surya-n-resume.pdf" download className="mt-1 flex items-center justify-between rounded-lg bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground">Resume (PDF)<Download className="size-4" /></a>
            </div>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="relative flex min-h-[94vh] items-center overflow-hidden px-5 pt-28 pb-16 sm:px-8 lg:px-12" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.08fr_.92fr]">
            <div className="reveal max-w-3xl">
              <div className="status-chip mb-8"><span className="pulse-dot" />Available for full-stack opportunities</div>
               <h1 id="hero-title" className="text-[clamp(2.8rem,6.6vw,6.35rem)] font-semibold leading-[.92] tracking-normal">
                <span className="block min-h-[1em]">{typedName}<span className="type-cursor">|</span></span>
                <span className="text-gradient mt-3 block">Full Stack<br className="hidden sm:block" /> Developer.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">I build dependable web applications from interface to infrastructure, with React, Node.js, MongoDB, and modern cloud services.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" onClick={() => scrollTo("work")} className="h-13 rounded-full px-6 text-sm shadow-[var(--shadow-accent)]">View projects <ArrowDown /></Button>
                <Button asChild size="lg" variant="outline" className="h-13 rounded-full border-border bg-secondary/60 px-6 text-sm backdrop-blur-xl">
                  <a href="/surya-n-resume.pdf" download>Download resume <span className="font-mono text-[10px] text-muted-foreground">PDF</span></a>
                </Button>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                <SocialLink icon={<Github />} label="GitHub" href="https://github.com/" />
                <SocialLink icon={<Linkedin />} label="LinkedIn" href="https://linkedin.com/" />
                <SocialLink icon={<Mail />} label="Email" href="mailto:surya@example.com" />
              </div>
            </div>
            <Terminal />
          </div>
          <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] tracking-[.18em] text-muted-foreground uppercase lg:flex">Scroll to explore <ChevronDown className="size-3" /></div>
        </section>

        <section id="about" className="section-wrap scroll-reveal border-t border-border/50" aria-labelledby="about-title">
          <SectionLabel number="01" label="About" />
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-24">
            <h2 id="about-title" className="section-title">Building products with clarity and intent.</h2>
             <div className="space-y-6 text-base leading-8 text-muted-foreground">
               <p className="text-lg leading-8 text-foreground">With 1.5+ years in professional engineering, I turn product intent into reliable software that people can trust.</p>
              <p>My approach connects thoughtful interfaces to resilient APIs, deliberate database schemas, and cloud architecture that is easy to operate. The result is less friction for users—and fewer surprises for teams.</p>
            </div>
          </div>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <Metric value="1.5+ yrs" label="Professional Experience" />
            <Metric value="React + Node" label="Primary Stack & Cloud Focus" />
            <Metric value="End-to-End" label="Architecture & Systems Thinking" />
          </div>
        </section>

        <section id="skills" className="section-wrap scroll-reveal" aria-labelledby="skills-title">
          <SectionLabel number="02" label="Capabilities" />
          <h2 id="skills-title" className="section-title max-w-3xl">The stack behind the work.</h2>
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {skillGroups.map((group) => (
               <article key={group.number} className="glass-card reveal-child flex min-h-[29rem] flex-col p-6 sm:p-8">
                <span className="font-mono text-xs text-accent-amber">/{group.number}</span>
                 <h3 className="mt-12 text-xl font-semibold sm:text-[1.35rem]">{group.title}</h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{group.copy}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-9">
                  {group.skills.map((skill) => <span key={skill} className={group.primary.includes(skill) ? "skill-pill skill-pill-primary" : "skill-pill"}>{skill}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-wrap scroll-reveal grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-24" aria-labelledby="architecture-title">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel number="03" label="Backend thinking" />
            <h2 id="architecture-title" className="section-title">More than a pretty frontend.</h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">I engineer the full request lifecycle—from a user's first interaction to the final data write—with security, observability, and graceful failure in mind.</p>
          </div>
          <ol className="space-y-3">
            {architecture.map(([title, description], index) => (
               <li key={title} className="reveal-child relative">
                <div className="architecture-slab grid grid-cols-[auto_minmax(0,1fr)] items-center gap-5 p-5 sm:p-6">
                  <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0"><h3 className="text-base font-semibold">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>
                </div>
                {index < architecture.length - 1 && <ArrowDown className="relative z-10 mx-auto -my-1 size-4 text-primary" aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </section>

        <section id="work" className="section-wrap scroll-reveal" aria-labelledby="work-title">
          <SectionLabel number="04" label="Selected work" />
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <h2 id="work-title" className="section-title max-w-2xl">Products built for real-world complexity.</h2>
            <p className="max-w-xs text-sm leading-6 text-muted-foreground">Selected systems spanning financial analytics, education operations, and commerce.</p>
          </div>
          <div className="mt-14 space-y-8">
            {projects.map((project, index) => <ProjectCard key={project.number} project={project} reversed={index % 2 === 1} />)}
          </div>
        </section>

        <section id="experience" className="section-wrap scroll-reveal" aria-labelledby="experience-title">
          <SectionLabel number="05" label="Experience" />
          <h2 id="experience-title" className="section-title">Shipping across the stack.</h2>
          <article className="glass-card mt-14 grid gap-10 p-6 sm:p-10 lg:grid-cols-[.35fr_.65fr]">
            <div>
              <div className="status-chip"><span className="pulse-dot" />Current role</div>
              <p className="mt-7 font-mono text-xs text-muted-foreground">2024 — PRESENT</p>
            </div>
            <div>
              <p className="font-mono text-xs text-primary">FULL STACK DEVELOPER</p>
               <h3 className="mt-3 text-xl font-semibold sm:text-2xl">Professional Engineering Experience</h3>
              <ul className="mt-8 grid gap-5 text-sm leading-7 text-muted-foreground">
                <li className="experience-item">Delivered end-to-end product features across React interfaces, Node.js APIs, data models, and cloud deployments.</li>
                <li className="experience-item">Improved backend response paths through query optimization, predictable contracts, and robust async workflows.</li>
                <li className="experience-item">Built reusable frontend systems that increased delivery consistency while preserving accessibility and performance.</li>
              </ul>
            </div>
          </article>
        </section>

        <section id="contact" className="section-wrap scroll-reveal pb-12" aria-labelledby="contact-title">
          <div className="contact-panel grid gap-14 p-6 sm:p-10 lg:grid-cols-[.8fr_1.2fr] lg:p-14">
            <div>
              <SectionLabel number="06" label="Contact" />
              <h2 id="contact-title" className="section-title">Let’s build something dependable.</h2>
              <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">Have a product challenge, a role, or an idea worth exploring? I’d like to hear about it.</p>
              <a href="mailto:surya@example.com" className="mt-9 inline-flex items-center gap-3 rounded-full border border-border bg-secondary/50 px-4 py-3 text-sm transition-colors hover:border-primary/60"><Mail className="size-4 text-primary" />surya@example.com</a>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><span className="pulse-dot" />Available for the right opportunity</div>
            </div>
            <form onSubmit={submitContact} className="grid gap-5" aria-label="Contact form">
              <FloatingField label="Your name" name="name" type="text" required />
              <FloatingField label="Email address" name="email" type="email" required />
              <label className="floating-field"><textarea name="message" placeholder=" " rows={5} required /><span>Tell me about your project</span></label>
              <Button type="submit" size="lg" className="h-13 rounded-full sm:justify-self-start">
                {sent ? <><CheckCircle2 /> Message ready</> : <>Send message <Send /></>}
              </Button>
              {sent && <p role="status" className="text-sm text-primary">Thanks — I’ll get back to you soon.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-border/60 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>© 2026 Surya N. Built with intent.</p>
        <div className="flex items-center gap-5"><a href="https://github.com/" aria-label="GitHub" className="hover:text-foreground"><Github className="size-4" /></a><a href="https://linkedin.com/" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="size-4" /></a><a href="#top" className="flex items-center gap-2 hover:text-foreground">Back to top <ArrowUpRight className="size-3" /></a></div>
      </footer>
    </div>
  );
}

function Terminal() {
  return (
    <aside className="terminal-window reveal-delay" aria-label="Code profile preview">
      <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
        <div className="flex gap-2" aria-hidden="true"><span className="traffic bg-accent-coral" /><span className="traffic bg-accent-amber" /><span className="traffic bg-accent-lime" /></div>
        <span className="font-mono text-[11px] text-muted-foreground">surya-stack.js</span><span className="w-12" />
      </div>
      <pre className="overflow-x-auto p-6 font-mono text-[12px] leading-7 sm:p-8 sm:text-sm"><code><span className="code-dim">01</span>  <span className="code-coral">const</span> developer = {"{"}{"\n"}<span className="code-dim">02</span>    name: <span className="code-lime">'Surya N'</span>,{"\n"}<span className="code-dim">03</span>    role: <span className="code-lime">'Full Stack Developer'</span>,{"\n"}<span className="code-dim">04</span>    crafts: [{"\n"}<span className="code-dim">05</span>      <span className="code-lime">'resilient APIs'</span>,{"\n"}<span className="code-dim">06</span>      <span className="code-lime">'thoughtful interfaces'</span>,{"\n"}<span className="code-dim">07</span>      <span className="code-lime">'cloud systems'</span>{"\n"}<span className="code-dim">08</span>    ],{"\n"}<span className="code-dim">09</span>    available: <span className="text-primary">true</span>{"\n"}<span className="code-dim">10</span>  {"}"};{"\n\n"}<span className="code-dim">11</span>  developer.<span className="text-primary">build</span>();<span className="type-cursor">_</span></code></pre>
      <div className="flex items-center justify-between border-t border-border/60 px-5 py-3 font-mono text-[10px] text-muted-foreground"><span>node v22.0</span><span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-accent-lime" />ready</span></div>
    </aside>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return <div className="mb-7 flex items-center gap-3 font-mono text-[11px] tracking-[.16em] uppercase"><span className="text-primary">{number}</span><span className="h-px w-8 bg-border" /><span className="text-muted-foreground">{label}</span></div>;
}

function Metric({ value, label }: { value: string; label: string }) {
  return <article className="glass-card p-6 sm:p-7"><p className="text-2xl font-semibold text-primary">{value}</p><p className="mt-3 text-sm text-muted-foreground">{label}</p></article>;
}

function SocialLink({ icon, label, href }: { icon: ReactNode; label: string; href: string }) {
  return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="social-pill group">{icon}<span>{label}</span><ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>;
}

function ProjectCard({ project, reversed }: { project: (typeof projects)[number]; reversed: boolean }) {
  return (
    <article className="project-card reveal-child grid overflow-hidden lg:grid-cols-2">
      <div className={`group relative min-h-72 overflow-hidden lg:min-h-[32rem] ${reversed ? "lg:order-2" : ""}`}>
        <img src={project.image} alt={`${project.title} interface preview`} loading="lazy" width={1280} height={800} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
        <span className="absolute top-5 left-5 rounded-full border border-border bg-background/80 px-3 py-1.5 font-mono text-[10px] backdrop-blur-xl">PROJECT {project.number}</span>
      </div>
      <div className="flex flex-col p-6 sm:p-9 lg:p-11">
        <p className="font-mono text-[10px] tracking-[.16em] text-primary">{project.type}</p>
         <h3 className="mt-5 text-2xl font-semibold leading-tight sm:text-[1.75rem]">{project.title}</h3>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">{project.description}</p>
        <ul className="mt-7 space-y-3 text-sm">{project.highlights.map((item) => <li key={item} className="flex gap-3"><span className="text-primary">↳</span>{item}</li>)}</ul>
        <div className="mt-7 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="tech-chip">{item}</span>)}</div>
        <div className="mt-auto flex flex-wrap gap-3 pt-9"><Button asChild variant="outline" className="rounded-full bg-secondary/60"><a href="#contact">Live Demo <ArrowUpRight /></a></Button><Button asChild variant="ghost" className="rounded-full"><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a></Button></div>
      </div>
    </article>
  );
}

function FloatingField({ label, name, type, required }: { label: string; name: string; type: string; required?: boolean }) {
  return <label className="floating-field"><input name={name} type={type} placeholder=" " required={required} /><span>{label}</span></label>;
}