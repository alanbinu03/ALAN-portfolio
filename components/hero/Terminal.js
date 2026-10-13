import { profile } from "@/data/profile";

export default function Terminal() {
  return (
    <div
      className="w-full max-w-md overflow-hidden rounded-[12px] border border-border bg-bg/80 font-mono text-[12px] leading-6 text-muted"
      aria-label="Technical profile terminal"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
        <span className="size-2 rounded-full bg-[#f07178]/70" />
        <span className="size-2 rounded-full bg-[#e6c07b]/70" />
        <span className="size-2 rounded-full bg-[#8fd6b5]/70" />
        <span className="ml-2 text-[10px] tracking-[0.16em] text-dim uppercase">profile.sh</span>
      </div>
      <div className="p-4">
        <p>
          <span className="text-dim">$</span> <span className="text-accent">whoami</span>
        </p>
        <p className="text-text">{profile.name}</p>
        <p className="mt-2">
          <span className="text-dim">$</span> <span className="text-accent">focus</span>
        </p>
        <p className="text-text">{profile.focus.join(" · ")}</p>
      </div>
    </div>
  );
}
