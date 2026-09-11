import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  MapPin,
  Moon,
  Send,
  Sun,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomCursor } from "@/components/custom-cursor";
import { smoothScrollToId } from "@/hooks/use-smooth-scroll";
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
    copy: "Building responsive, accessible interfaces focused on clean component structure, predictable state management, and intuitive user interactions.",
    skills: [
      "React",
      "Redux Toolkit",
      "TypeScript",
      "Tailwind CSS",
      "Bootstrap",
      "HTML",
      "CSS",
      "Prime React",
      "Material UI",
    ],
    primary: [],
  },
  {
    number: "02",
    title: "Backend & APIs",
    copy: "Designing secure service layers, RESTful endpoints, and real-time communication channels centered around strict data validation and role-based access.",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "WebSockets",
      "Webhooks",
      "JWT Authentication",
      "Role-Based Access Control (RBAC)",
    ],
    primary: [],
  },
  {
    number: "03",
    title: "Database & Cloud",
    copy: "Structuring data persistence across relational and document stores, alongside serverless deployments and cloud log monitoring.",
    skills: [
      "MySQL",
      "Sequelize",
      "MongoDB",
      "Mongoose",
      "DynamoDB",
      "AWS Lambda",
      "AWS SAM",
      "Amazon S3",
      "Amazon SES",
      "AWS CloudWatch",
      "Git",
      "GitHub",
      "Postman",
    ],
    primary: [],
  },
];

const experiences = [
  {
    role: "Junior Full Stack Engineer",
    company: "Troniqs Rationale Technologies",
    period: "FEB 2026 — MAY 2026",
    employmentType: "Full-time · On-site",
    location: "Chennai, India",
    description:
      "Contributed to an enterprise-scale Pharmacy Logistics platform built on microservices, focusing on QA bug resolution, typed state flows, and cloud monitoring.",
    highlights: [
      "Resolved QA-reported issues across backend microservices to support production stability.",
      "Worked with TypeScript, Redux, and GraphQL for type-safe state management and targeted data fetching.",
      "Used AWS CloudWatch daily to inspect distributed service logs, trace runtime errors, and assist cross-service debugging.",
    ],
    stack: ["TypeScript", "React", "Redux", "Material UI", "Node.js", "GraphQL", "AWS CloudWatch"],
  },
  {
    role: "Full Stack Engineer",
    company: "Althi Solutions",
    location: undefined,
    period: "FEB 2025 — JAN 2026",
    employmentType: "Full-time · On-site",
    description:
      "Delivered production applications spanning an institutional portal, internal management modules, and a serverless admission engine.",
    highlights: [
      "Built responsive, accessible UI modules and integrated REST endpoints across platforms using React, PrimeReact, and Context API.",
      "Engineered backend REST APIs with Node.js and Express, backed by dual persistence layers (MongoDB via Mongoose and MySQL via Sequelize).",
      "Implemented JWT authentication with Role-Based Access Control (RBAC), WebSocket notifications, and automated emails via Brevo and Amazon SES.",
      "Architected and deployed a serverless admissions backend using AWS Lambda, DynamoDB query modeling, S3, and AWS SAM for Infrastructure as Code (IaC).",
    ],
    stack: [
      "React",
      "PrimeReact",
      "Node.js",
      "Express",
      "MySQL",
      "MongoDB",
      "AWS Lambda",
      "DynamoDB",
      "AWS SAM",
      "WebSockets",
    ],
  },
];

const architecture = [
  [
    "Client Request & State",
    "Predictable state handling, form validation, and typed API communication.",
  ],
  [
    "API Layer & Routing",
    "REST and GraphQL endpoints handling request dispatching and payload parsing.",
  ],
  [
    "Auth & Security Guardrails",
    "Stateless JWT validation, role-based access control (RBAC), and route middleware.",
  ],
  [
    "Core Business Logic",
    "Asynchronous service execution, event-driven workflows, and real-time WebSockets & Webhooks.",
  ],
  [
    "Data & Cloud Infrastructure",
    "Structured storage via MySQL, MongoDB, or DynamoDB, backed by AWS serverless services and CloudWatch monitoring.",
  ],
] as const;

