import { cn } from "@/lib/utils";

export default function Badge({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-muted uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
