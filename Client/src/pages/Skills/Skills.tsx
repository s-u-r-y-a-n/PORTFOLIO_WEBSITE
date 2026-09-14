import { SectionLabel } from "@/components/section-label";
import skillGroups from "@/data/skills";
import "./Skills.scss";

export function Skills() {
  return (
    <section
      id="skills"
      className="section-wrap scroll-reveal reveal-plain border-b border-border/40"
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
                    group.primary.includes(skill) ? "skill-pill skill-pill-primary" : "skill-pill"
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
  );
}

export default Skills;
