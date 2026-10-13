import { useMemo, useState } from "react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import TechBadge from "@/components/ui/TechBadge";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

export default function Stack() {
  const [active, setActive] = useState(skillGroups[0].id);
  const group = useMemo(
    () => skillGroups.find((item) => item.id === active) ?? skillGroups[0],
    [active],
  );

  return (
    <Section id="stack">
      <SectionHeading
        eyebrow="Stack"
        title="Technical skills."
        description="Grouped the same way as on the resume."
      />
      <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Technology groups">
        {skillGroups.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === active}
            onClick={() => setActive(item.id)}
            className={cn(
              "rounded-md border px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors duration-200",
              item.id === active
                ? "border-accent/40 bg-accent/10 text-text"
                : "border-border text-muted hover:text-text",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-8 rounded-[14px] border border-border bg-surface/50 p-5" role="tabpanel">
        <p className="font-mono text-[11px] tracking-[0.16em] text-dim uppercase">{group.label}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {group.items.map((tech) => (
            <TechBadge key={tech} className="px-3 py-1.5 text-xs">
              {tech}
            </TechBadge>
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {skillGroups.map((item) => (
          <div key={item.id} className="border-t border-border pt-4">
            <p className="font-mono text-[11px] tracking-[0.16em] text-dim uppercase">
              {item.label}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.items.map((tech) => (
                <TechBadge key={tech}>{tech}</TechBadge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
