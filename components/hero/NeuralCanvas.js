"use client";

import { useEffect, useRef } from "react";

const LAYERS = [
  { count: 4, label: "SENSE" },
  { count: 6, label: "ENCODE" },
  { count: 5, label: "POLICY" },
  { count: 3, label: "ACT" },
];

export default function NeuralCanvas() {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    if (!canvas || !frame) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nodes = [];
    LAYERS.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.count; i += 1) {
        nodes.push({
          layer: layerIndex,
          index: i,
          count: layer.count,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    });

    const connections = [];
    for (let layer = 0; layer < LAYERS.length - 1; layer += 1) {
      const from = nodes.filter((n) => n.layer === layer);
      const to = nodes.filter((n) => n.layer === layer + 1);
      from.forEach((a, ai) => {
        to.forEach((b, bi) => {
          if (Math.abs(ai / from.length - bi / to.length) < 0.55 || Math.random() > 0.72) {
            connections.push({ a, b, t: Math.random() });
          }
        });
      });
    }

    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;
    let playing = true;

    const position = (node) => {
      const xPad = Math.max(36, w * 0.08);
      const yPad = 48;
      const x = xPad + (node.layer / (LAYERS.length - 1)) * (w - xPad * 2);
      const y = yPad + ((node.index + 1) / (node.count + 1)) * (h - yPad * 2);
      return { x, y };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      connections.forEach((c) => {
        const a = position(c.a);
        const b = position(c.b);
        ctx.strokeStyle = "rgba(186, 214, 255, 0.16)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        if (!reduce) {
          const p = (c.t + t * 0.06) % 1;
          ctx.fillStyle = "rgba(122, 219, 224, 0.9)";
          ctx.beginPath();
          ctx.arc(a.x + (b.x - a.x) * p, a.y + (b.y - a.y) * p, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      nodes.forEach((node) => {
        const { x, y } = position(node);
        const intensity = reduce ? 0.4 : 0.38 + Math.sin(t + node.pulse) * 0.2;
        ctx.fillStyle = `rgba(122, 219, 224, ${0.12 + intensity * 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#eef1f6";
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduce && playing) {
        t += 0.016;
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    draw();

    const onResize = () => {
      resize();
      if (reduce) draw();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        playing = entry.isIntersecting && document.visibilityState === "visible";
        if (playing && !reduce) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(frame);

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className="relative h-full min-h-[280px] w-full overflow-hidden rounded-[14px] border border-border bg-bg-elevated/80"
    >
      <div className="pointer-events-none absolute inset-3 rounded-[10px] border border-border/80" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-x-5 top-4 flex justify-between font-mono text-[10px] tracking-[0.2em] text-dim uppercase">
        {LAYERS.map((layer) => (
          <span key={layer.label}>{layer.label}</span>
        ))}
      </div>
      <p className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.18em] text-dim uppercase">
        Perception graph
      </p>
    </div>
  );
}
