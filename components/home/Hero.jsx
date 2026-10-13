import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { isPlaceholder } from "@/lib/utils";
import Portrait from "@/components/home/Portrait";

export default function Hero() {
  const github = isPlaceholder(profile.github) ? null : profile.github;
  const linkedin = isPlaceholder(profile.linkedin) ? null : profile.linkedin;
  const role = experience[0];
  const degree = education[0];

  return (
    <section id="about" className="px-6 pt-10 pb-2 sm:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-5xl font-bold tracking-[-0.04em] text-white sm:text-6xl">{profile.name}</h1>
          <p className="mt-3 text-sm text-white/75">{role.role}</p>
          <p className="mt-1 text-sm text-white/45">
            {role.company}, {role.location} · {role.period}
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65">{profile.shortBio}</p>
          <p className="mt-3 text-sm text-white/45">
            {degree.credential}, {degree.institution} · {degree.result}
          </p>
          <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/70">
            <a className="hover:text-white" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            {github ? (
              <a className="hover:text-white" href={github} target="_blank" rel="noreferrer noopener">
                GitHub
              </a>
            ) : null}
            {linkedin ? (
              <a className="hover:text-white" href={linkedin} target="_blank" rel="noreferrer noopener">
                LinkedIn
              </a>
            ) : null}
            <a className="hover:text-white" href={profile.resume}>
              Resume
            </a>
          </p>
        </div>
        <Portrait />
      </div>
    </section>
  );
}
