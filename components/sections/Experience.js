import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import TechBadge from "@/components/ui/TechBadge";
import { experience } from "@/data/experience";
import { isPlaceholder } from "@/lib/utils";

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Engineering timeline."
        description="Current role and the systems work behind it."
      />
      <ol className="relative mt-12">
        <span
          className="absolute top-0 bottom-0 left-[5px] hidden w-px bg-border md:block"
          aria-hidden="true"
        />
        {experience.map((item, index) => {
          const role = isPlaceholder(item.role) ? null : item.role;
          const description = isPlaceholder(item.description) ? null : item.description;
          const responsibilities = (item.responsibilities ?? [])
            .map((line) => (typeof line === "string" ? line : `${line.title}: ${line.text}`))
            .filter((line) => !isPlaceholder(line));
          const technologies = (item.technologies ?? []).filter((tech) => !isPlaceholder(tech));

          return (
            <li
              key={item.id}
              className="relative grid gap-4 py-8 md:grid-cols-[220px_1fr] md:pl-8"
            >
              <span
                className="absolute top-10 left-0 hidden size-2.5 rounded-full border border-accent bg-bg md:block"
                aria-hidden="true"
              />
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-dim uppercase">
                  {item.period}
                </p>
                <p className="mt-2 text-sm text-muted">{item.location}</p>
                {index === 0 ? (
                  <p className="mt-4 inline-flex rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">
                    Current
                  </p>
                ) : null}
              </div>
              <div>
                <h3 className="text-xl text-text">{role || item.company}</h3>
                {role ? <p className="mt-1 text-sm text-muted">{item.company}</p> : null}
                {description ? (
                  <p className="mt-4 text-sm leading-relaxed text-muted">{description}</p>
                ) : null}
                {responsibilities.length ? (
                  <ul className="mt-4 space-y-1.5 text-sm text-muted">
                    {responsibilities.map((line) => (
                      <li key={line}>— {line}</li>
                    ))}
                  </ul>
                ) : null}
                {technologies.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <TechBadge key={tech}>{tech}</TechBadge>
                    ))}
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
