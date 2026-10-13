"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function GlowCard({ children, className, as: Tag = "div" }) {
  const ref = useRef(null);
  const raf = useRef(0);

  const onMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = event;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - rect.left}px`);
      el.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      data-cursor="true"
      className={cn(
        "glow-card group relative overflow-hidden rounded-[14px] border border-border bg-surface/80",
        className,
      )}
    >
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
