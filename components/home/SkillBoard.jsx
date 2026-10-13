import { skillGroups } from "@/data/skills";

export default function SkillBoard() {
  return (
    <section id="capabilities" className="px-6 py-8 sm:px-8">
      <div className="mx-auto w-full max-w-4xl border-t border-white/10 pt-8">
        <h2 className="text-lg text-white">Skills</h2>
        <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.id}>
              <dt className="text-sm text-white/85">{group.label}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-white/50">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
