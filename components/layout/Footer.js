import { FileText, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { isPlaceholder, mailtoHref } from "@/lib/utils";
import Dock from "@/components/react-bits/Dock";
import GradualBlur from "@/components/react-bits/GradualBlur";
import GradientText from "@/components/react-bits/GradientText";

export default function Footer() {
  const github = isPlaceholder(profile.github) ? null : profile.github;
  const linkedin = isPlaceholder(profile.linkedin) ? null : profile.linkedin;
  const mail = mailtoHref(profile.email);
  const items = [
    mail
      ? { label: "Email", icon: <Mail size={18} />, onClick: () => { window.location.href = mail; } }
      : null,
    github
      ? {
          label: "GitHub",
          icon: <span className="text-[11px] font-semibold">GH</span>,
          onClick: () => window.open(github, "_blank", "noopener"),
        }
      : null,
    linkedin
      ? {
          label: "LinkedIn",
          icon: <span className="text-[11px] font-semibold">in</span>,
          onClick: () => window.open(linkedin, "_blank", "noopener"),
        }
      : null,
    {
      label: "Resume",
      icon: <FileText size={18} />,
      onClick: () => window.open(profile.resume, "_blank", "noopener"),
    },
  ].filter(Boolean);

  return (
    <footer className="relative z-10 border-t border-white/10 pt-8 pb-28">
      <GradualBlur preset="subtle" zIndex={2} />
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between px-5 text-sm text-white/40 sm:px-6 lg:px-8">
        <GradientText colors={["#7adbe0", "#f3f5f8"]} animationSpeed={8} className="text-sm">
          {profile.name}
        </GradientText>
        <p>© {new Date().getFullYear()}</p>
      </div>
      <Dock items={items} accentColor="#7adbe0" baseItemSize={46} magnification={62} panelHeight={64} />
    </footer>
  );
}
