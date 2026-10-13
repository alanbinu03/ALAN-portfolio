export function cn(...values) {
  return values.filter(Boolean).join(" ");
}

export function siteUrl() {
  return import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
}

export function isPlaceholder(value) {
  if (value == null) return true;
  if (typeof value !== "string") return false;
  return value.includes("TODO") || value === "—";
}

export function safeExternalHref(href) {
  if (!href || isPlaceholder(href)) return null;
  return href;
}

export function mailtoHref(email) {
  if (!email || isPlaceholder(email)) return null;
  return email.startsWith("mailto:") ? email : `mailto:${email}`;
}
