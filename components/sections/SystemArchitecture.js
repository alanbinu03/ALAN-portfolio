import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArchitectureFlow } from "@/components/architecture/ArchitectureDiagram";
import { architectureStages } from "@/data/architecture";

export default function SystemArchitecture() {
  return (
    <Section id="systems">
      <SectionHeading
        eyebrow="System path"
        title="From data to monitoring."
        description="A reference path across data, models, orchestration, applications, and monitoring."
      />
      <div className="mt-12">
        <ArchitectureFlow stages={architectureStages} />
      </div>
    </Section>
  );
}
