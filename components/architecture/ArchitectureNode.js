import { cn } from "@/lib/utils";

export default function ArchitectureNode({ index, label, className }) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-[10px] border border-border bg-surface px-3 py-3 text-center",
        className,
      )}
    >
      <p className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">
        {String((index ?? 0) + 1).padStart(2, "0")}
      </p>
      <p className="mt-1 text-sm text-text">{label}</p>
    </div>
  );
}
