import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { education } from "@/data/education";

export default function Education() {
  return (
    <Section id="education">
      <SectionHeading
        eyebrow="Education"
        title="Academic record."
        description="Qualifications and results as listed on the resume."
      />
      <ol className="relative mt-12">
        <span
          className="absolute top-0 bottom-0 left-[5px] hidden w-px bg-border md:block"
          aria-hidden="true"
        />
        {education.map((item) => (
          <li key={item.id} className="relative grid gap-4 py-8 md:grid-cols-[220px_1fr] md:pl-8">
            <span
              className="absolute top-10 left-0 hidden size-2.5 rounded-full border border-accent bg-bg md:block"
              aria-hidden="true"
            />
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-dim uppercase">{item.period}</p>
              {item.result ? <p className="mt-2 text-sm text-muted">{item.result}</p> : null}
            </div>
            <div>
              <h3 className="text-xl text-text">{item.credential || item.institution}</h3>
              {item.credential ? <p className="mt-1 text-sm text-muted">{item.institution}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
