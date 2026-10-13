import Link from "@/components/ui/Link";
import Button from "@/components/ui/Button";
import GlowCard from "@/components/ui/GlowCard";
import TechBadge from "@/components/ui/TechBadge";
import ArchitectureNode from "@/components/architecture/ArchitectureNode";

export default function ProjectCard({ project, index = 0 }) {
  const architecture = project.architecture ?? [];

  return (
    <GlowCard className="p-6 sm:p-8" as="article">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
          {project.category}
        </p>
        <div className="flex items-center gap-3 font-mono text-[11px] text-dim">
          <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="rounded-full border border-border px-2 py-0.5">
          {project.status || "In development"}
        </span>
        </div>
      </div>
      <h3 className="mt-4 text-2xl tracking-tight text-text sm:text-3xl">
        <Link href={`/projects/${project.slug}`} className="transition-colors hover:text-white">
          {project.name}
        </Link>
      </h3>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
        {project.shortDescription}
      </p>

      <dl className={`mt-8 grid gap-6 ${project.problem ? "md:grid-cols-2" : ""}`}>
        {project.problem ? (
          <div>
            <dt className="font-mono text-[11px] tracking-[0.16em] text-dim uppercase">Problem</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{project.problem}</dd>
          </div>
        ) : null}
        {project.whatIBuilt ? (
          <div>
            <dt className="font-mono text-[11px] tracking-[0.16em] text-dim uppercase">
              What I built
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{project.whatIBuilt}</dd>
          </div>
        ) : null}
      </dl>

      {architecture.length ? (
        <div className="mt-8">
          <p className="font-mono text-[11px] tracking-[0.16em] text-dim uppercase">
            Scope
          </p>
          <div className="mt-3 hidden gap-2 lg:grid lg:grid-cols-3 xl:grid-cols-6">
            {architecture.map((node, nodeIndex) => (
              <ArchitectureNode
                key={node.id ?? node.label}
                index={nodeIndex}
                label={node.label}
                className="min-w-0"
              />
            ))}
          </div>
          <p className="mt-3 text-sm text-muted lg:hidden">
            {architecture.map((node) => node.label).join(" → ")}
          </p>
        </div>
      ) : null}

      {(project.challenges ?? []).length ? (
        <div className="mt-6">
          <p className="font-mono text-[11px] tracking-[0.16em] text-dim uppercase">
            Engineering challenges
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-muted">
            {project.challenges.slice(0, 3).map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        {(project.stack ?? []).map((tech) => (
          <TechBadge key={tech}>{tech}</TechBadge>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button href={`/projects/${project.slug}`} variant="primary" arrow>
          Case Study
        </Button>
        {project.github ? (
          <Button href={project.github} variant="secondary" external>
            GitHub
          </Button>
        ) : null}
        {project.demo ? (
          <Button href={project.demo} variant="secondary" external>
            Demo
          </Button>
        ) : null}
      </div>
    </GlowCard>
  );
}
