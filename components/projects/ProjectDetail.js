import Link from "@/components/ui/Link";
import SafeImage from "@/components/ui/SafeImage";
import Button from "@/components/ui/Button";
import TechBadge from "@/components/ui/TechBadge";
import SectionHeading from "@/components/ui/SectionHeading";
import ArchitectureDiagram from "@/components/architecture/ArchitectureDiagram";
import { isPlaceholder } from "@/lib/utils";

function Block({ title, children }) {
  return (
    <section className="border-t border-border py-10">
      <h2 className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{children}</div>
    </section>
  );
}

function stated(items) {
  return (items ?? []).filter((item) => item && !isPlaceholder(item));
}

export default function ProjectDetail({ project, related = [] }) {
  const gallery = project.gallery ?? [];
  const requirements = stated(project.requirements);
  const howItWorks = stated(project.howItWorks);
  const pipeline = stated(project.pipeline);
  const challenges = stated(project.challenges);
  const results = stated(project.results);
  const lessons = stated(project.lessons);
  const future = stated(project.future);
  const stack = stated(project.stack);

  return (
    <article className="mx-auto w-full max-w-[1120px] px-5 py-12 sm:px-6 lg:px-8">
      <p className="break-words font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
        <Link href="/#projects" className="hover:text-text">
          Projects
        </Link>
        <span className="mx-2">/</span>
        {project.category}
      </p>
      <h1 className="mt-4 max-w-4xl text-balance text-[clamp(1.85rem,6vw,3rem)] leading-tight tracking-tight text-text">
        {project.name}
      </h1>
      <p className="mt-4 max-w-3xl text-base text-muted">{project.shortDescription}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {project.github ? (
          <Button href={project.github} external variant="secondary">
            GitHub
          </Button>
        ) : null}
        {project.demo ? (
          <Button href={project.demo} external variant="primary" arrow>
            Demo
          </Button>
        ) : null}
        <span className="self-center font-mono text-[11px] text-dim">{project.status}</span>
      </div>

      {project.overview ? (
        <Block title="Overview">
          <p>{project.overview}</p>
        </Block>
      ) : null}
      {project.problem ? (
        <Block title="Problem">
          <p>{project.problem}</p>
        </Block>
      ) : null}
      {(project.architecture ?? []).length ? (
        <Block title="Scope">
          <ArchitectureDiagram nodes={project.architecture} />
        </Block>
      ) : requirements.length ? (
        <Block title="Scope">
          <ul className="space-y-2">
            {requirements.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </Block>
      ) : null}
      {howItWorks.length ? (
        <Block title="How It Works">
          <ol className="space-y-2">
            {howItWorks.map((item, index) => (
              <li key={item}>
                <span className="mr-2 font-mono text-[11px] text-dim">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </Block>
      ) : null}
      {pipeline.length ? (
        <Block title="AI / ML Pipeline">
          <p>{pipeline.join(" → ")}</p>
        </Block>
      ) : null}
      {stack.length ? (
        <Block title="Technology Stack">
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <TechBadge key={tech}>{tech}</TechBadge>
            ))}
          </div>
        </Block>
      ) : null}
      {challenges.length ? (
        <Block title="Engineering Challenges">
          <ul className="space-y-2">
            {challenges.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </Block>
      ) : null}
      {results.length ? (
        <Block title="Results">
          <ul className="space-y-2">
            {results.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Block>
      ) : null}
      {gallery.length ? (
        <Block title="Gallery">
          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.map((image) => (
              <div
                key={image.src}
                className="relative aspect-video overflow-hidden rounded-[12px] border border-border bg-surface"
              >
                <SafeImage
                  src={image.src}
                  alt={image.alt || `${project.name} screenshot`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 540px"
                />
              </div>
            ))}
          </div>
        </Block>
      ) : null}
      {lessons.length ? (
        <Block title="Lessons Learned">
          <ul className="space-y-2">
            {lessons.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </Block>
      ) : null}
      {future.length ? (
        <Block title="Future Improvements">
          <ul className="space-y-2">
            {future.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </Block>
      ) : null}

      <div className="border-t border-border py-10">
        <SectionHeading
          title="Continue"
          description="Return to the project index or start a conversation."
        />
        {related.length ? (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {related.slice(0, 4).map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/projects/${item.slug}`}
                  className="block rounded-[12px] border border-border px-4 py-3 text-sm text-muted transition-colors hover:border-accent/30 hover:text-text"
                >
                  <span className="font-mono text-[10px] tracking-[0.16em] text-dim uppercase">
                    {item.category}
                  </span>
                  <span className="mt-1 block text-text">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/#projects" variant="secondary">
            All projects
          </Button>
          <Button href="/#contact" variant="primary">
            Contact
          </Button>
        </div>
      </div>
    </article>
  );
}
