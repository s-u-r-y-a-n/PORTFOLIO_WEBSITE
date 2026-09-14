import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  Download,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { smoothScrollToId } from "@/hooks/use-smooth-scroll";
import "./Hero.scss";

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

function SocialLink({ icon, label, href }: { icon: ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="social-pill group"
    >
      {icon}
      <span>{label}</span>
      <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
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

export function Hero() {
  const handleScrollToWork = () => {
    smoothScrollToId("work");
  };

  return (
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
            I build dependable, end-to-end web applications—bridging responsive user interfaces with
            reliable backend APIs and cloud-ready infrastructure.
          </p>
          <div className="hero-in-scale hero-d4 mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              onClick={handleScrollToWork}
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
              <a
                href="/N_Surya_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="N_Surya_Resume.pdf"
              >
                Download resume{" "}
                <span className="font-mono text-[10px] text-muted-foreground">PDF</span>
              </a>
            </Button>
          </div>
          <div className="hero-in hero-d5 mt-7 flex flex-wrap gap-2">
            <SocialLink icon={<Github />} label="GitHub" href="https://github.com/s-u-r-y-a-n" />
            <SocialLink icon={<Linkedin />} label="LinkedIn" href="https://www.linkedin.com/in/surya30112000/" />
            <SocialLink
              icon={<Mail />}
              label="Email"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=surya86104@gmail.com"
            />
            <SocialLink
              icon={<MessageCircle />}
              label="WhatsApp"
              href="https://wa.me/918903091256"
            />
          </div>
        </div>

        <div className="hero-in-scale hero-d3">
          <Terminal />
        </div>
      </div>
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] tracking-[.18em] text-muted-foreground uppercase lg:flex">
        Scroll to explore <ChevronDown className="size-3" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 mx-auto w-[calc(100%-2.5rem)] max-w-7xl border-b border-border/40 sm:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)]"
      />
    </section>
  );
}

export default Hero;
