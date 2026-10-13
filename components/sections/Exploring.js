import Section from "@/components/ui/Section";
import { profile } from "@/data/profile";

export default function Exploring() {
  return (
    <Section id="exploring" className="py-16 sm:py-20">
      <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
        Currently Exploring
      </p>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Active research interests — the questions I am reading, building, and testing against.
      </p>
      <div className="mt-8 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
        {profile.exploring.map((topic, index) => (
          <p key={topic} className="border-t border-border py-5 text-lg text-text">
            <span className="mr-3 font-mono text-[11px] text-dim">
              {String(index + 1).padStart(2, "0")}
            </span>
            {topic}
          </p>
        ))}
      </div>
    </Section>
  );
}
