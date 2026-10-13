"use client";

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import Reveal from "@/components/animations/Reveal";
import { expertise } from "@/data/expertise";

export default function Expertise() {
  return (
    <Section id="expertise">
      <SectionHeading
        eyebrow="Expertise"
        title="Skills across AI, vision, robotics, and operations."
        description="The same groups and tools listed on the resume."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {expertise.map((item, index) => (
          <Reveal key={item.id} delay={Math.min(index * 0.05, 0.2)} className="h-full">
            <GlowCard className="h-full p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl text-text">{item.title}</h3>
                <span className="font-mono text-[11px] text-dim">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{item.summary}</p>
              <ul className="mt-5 space-y-1.5">
                {item.items.map((entry) => (
                  <li key={entry} className="font-mono text-[12px] text-dim">
                    <span className="text-accent/80">/</span> {entry}
                  </li>
                ))}
              </ul>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
