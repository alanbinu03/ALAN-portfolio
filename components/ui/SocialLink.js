"use client";

import { Mail } from "lucide-react";
import { cn, isPlaceholder } from "@/lib/utils";

function GithubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

const icons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

export default function SocialLink({ type, href, label, className }) {
  const Icon = icons[type] ?? Mail;
  const disabled = !href || isPlaceholder(href);

  if (disabled) {
    return (
      <span
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-full border border-border text-dim",
          className,
        )}
        title={`${label} — TODO: add link in data/profile.js`}
      >
        <Icon className="size-4" aria-hidden="true" />
        <span className="sr-only">{label} (not configured)</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noreferrer noopener"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors duration-200 hover:border-accent/40 hover:text-text",
        className,
      )}
      aria-label={label}
    >
      <Icon className="size-4" aria-hidden="true" />
    </a>
  );
}
