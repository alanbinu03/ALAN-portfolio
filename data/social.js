import { profile } from "@/data/profile";

export const social = {
  github: {
    label: "GitHub",
    href: profile.github,
  },
  linkedin: {
    label: "LinkedIn",
    href: profile.linkedin,
  },
  email: {
    label: "Email",
    href: profile.email.startsWith("mailto:")
      ? profile.email
      : `mailto:${profile.email}`,
  },
};

export const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#education", label: "Education" },
  { href: "/#experience", label: "Experience" },
  { href: "/#work", label: "Projects" },
  { href: "/#practice", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export default social;
