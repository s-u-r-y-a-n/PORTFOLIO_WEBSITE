import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/section-label";
import projects, { type Project } from "@/data/projects";
import individualProjects, { type IndividualProject } from "@/data/individualProjects";
import "./Work.scss";

function ProjectCard({ project, reversed }: { project: Project; reversed: boolean }) {
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
        {(project.liveUrl || project.githubUrl) && (
          <div className="mt-auto flex flex-wrap gap-3 pt-9">
            {project.liveUrl && (
              <Button asChild variant="outline" className="rounded-full bg-secondary/60">
                <a
                  href={project.liveUrl}
                  target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  Live Demo <ArrowUpRight />
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="ghost" className="rounded-full">
                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight />
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function IndividualProjectCard({
  project,
  reversed,
}: {
  project: IndividualProject;
  reversed: boolean;
}) {
  const hasImage = Boolean(project.image);

  return (
    <article
      className={`project-card grid overflow-hidden ${
        hasImage ? "lg:grid-cols-2" : "lg:grid-cols-1"
      }`}
    >
      {hasImage && (
        <div
          className={`group relative min-h-72 overflow-hidden lg:min-h-[32rem] ${
            reversed ? "lg:order-2" : ""
          }`}
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
            INDIVIDUAL PROJECT {project.number}
          </span>
        </div>
      )}
      <div className="flex flex-col p-6 sm:p-9 lg:p-11">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[.16em] text-accent-amber uppercase">
            {project.category}
          </p>
          {!hasImage && (
            <span className="rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur-xl">
              INDIVIDUAL PROJECT {project.number}
            </span>
          )}
        </div>
        <h3 className="mt-5 text-2xl font-semibold leading-tight sm:text-[1.75rem]">
          {project.title}
        </h3>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">{project.description}</p>
        <ul className="mt-7 space-y-3 text-sm">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-accent-amber">↳</span>
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
        {(project.liveUrl || project.githubUrl) && (
          <div className="mt-auto flex flex-wrap gap-3 pt-9">
            {project.liveUrl && (
              <Button asChild variant="outline" className="rounded-full bg-secondary/60">
                <a
                  href={project.liveUrl}
                  target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  Live Demo <ArrowUpRight />
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="ghost" className="rounded-full">
                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight />
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section
      id="work"
      className="section-wrap scroll-reveal reveal-plain border-b border-border/40"
      aria-labelledby="work-title"
    >
      {/* Section 04: Selected Work / Professional Projects */}
      <div className="reveal-up">
        <SectionLabel number="04" label="Selected work" />
      </div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs font-semibold tracking-[.14em] text-primary uppercase">
            Professional Systems & Products
          </p>
          <h2 id="work-title" className="section-title reveal-up d-1 mt-2 max-w-2xl">
            Products built for real-world complexity.
          </h2>
        </div>
        <p className="reveal-up d-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Commercial platforms and production services I have contributed to professionally,
          focusing on dependable architectures, database modeling, and resilient APIs.
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

      {/* Elegant Divider between Selected Work and Individual Projects */}
      <div className="relative my-20 flex items-center justify-center">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
        <span className="absolute rounded-full border border-border/80 bg-background/90 px-4 py-1 font-mono text-[11px] tracking-[.18em] text-muted-foreground uppercase backdrop-blur-md">
          Independent Engineering
        </span>
      </div>

      {/* Subsection: Individual Projects */}
      <div className="scroll-reveal reveal-plain">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs font-semibold tracking-[.14em] text-accent-amber uppercase">
              Personal Initiatives & Explorations
            </p>
            <h3 className="section-title reveal-up d-1 mt-2 max-w-2xl">Individual Projects.</h3>
          </div>
          <p className="reveal-up d-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Projects I designed and built independently to explore ideas, strengthen my engineering
            skills, and solve practical problems.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {individualProjects.map((project, index) => (
            <div key={project.number} className="scroll-reveal reveal-plain">
              <div className={`project-reveal ${index % 2 === 1 ? "from-right" : "from-left"}`}>
                <IndividualProjectCard project={project} reversed={index % 2 === 1} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Work;
