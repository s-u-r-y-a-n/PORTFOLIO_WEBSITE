import { BriefcaseBusiness, CalendarDays, MapPin } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import experiences from "@/data/experiences";
import "./Experience.scss";

export function Experience() {
  return (
    <section
      id="experience"
      className="section-wrap scroll-reveal reveal-plain border-b border-border/40"
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
          Production engineering across enterprise microservices, full-stack systems, and serverless
          architectures.
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
                  <h4 className="font-mono text-[13px] font-semibold tracking-[.14em] text-muted-foreground uppercase">
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
  );
}

export default Experience;