const projects = [
  {
    number: "01",
    title: "Finance & Expenses Tracker",
    type: "FINTECH · FULL STACK",
    image: financeImage,
    description:
      "A secure financial command center that turns daily transactions into useful, actionable insight.",
    highlights: [
      "Role-aware expense workflows",
      "Live analytics and category trends",
      "Optimized relational data model",
    ],
    stack: ["Node.js", "Express", "MySQL", "React", "Chart.js"],
  },
  {
    number: "02",
    title: "Admission & Student Management",
    type: "EDTECH · SERVERLESS",
    image: admissionsImage,
    description:
      "A serverless operations platform for the complete student journey, from enquiry to enrollment.",
    highlights: [
      "Event-driven admissions pipeline",
      "Granular access and audit trails",
      "Scalable AWS infrastructure",
    ],
    stack: ["Node.js", "AWS SAM", "DynamoDB", "React"],
  },
  {
    number: "03",
    title: "Scalable Commerce Platform",
    type: "COMMERCE · SAAS",
    image: commerceImage,
    description:
      "A modular storefront and operations suite built for conversion, dependable payments, and growth.",
    highlights: [
      "Stripe checkout and webhooks",
      "Inventory and order orchestration",
      "Reusable storefront system",
    ],
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
  const [sent, setSent] = useState(false);
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
  }, [activeSection, scrolled]);

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
        <section
          className="relative flex min-h-[94vh] items-center overflow-hidden px-5 pt-28 pb-16 sm:px-8 lg:px-12"
          aria-labelledby="hero-title"
        >
          <div className="hero-grid" aria-hidden="true" />
          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.08fr_.92fr]">
            <div className="max-w-3xl">
              <div className="status-chip hero-in hero-d1 mb-8">
                <span className="pulse-dot" />
                Available for full-stack opportunities
              </div>
              <h1
                id="hero-title"
                className="hero-in hero-d2 font-semibold leading-[.95] tracking-normal"
              >
                <span className="block min-h-[1em] text-[clamp(2.35rem,5.4vw,5.25rem)]">
                  <TypedName />
                </span>
                <span className="text-gradient mt-3 block text-[clamp(1.8rem,4.15vw,3.9rem)]">
                  Full Stack
                  <br className="hidden sm:block" /> Developer.
                </span>
              </h1>
              <p className="hero-in hero-d3 mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                I build dependable, end-to-end web applications—bridging responsive user interfaces
                with reliable backend APIs and cloud-ready infrastructure.
              </p>
              <div className="hero-in-scale hero-d4 mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => scrollTo("work")}
                  className="h-13 rounded-full px-6 text-sm shadow-[var(--shadow-accent)]"
                >
                  View projects <ArrowDown />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-13 rounded-full border-border bg-secondary/60 px-6 text-sm backdrop-blur-xl"
                >
                  <a href="/surya-n-resume.pdf" download>
                    Download resume{" "}
                    <span className="font-mono text-[10px] text-muted-foreground">PDF</span>
                  </a>
                </Button>
              </div>
              <div className="hero-in hero-d5 mt-7 flex flex-wrap gap-2">
                <SocialLink icon={<Github />} label="GitHub" href="https://github.com/" />
                <SocialLink icon={<Linkedin />} label="LinkedIn" href="https://linkedin.com/" />
                <SocialLink icon={<Mail />} label="Email" href="mailto:surya@example.com" />
              </div>
            </div>

            <div className="hero-in-scale hero-d3">
              <Terminal />
            </div>
          </div>
          <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] tracking-[.18em] text-muted-foreground uppercase lg:flex">
            Scroll to explore <ChevronDown className="size-3" />
          </div>
        </section>

        <section
          id="about"
          className="section-wrap scroll-reveal reveal-plain border-t border-border/50"
          aria-labelledby="about-title"
        >
          <div className="reveal-up">
            <SectionLabel number="01" label="About" />
          </div>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-24">
            <h2 id="about-title" className="section-title reveal-x-left d-1">
              Building products with clarity and intent.
            </h2>
            <div className="reveal-x-right d-2 space-y-6 text-base leading-8 text-muted-foreground">
              <p className="text-lg leading-8 text-foreground">
                With 1.5 years of experience, I build simple, dependable web applications that solve
                real-world problems. I work across the complete stack—connecting responsive React
                frontends with reliable Node.js backends, well-structured databases, and cloud
                services.
              </p>
              <p>
                I have built full web platforms from scratch and also worked on larger enterprise
                applications. In every project, I focus on clean code, secure user access, and
                practical solutions that make applications easy to use and maintain.
              </p>
            </div>
          </div>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <div className="reveal-up d-2">
              <Metric value="1.5+ yrs" label="Professional Experience" />
            </div>
            <div className="reveal-up d-3">
              <Metric value="React + Node" label="Primary Stack & Cloud Focus" />
            </div>
            <div className="reveal-up d-4">
              <Metric value="End-to-End" label="Architecture & Systems Thinking" />
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="section-wrap scroll-reveal reveal-plain"
          aria-labelledby="skills-title"
        >
          <div className="reveal-up">
            <SectionLabel number="02" label="Capabilities" />
          </div>
          <h2 id="skills-title" className="section-title reveal-up d-1 max-w-3xl">
            The stack behind the work.
          </h2>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <article
                key={group.number}
                className="glass-card reveal-child flex min-h-[29rem] flex-col p-6 sm:p-8"
              >
                <span className="font-mono text-sm text-accent-amber">/{group.number}</span>
                <h3 className="mt-12 text-xl font-semibold sm:text-[1.35rem]">{group.title}</h3>
                <p className="mt-4 text-[15px] leading-6 text-muted-foreground">{group.copy}</p>
                <div className="pill-stagger mt-auto flex flex-wrap gap-2 pt-9">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={
                        group.primary.includes(skill)
                          ? "skill-pill skill-pill-primary"
                          : "skill-pill"
                      }
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="section-wrap scroll-reveal reveal-plain grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-24"
          aria-labelledby="architecture-title"
        >
          <div className="reveal-x-left lg:sticky lg:top-32 lg:self-start">
            <SectionLabel number="03" label="Backend thinking" />
            <h2 id="architecture-title" className="section-title">
              More than a pretty frontend.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
              I engineer the full request lifecycle—from the user's action on the client to
              structured persistence and cloud observability—keeping security, clean data flow, and
              error handling in focus..
            </p>
          </div>
          <ol className="space-y-3">
            {architecture.map(([title, description], index) => (
              <li key={title} className="reveal-child relative">
                <div className="architecture-slab grid grid-cols-[auto_minmax(0,1fr)] items-center gap-5 p-5 sm:p-6">
                  <span className="font-mono text-xs text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                  </div>
                </div>
                {index < architecture.length - 1 && (
                  <ArrowDown
                    className="relative z-10 mx-auto -my-1 size-4 text-primary"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </section>

        <section
          id="work"
          className="section-wrap scroll-reveal reveal-plain"
          aria-labelledby="work-title"
        >
          <div className="reveal-up">
            <SectionLabel number="04" label="Selected work" />
          </div>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <h2 id="work-title" className="section-title reveal-up d-1 max-w-2xl">
              Products built for real-world complexity.
            </h2>
            <p className="reveal-up d-2 max-w-xs text-sm leading-6 text-muted-foreground">
              Selected systems spanning financial analytics, education operations, and commerce.
            </p>
          </div>
          <div className="mt-14 space-y-8">
            {projects.map((project, index) => (
              <div key={project.number} className="scroll-reveal reveal-plain">
                <div className={`project-reveal ${index % 2 === 1 ? "from-right" : "from-left"}`}>
                  <ProjectCard project={project} reversed={index % 2 === 1} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="section-wrap scroll-reveal reveal-plain"
          aria-labelledby="experience-title"
        >
          <div className="reveal-up">
            <SectionLabel number="05" label="Experience" />
          </div>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <h2 id="experience-title" className="section-title reveal-up d-1 max-w-2xl">
              Shipping across the stack.
            </h2>
            <p className="reveal-up d-2 max-w-xs text-sm leading-6 text-muted-foreground">
              Production engineering across enterprise microservices, full-stack systems, and
              serverless architectures.
            </p>
          </div>

          <ol className="experience-timeline mt-14">
            {experiences.map((exp) => (
              <li key={exp.company} className="experience-entry scroll-reveal reveal-plain">
                <span className="experience-timeline-node" aria-hidden="true" />
                <article className="glass-card experience-card p-6 sm:p-9 lg:p-11">
                  <header className="experience-card-header">
                    <p className="font-mono text-xs font-semibold tracking-[.12em] text-primary uppercase">
                      {exp.role}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                      {exp.company}
                    </h3>
                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-xs text-muted-foreground sm:text-sm">
                      <span className="flex items-center gap-2">
                        <CalendarDays className="size-4 text-primary" aria-hidden="true" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-2">
                        <BriefcaseBusiness className="size-4 text-primary" aria-hidden="true" />
                        {exp.employmentType}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-2">
                          <MapPin className="size-4 text-primary" aria-hidden="true" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </header>

                  <div className="experience-card-body mt-6 border-t border-border/60 pt-6 sm:mt-10 sm:pt-9">
                    <p className="experience-description max-w-4xl text-base leading-8 text-foreground/90">
                      {exp.description}
                    </p>
                    <div className="mt-9">
                      <h4 className="font-mono text-[11px] font-semibold tracking-[.14em] text-muted-foreground uppercase">
                        Key contributions
                      </h4>
                      <ul className="mt-5 grid gap-4 text-sm leading-7 text-muted-foreground">
                        {exp.highlights.map((item) => (
                          <li key={item} className="experience-item timeline-item">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-9">
                      <h4 className="font-mono text-[11px] font-semibold tracking-[.14em] text-muted-foreground uppercase">
                        Technologies
                      </h4>
                      <div className="experience-stack mt-4 flex flex-wrap gap-2">
                        {exp.stack.map((tech) => (
                          <span key={tech} className="tech-chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="contact"
          className="section-wrap scroll-reveal reveal-plain pb-12"
          aria-labelledby="contact-title"
        >
          <div className="contact-panel grid gap-14 p-6 sm:p-10 lg:grid-cols-[.8fr_1.2fr] lg:p-14">
            <div>
              <div className="reveal-up">
                <SectionLabel number="06" label="Contact" />
              </div>
              <h2 id="contact-title" className="section-title reveal-up d-1">
                Let’s build something dependable.
              </h2>
              <p className="reveal-up d-2 mt-6 max-w-md text-base leading-7 text-muted-foreground">
                Have a product challenge, a role, or an idea worth exploring? I’d like to hear about
                it.
              </p>
              <div className="reveal-up d-3">
                <a
                  href="mailto:surya@example.com"
                  className="mt-9 inline-flex items-center gap-3 rounded-full border border-border bg-secondary/50 px-4 py-3 text-sm transition-colors hover:border-primary/60"
                >
                  <Mail className="size-4 text-primary" />
                  surya@example.com
                </a>
              </div>
              <div className="reveal-up d-4 mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="pulse-dot" />
                Available for the right opportunity
              </div>
            </div>
            <form
              onSubmit={submitContact}
              className="reveal-zoom d-2 grid gap-5"
              aria-label="Contact form"
            >
              <FloatingField label="Your name" name="name" type="text" required />
              <FloatingField label="Email address" name="email" type="email" required />
              <label className="floating-field">
                <textarea name="message" placeholder=" " rows={5} required />
                <span>Tell me about your project</span>
              </label>
              <Button type="submit" size="lg" className="h-13 rounded-full sm:justify-self-start">
                {sent ? (
                  <>
                    <CheckCircle2 /> Message ready
                  </>
                ) : (
                  <>
                    Send message <Send />
                  </>
                )}
              </Button>
              {sent && (
                <p role="status" className="text-sm text-primary">
                  Thanks — I’ll get back to you soon.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-border/60 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>© 2026 Surya N. Built with intent.</p>
        <div className="flex items-center gap-5">
          <a href="https://github.com/" aria-label="GitHub" className="hover:text-foreground">
            <Github className="size-4" />
          </a>
          <a href="https://linkedin.com/" aria-label="LinkedIn" className="hover:text-foreground">
            <Linkedin className="size-4" />
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

function Terminal() {
  return (
    <aside className="terminal-window" aria-label="Code profile preview">
      <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
        <div className="flex gap-2" aria-hidden="true">
          <span className="traffic bg-accent-coral" />
          <span className="traffic bg-accent-amber" />
          <span className="traffic bg-accent-lime" />
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">surya-stack.js</span>
        <span className="w-12" />
      </div>
      <pre className="overflow-x-auto p-6 font-mono text-[12px] leading-7 sm:p-8 sm:text-sm">
        <code>
          <span className="code-dim">01</span> <span className="code-coral">const</span> developer ={" "}
          {"{"}
          {"\n"}
          <span className="code-dim">02</span> name: <span className="code-lime">'Surya N'</span>,
          {"\n"}
          <span className="code-dim">03</span> role:{" "}
          <span className="code-lime">'Full Stack Developer'</span>,{"\n"}
          <span className="code-dim">04</span> crafts: [{"\n"}
          <span className="code-dim">05</span> <span className="code-lime">'resilient APIs'</span>,
          {"\n"}
          <span className="code-dim">06</span>{" "}
          <span className="code-lime">'thoughtful interfaces'</span>,{"\n"}
          <span className="code-dim">07</span> <span className="code-lime">'cloud systems'</span>
          {"\n"}
          <span className="code-dim">08</span> ],{"\n"}
          <span className="code-dim">09</span> available: <span className="text-primary">true</span>
          {"\n"}
          <span className="code-dim">10</span> {"}"};{"\n\n"}
          <span className="code-dim">11</span> developer.<span className="text-primary">build</span>
          ();<span className="type-cursor">_</span>
        </code>
      </pre>
      <div className="flex items-center justify-between border-t border-border/60 px-5 py-3 font-mono text-[10px] text-muted-foreground">
        <span>node v22.0</span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent-lime" />
          ready
        </span>
      </div>
    </aside>
  );
}

function TypedName() {
  const text = "Hi, I'm Surya N.";
  const [length, setLength] = useState(0);
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLength(text.length);
      return;
    }

    let frame = 0;
    if (startedAt.current === null) startedAt.current = performance.now();
    const tick = (now: number) => {
      const nextLength = Math.min(
        text.length,
        Math.floor((now - (startedAt.current ?? now)) / 72) + 1,
      );
      setLength((current) => (current === nextLength ? current : nextLength));
      if (nextLength < text.length) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      {text.slice(0, length)}
      <span className="type-cursor">|</span>
    </>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="mb-7 flex items-center gap-3 font-mono text-[14px] tracking-[.16em] uppercase">
      <span className="text-primary">{number}</span>
      <span className="h-px w-8 bg-border" />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <article className="glass-card p-6 sm:p-7">
      <p className="text-2xl font-semibold text-primary">{value}</p>
      <p className="mt-3 text-sm text-muted-foreground">{label}</p>
    </article>
  );
}

function SocialLink({ icon, label, href }: { icon: ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="social-pill group"
    >
      {icon}
      <span>{label}</span>
      <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function ProjectCard({
  project,
  reversed,
}: {
  project: (typeof projects)[number];
  reversed: boolean;
}) {
  return (
    <article className="project-card grid overflow-hidden lg:grid-cols-2">
      <div
        className={`group relative min-h-72 overflow-hidden lg:min-h-[32rem] ${reversed ? "lg:order-2" : ""}`}
      >
        <img
          src={project.image}
          alt={`${project.title} interface preview`}
          loading="lazy"
          width={1280}
          height={800}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
        />
        <span className="absolute top-5 left-5 rounded-full border border-border bg-background/80 px-3 py-1.5 font-mono text-[10px] backdrop-blur-xl">
          PROJECT {project.number}
        </span>
      </div>
      <div className="flex flex-col p-6 sm:p-9 lg:p-11">
        <p className="font-mono text-[10px] tracking-[.16em] text-primary">{project.type}</p>
        <h3 className="mt-5 text-2xl font-semibold leading-tight sm:text-[1.75rem]">
          {project.title}
        </h3>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">{project.description}</p>
        <ul className="mt-7 space-y-3 text-sm">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-primary">↳</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className="tech-chip">
              {item}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-3 pt-9">
          <Button asChild variant="outline" className="rounded-full bg-secondary/60">
            <a href="#contact">
              Live Demo <ArrowUpRight />
            </a>
          </Button>
          <Button asChild variant="ghost" className="rounded-full">
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

function FloatingField({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <label className="floating-field">
      <input name={name} type={type} placeholder=" " required={required} />
      <span>{label}</span>
    </label>
  );
}
