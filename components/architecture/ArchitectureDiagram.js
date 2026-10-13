"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import ArchitectureNode from "@/components/architecture/ArchitectureNode";

export default function ArchitectureDiagram({ nodes = [], className }) {
  if (!nodes.length) return null;

  return (
    <div className={cn(className)}>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {nodes.map((node, index) => (
          <li key={node.id ?? node.label}>
            <ArchitectureNode index={index} label={node.label} className="w-full" />
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ArchitectureFlow({ stages }) {
  const [active, setActive] = useState(stages[0]?.id ?? null);
  const current = stages.find((stage) => stage.id === active) ?? stages[0];

  return (
    <div>
      <div className="mb-10 hidden lg:block">
        <ol className="flex flex-wrap items-center gap-2">
          {stages.map((stage, index) => {
            const selected = stage.id === current?.id;
            return (
              <li key={stage.id} className="flex items-center gap-2">
                <button
                  type="button"
                  onMouseEnter={() => setActive(stage.id)}
                  onFocus={() => setActive(stage.id)}
                  className={cn(
                    "rounded-[10px] border px-3 py-2 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors duration-200",
                    selected
                      ? "border-accent/45 bg-accent/10 text-text"
                      : "border-border text-dim hover:text-text",
                  )}
                  data-cursor="true"
                >
                  {stage.label}
                </button>
                {index < stages.length - 1 ? (
                  <span className="h-px w-6 bg-border" aria-hidden="true" />
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <ol>
          {stages.map((stage, index) => {
            const selected = stage.id === current?.id;
            return (
              <li key={stage.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(stage.id)}
                  onFocus={() => setActive(stage.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-[10px] border px-4 py-3 text-left transition-colors duration-200",
                    selected
                      ? "border-accent/40 bg-accent/8 text-text"
                      : "border-border bg-surface/50 text-muted hover:border-border-strong hover:text-text",
                  )}
                  data-cursor="true"
                >
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase">
                    {stage.label}
                  </span>
                  <span className="text-dim">{String(index + 1).padStart(2, "0")}</span>
                </button>
                {index < stages.length - 1 ? (
                  <div className="mx-5 h-3 w-px bg-border" aria-hidden="true" />
                ) : null}
              </li>
            );
          })}
        </ol>
        <aside className="rounded-[14px] border border-border bg-surface p-6">
          <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">Stage</p>
          <h3 className="mt-3 text-2xl text-text">{current?.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">{current?.detail}</p>
        </aside>
      </div>
    </div>
  );
}
