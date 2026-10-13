import Link from "@/components/ui/Link";
import { projects } from "@/data/projects";

export default function WorkList() {
  return (
    <section id="work" className="px-6 py-8 sm:px-8">
      <div className="mx-auto w-full max-w-4xl border-t border-white/10 pt-8">
        <h2 className="text-lg text-white">Work</h2>
        <p className="mt-1 text-sm text-white/45">Hind Rectifiers Limited · April 2025 — Present</p>
        <ol className="mt-4 divide-y divide-white/10">
          {projects.map((project) => (
            <li key={project.slug} className="py-4">
              <h3 className="text-base text-white">
                <Link href={`/projects/${project.slug}`} className="hover:underline">
                  {project.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-white/45">
                {project.category}
                <span className="text-white/25"> · </span>
                {project.stack.join(", ")}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
