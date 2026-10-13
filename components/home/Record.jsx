import { experience } from "@/data/experience";
import { education } from "@/data/education";

export default function Record() {
  const role = experience[0];

  return (
    <section id="experience" className="px-6 py-8 sm:px-8">
      <div className="mx-auto w-full max-w-4xl border-t border-white/10 pt-8">
        <h2 className="text-lg text-white">Experience</h2>
        <div className="mt-4">
          <h3 className="text-base text-white">{role.role}</h3>
          <p className="mt-1 text-sm text-white/45">
            {role.company}, {role.location} · {role.period}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">{role.description}</p>
          <ul className="mt-3 max-w-2xl space-y-2 text-sm leading-relaxed text-white/55">
            {role.responsibilities.map((item) => {
              const line = typeof item === "string" ? item : `${item.title}: ${item.text}`;
              return <li key={line}>{line}</li>;
            })}
          </ul>
        </div>
        <div id="education" className="mt-8">
          <h2 className="text-lg text-white">Education</h2>
          <ul className="mt-4 space-y-3">
            {education.map((item) => (
              <li key={item.id} className="text-sm">
                <p className="text-white/85">{item.credential || item.institution}</p>
                <p className="text-white/45">
                  {item.credential ? `${item.institution} · ` : ""}
                  {item.period}
                  {item.result ? ` · ${item.result}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
