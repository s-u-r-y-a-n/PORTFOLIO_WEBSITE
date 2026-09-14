import { ArrowDown } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import architecture from "@/data/architecture";
import "./Architecture.scss";

export function Architecture() {
  return (
    <section
      className="section-wrap scroll-reveal reveal-plain grid gap-14 border-b border-border/40 lg:grid-cols-[.78fr_1.22fr] lg:gap-24"
      aria-labelledby="architecture-title"
    >
      <div className="reveal-x-left lg:sticky lg:top-32 lg:self-start">
        <SectionLabel number="03" label="Backend thinking" />
        <h2 id="architecture-title" className="section-title">
          More than a pretty frontend.
        </h2>
        <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
          I engineer the full request lifecycle—from the user's action on the client to structured
          persistence and cloud observability—keeping security, clean data flow, and error handling
          in focus..
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
  );
}

export default Architecture;
