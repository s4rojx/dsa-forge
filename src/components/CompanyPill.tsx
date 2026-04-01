interface CompanyPillProps {
  company: string;
}

export default function CompanyPill({ company }: CompanyPillProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-surface2 border border-border px-2.5 py-0.5 text-[10px] font-mono text-muted transition-colors hover:border-accent/30 hover:text-text">
      {company}
    </span>
  );
}
