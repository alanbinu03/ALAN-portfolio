import { useEffect, useState } from "react";
import Link from "@/components/ui/Link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Contact from "@/components/sections/Contact";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { projects } from "@/data/projects";

function ProfilePhoto() {
  const [size, setSize] = useState(null);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      const dpr = window.devicePixelRatio || 1;
      setSize({
        width: Math.round(image.naturalWidth / dpr),
        height: Math.round(image.naturalHeight / dpr),
      });
    };
    image.src = profile.image;
  }, []);

  if (!size) return null;

  return (
    <img
      src={profile.image}
      alt={profile.imageAlt}
      width={size.width}
      height={size.height}
      decoding="sync"
      draggable="false"
      className="block rounded-[14px]"
      style={{ width: size.width, height: size.height, maxWidth: "100%" }}
    />
  );
}

export default function StoryPage() {
  const role = experience[0];
  const degree = education[0];

  return (
    <>
      <section id="about" className="pt-10 pb-6 sm:pt-16">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <h1 className="text-5xl font-bold tracking-[-0.04em] text-text sm:text-6xl">{profile.name}</h1>
              <p className="mt-4 text-base text-text/80">
                {role.role} at {role.company}, {role.location}.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">{role.description}</p>
              <p className="mt-4 text-sm text-dim">
                {degree.credential}, {degree.institution}, {degree.period}.
              </p>
            </div>
            <ProfilePhoto />
          </div>
        </Container>
      </section>

      <Section id="work" className="pt-10">
        <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">April 2025 — Present</p>
        <h2 className="mt-3 max-w-xl text-3xl tracking-tight text-text sm:text-4xl">Five systems, one job.</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Since April 2025 the work at {role.company} has been five systems: knowledge agents, live computer
          vision, browser teleoperation, humanoid robotics, and the MLOps pipelines around them.
        </p>
        <ol className="mt-12 space-y-12">
          {projects.map((project, index) => (
            <li key={project.slug} className="border-t border-border pt-8">
              <p className="font-mono text-[11px] tracking-[0.16em] text-dim uppercase">
                {String(index + 1).padStart(2, "0")} · {project.category}
              </p>
              <h3 className="mt-3 text-2xl tracking-tight text-text">
                <Link href={`/projects/${project.slug}`} className="hover:text-white">
                  {project.name}
                </Link>
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{project.shortDescription}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Contact />
    </>
  );
}
