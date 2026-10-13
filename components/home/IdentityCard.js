import { useRef, useState } from "react";
import { profile } from "@/data/profile";

export default function IdentityCard() {
  const cardRef = useRef(null);
  const drag = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onPointerDown = (event) => {
    drag.current = {
      x: event.clientX - offset.x,
      y: event.clientY - offset.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!drag.current) return;
    setOffset({
      x: event.clientX - drag.current.x,
      y: event.clientY - drag.current.y,
    });
  };

  const onPointerUp = () => {
    drag.current = null;
  };

  return (
    <div className="flex flex-col items-center">
      <article
        ref={cardRef}
        className="w-[280px] cursor-grab touch-none rounded-[22px] border border-white/10 bg-[#121212] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)] active:cursor-grabbing"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="flex h-44 items-end rounded-2xl bg-[radial-gradient(circle_at_50%_20%,#2a2a2a,transparent_55%),linear-gradient(#1a1a1a,#0d0d0d)] p-4">
          <span className="text-5xl tracking-tight text-white/80">{profile.initials}</span>
        </div>
        <div className="px-2 pt-4 pb-3">
          <h2 className="text-2xl tracking-tight text-white">{profile.name}</h2>
          <p className="mt-1 text-sm text-white/55">Junior Engineer - AI</p>
          <p className="mt-5 font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
            Hind Rectifiers Limited
          </p>
        </div>
      </article>
      <p className="mt-6 font-mono text-[11px] tracking-[0.28em] text-white/35 uppercase">Drag the card</p>
    </div>
  );
}
