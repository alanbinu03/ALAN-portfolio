import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/projects/ProjectCard";
import Reveal from "@/components/animations/Reveal";

export default function Projects({ projects }) {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Selected systems."
        description="Computer vision, robotics, agents, and the pipelines around them."
      />
      <div className="mt-12 space-y-6">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={Math.min(index * 0.04, 0.16)}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
