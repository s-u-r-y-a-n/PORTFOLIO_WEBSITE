import { SectionLabel } from "@/components/section-label";
import "./About.scss";

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <article className="glass-card p-6 sm:p-7">
      <p className="text-2xl font-semibold text-primary">{value}</p>
      <p className="mt-3 text-sm text-muted-foreground">{label}</p>
    </article>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="section-wrap scroll-reveal reveal-plain border-t border-b border-border/40"
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
            frontends with reliable Node.js backends, well-structured databases, and cloud services.
          </p>
          <p>
            I have built full web platforms from scratch and also worked on larger enterprise
            applications. In every project, I focus on clean code, secure user access, and practical
            solutions that make applications easy to use and maintain.
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
  );
}

export default About;
