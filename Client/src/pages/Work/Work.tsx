import { useState } from "react";
import { ArrowUpRight, ExternalLink, Github, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/section-label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import projects, { type Project } from "@/data/projects";
import individualProjects, { type IndividualProject } from "@/data/individualProjects";
import "./Work.scss";

type ProjectItem = Project | IndividualProject;

function ProjectCard({
  project,
  onSelect,
}: {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}) {
  const category = "type" in project ? project.type : project.category;
  const hasImage = Boolean(project.image);

  return (
    <article className="project-card group">
      {hasImage ? (
        <div className="project-card-image-wrap">
          <img
            src={project.image}
            alt={`${project.title} interface preview`}
            loading="lazy"
            width={1280}
            height={800}
            className="project-card-image"
          />
          <span className="absolute top-3 left-3 rounded-full border border-border/80 bg-background/85 px-2.5 py-1 font-mono text-[10px] backdrop-blur-md">
            PROJECT {project.number}
          </span>
        </div>
      ) : (
        <div className="project-card-image-wrap flex items-center justify-center bg-secondary/30">
          <span className="font-mono text-xs text-muted-foreground">PROJECT {project.number}</span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[10px] tracking-[.14em] text-primary uppercase">{category}</p>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Skills / Tech Stack */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech} className="project-card-pill">
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="project-card-pill opacity-75">+{project.stack.length - 4} more</span>
          )}
        </div>

        {/* Actions Row */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-5">
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <Button
                asChild
                size="sm"
                variant="outline"
                className="h-8 rounded-full border-border bg-secondary/60 px-3 text-xs gap-1 hover:border-primary/50"
              >
                <a
                  href={project.liveUrl}
                  target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  Live Demo <ArrowUpRight className="size-3" />
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button
                asChild
                size="sm"
                variant="ghost"
                className="h-8 rounded-full px-2.5 text-xs gap-1 hover:bg-secondary"
              >
                <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github className="size-3.5" />
                </a>
              </Button>
            )}
          </div>
          <Button
            size="sm"
            onClick={() => onSelect(project)}
            className="ml-auto h-8 rounded-full px-3.5 text-xs font-medium shadow-sm"
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}

function ProjectDetailsDialog({
  project,
  open,
  onOpenChange,
}: {
  project: ProjectItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!project) return null;

  const category = "type" in project ? project.type : project.category;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="project-dialog-content max-h-[90vh] max-w-2xl overflow-y-auto p-6 sm:max-w-3xl sm:p-8">
        {/* Project Image Banner */}
        {project.image && (
          <div className="w-full overflow-hidden rounded-xl border border-border/60 bg-muted/20 shadow-md">
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="max-h-[380px] w-full object-cover"
            />
          </div>
        )}

        <DialogHeader className="mt-5 text-left">
          <p className="font-mono text-xs tracking-[.16em] text-primary uppercase">{category}</p>
          <DialogTitle className="mt-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {project.title}
          </DialogTitle>
          <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        {/* Complete Tech Stack */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border/80 bg-secondary/60 px-3.5 py-1 font-mono text-xs font-medium text-foreground/90"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Key Features / Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 text-base font-semibold text-foreground">
              <Layers className="size-4 text-primary" />
              <span>Key Features</span>
            </div>
            <ul className="mt-3.5 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Divider */}
        <div className="my-6 h-px w-full bg-border/60" />

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {project.githubUrl && (
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-xl border-border bg-secondary/50 px-5 text-sm font-medium hover:border-primary/50 gap-2"
            >
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Github className="size-4" /> Source Code
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button
              asChild
              className="h-11 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90 gap-2 shadow-[var(--shadow-accent)]"
            >
              <a
                href={project.liveUrl}
                target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                <ExternalLink className="size-4" /> Live Demo
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Work() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

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

      <div className="mt-14 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.number} className="scroll-reveal reveal-plain flex">
            <ProjectCard project={project} onSelect={setSelectedProject} />
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

        <div className="mt-14 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {individualProjects.map((project) => (
            <div key={project.number} className="scroll-reveal reveal-plain flex">
              <ProjectCard project={project} onSelect={setSelectedProject} />
            </div>
          ))}
        </div>
      </div>

      {/* View Details Dialog */}
      <ProjectDetailsDialog
        project={selectedProject}
        open={Boolean(selectedProject)}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      />
    </section>
  );
}

export default Work;
