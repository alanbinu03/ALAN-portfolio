import Hero from "@/components/home/Hero";
import WorkList from "@/components/home/WorkList";
import SkillBoard from "@/components/home/SkillBoard";
import Record from "@/components/home/Record";
import ContactPanel from "@/components/home/ContactPanel";

export default function HomePage() {
  return (
    <div className="text-white/80">
      <Hero />
      <WorkList />
      <SkillBoard />
      <Record />
      <ContactPanel />
    </div>
  );
}
