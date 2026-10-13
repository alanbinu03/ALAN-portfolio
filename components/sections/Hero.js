"use client";

import { profile } from "@/data/profile";
import { mailtoHref, isPlaceholder } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SocialLink from "@/components/ui/SocialLink";
import AnimatedText from "@/components/animations/AnimatedText";
import NeuralCanvas from "@/components/hero/NeuralCanvas";
import Terminal from "@/components/hero/Terminal";
import Container from "@/components/ui/Container";


export default function Hero() {
  const mail = mailtoHref(profile.email);
  const github = isPlaceholder(profile.github) ? null : profile.github;
  const linkedin = isPlaceholder(profile.linkedin) ? null : profile.linkedin;

  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div>
            <Badge>
              <span
                className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)] motion-safe:animate-pulse"
                aria-hidden="true"
              />
              {profile.statusBadge}
            </Badge>
            <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-dim uppercase">
              {profile.name} · {profile.location}
            </p>
            <AnimatedText
              as="h1"
              className="mt-4 text-4xl leading-[1.06] font-medium tracking-tight text-text sm:text-5xl lg:text-[3.75rem]"
              text={profile.headline}
            />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-[1.05rem]">
              {profile.shortBio}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {profile.focus.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-surface/70 px-3 py-1 font-mono text-[11px] tracking-[0.08em] text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/#projects" variant="primary" arrow>
                Explore My Work
              </Button>
              <Button href="/#contact" variant="secondary">
                Contact Me
              </Button>
              <div className="ml-1 flex items-center gap-2">
                {github ? <SocialLink type="github" href={github} label="GitHub" /> : null}
                {linkedin ? <SocialLink type="linkedin" href={linkedin} label="LinkedIn" /> : null}
                {mail ? <SocialLink type="email" href={mail} label="Email" /> : null}
              </div>
            </div>
            <div className="mt-8">
              <Terminal />
            </div>
          </div>
          <div className="relative h-[300px] sm:h-[420px] lg:h-[520px]">
            <div className="absolute -inset-6 rounded-[28px] bg-[radial-gradient(circle_at_center,rgba(122,219,224,0.12),transparent_62%)]" />
            <div className="relative h-full">
              <NeuralCanvas />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
