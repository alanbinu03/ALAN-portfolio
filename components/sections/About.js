import { useEffect, useState } from "react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { isPlaceholder } from "@/lib/utils";

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
      className="block"
      style={{ width: size.width, height: size.height, maxWidth: "100%" }}
    />
  );
}

export default function About() {
  const stats = profile.statistics.filter((stat) => !isPlaceholder(stat.value));

  return (
    <Section id="about">
      <div className="grid items-start gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div className="relative mx-auto w-fit max-w-full">
          <div className="absolute -inset-6 rounded-[28px] bg-[radial-gradient(circle_at_50%_20%,rgba(122,219,224,0.16),transparent_64%)]" />
          <div className="corner-frame relative overflow-hidden rounded-[14px] border border-border bg-surface">
            <ProfilePhoto />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
            <div className="absolute right-4 bottom-4 left-4">
              <p className="text-lg tracking-tight text-text">{profile.name}</p>
              <p className="mt-0.5 font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
                {profile.role}
              </p>
            </div>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="About"
            title="From concept to implementation."
            description={profile.longBio[0]}
          />
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
            {profile.longBio.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {profile.interests.map((item) => (
              <li
                key={item}
                className="rounded-md border border-border bg-bg-elevated px-2.5 py-1 font-mono text-[11px] text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
          {stats.length ? (
            <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-[12px] border border-border bg-surface/70 p-4">
                  <dt className="font-mono text-[11px] tracking-[0.14em] text-dim uppercase">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 text-2xl text-text">{stat.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
