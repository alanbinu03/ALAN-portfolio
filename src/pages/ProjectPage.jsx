import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectBySlug, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import ProjectDetail from "@/components/projects/ProjectDetail";
import NotFound from "@/src/pages/NotFound";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    document.title = project
      ? `${project.name} — ${project.category} | ${profile.name}`
      : "Project not found";
  }, [project]);

  if (!project) return <NotFound />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.shortDescription,
    author: { "@type": "Person", name: profile.name },
    keywords: project.stack?.join(", "),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProjectDetail project={project} related={projects.filter((item) => item.slug !== project.slug)} />
    </>
  );
}
