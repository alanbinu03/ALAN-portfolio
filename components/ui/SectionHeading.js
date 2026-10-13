import { cn } from "@/lib/utils";

export default function SectionHeading({ eyebrow, title, description, className }) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl leading-tight font-medium tracking-tight text-text sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
