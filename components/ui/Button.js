import Link, { isSpaPath } from "@/components/ui/Link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "shine bg-text text-bg hover:bg-white border border-transparent",
  secondary:
    "border border-border-strong bg-transparent text-text hover:border-accent/50 hover:bg-accent/5",
  ghost: "border border-transparent text-muted hover:text-text",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className,
  arrow = false,
  external = false,
  disabled = false,
  type = "button",
  onClick,
  ariaLabel,
}) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-[10px] px-4 py-2.5 text-sm font-medium transition-colors duration-200",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowUpRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (href && !disabled) {
    if (external || !isSpaPath(href)) {
      return (
        <a
          href={href}
          className={classes}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer noopener" : undefined}
          aria-label={ariaLabel}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
