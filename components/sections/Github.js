import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import { getGithubRepos } from "@/lib/github";
import { isPlaceholder } from "@/lib/utils";
import { Star } from "lucide-react";

export default function Github() {
  const repos = getGithubRepos().filter((repo) => !isPlaceholder(repo.name));
  if (!repos.length) return null;

  return (
    <Section id="github">
      <SectionHeading
        eyebrow="Open Source"
        title="Repositories"
        description="Selected public work."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {repos.map((repo) => {
          const href = isPlaceholder(repo.url) ? null : repo.url;
          const Card = (
            <GlowCard className="h-full p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg text-text">{repo.name}</h3>
                <span className="font-mono text-[11px] text-dim">{repo.language}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{repo.description}</p>
              <dl className="mt-5 flex flex-wrap gap-6 font-mono text-[11px] text-dim">
                <div className="inline-flex items-center gap-1.5">
                  <Star className="size-3" aria-hidden="true" />
                  <dt className="sr-only">Stars</dt>
                  <dd>{repo.stars}</dd>
                </div>
                <div>
                  <dt className="inline">Updated </dt>
                  <dd className="inline">{repo.updated}</dd>
                </div>
              </dl>
            </GlowCard>
          );

          return href ? (
            <a
              key={repo.name}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${repo.name} on GitHub`}
            >
              {Card}
            </a>
          ) : (
            <div key={repo.name}>{Card}</div>
          );
        })}
      </div>
    </Section>
  );
}
