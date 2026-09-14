export interface SectionLabelProps {
  number: string;
  label: string;
}

export function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <div className="mb-7 flex items-center gap-3 font-mono text-[14px] tracking-[.16em] uppercase">
      <span className="text-primary">{number}</span>
      <span className="h-px w-8 bg-border" />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
