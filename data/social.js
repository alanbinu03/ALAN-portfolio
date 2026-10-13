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
  { href: "/#work", label: "Work" },
  { href: "/#practice", label: "Practice" },
  { href: "/#record", label: "Record" },
  { href: "/#contact", label: "Contact" },
];

export default social;
