import { cn } from "@/lib/utils";

export default function TechBadge({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-bg-elevated px-2.5 py-1 font-mono text-[11px] text-muted transition-colors duration-200 hover:border-accent/35 hover:text-text",
        className,
      )}
    >
      {children}
    </span>
  );
}
