import { siteUrl } from "@/lib/utils";
import { profile } from "@/data/profile";
import { education } from "@/data/education";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.shortBio,
    url: siteUrl(),
    email: profile.email.includes("TODO") ? undefined : profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nashik",
      addressCountry: "IN",
    },
    alumniOf: education.map((item) => ({
      "@type": "EducationalOrganization",
      name: item.institution,
    })),
    sameAs: [profile.github, profile.linkedin].filter((href) => !href.includes("TODO")),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} — ${profile.role}`,
    url: siteUrl(),
    description: profile.seo.description,
  };
}

export function professionalJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.role,
      description: profile.shortBio,
    },
  };
}
