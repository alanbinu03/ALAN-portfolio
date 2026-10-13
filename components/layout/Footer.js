import Link from "@/components/ui/Link";
import { profile } from "@/data/profile";
import { navLinks } from "@/data/social";
import { isPlaceholder, mailtoHref } from "@/lib/utils";

export default function Footer() {
  const year = new Date().getFullYear();
  const github = isPlaceholder(profile.github) ? null : profile.github;
  const linkedin = isPlaceholder(profile.linkedin) ? null : profile.linkedin;
  const mail = mailtoHref(profile.email);

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#0b0d12]">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-base font-medium tracking-tight text-white">{profile.name}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{profile.role}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {mail ? (
              <a className="text-muted transition-colors hover:text-white" href={mail}>
                {profile.email}
              </a>
            ) : null}
            {github ? (
              <a className="text-muted transition-colors hover:text-white" href={github} target="_blank" rel="noreferrer noopener">
                GitHub
              </a>
            ) : null}
            {linkedin ? (
              <a className="text-muted transition-colors hover:text-white" href={linkedin} target="_blank" rel="noreferrer noopener">
                LinkedIn
              </a>
            ) : null}
            <a className="text-muted transition-colors hover:text-white" href={profile.resume} target="_blank" rel="noreferrer">
              Resume
            </a>
          </div>
          <p className="text-sm text-dim">© {year}</p>
        </div>
      </div>
    </footer>
  );
}
