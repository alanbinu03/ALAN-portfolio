"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 90;

function pad(index) {
  return String(index).padStart(3, "0");
}

function frameSrc(index) {
  return `/hero-frames/frame-${pad(index)}.jpg`;
}

function fract(value) {
  return value - Math.floor(value);
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function drawCover(ctx, image, width, height, progress) {
  const scale = 1.16 - progress * 0.1;
  const cover = Math.max(width / image.naturalWidth, height / image.naturalHeight) * scale;
  const dw = image.naturalWidth * cover;
  const dh = image.naturalHeight * cover;
  const dx = (width - dw) / 2 + (progress - 0.5) * width * 0.08;
  const dy = (height - dh) / 2 + Math.sin(progress * Math.PI) * height * 0.03;
  ctx.drawImage(image, dx, dy, dw, dh);
}

function drawLightSweep(ctx, width, height, progress) {
  const x = -width * 0.3 + progress * width * 1.5;
  const sweep = ctx.createLinearGradient(x, 0, x + width * 0.22, height * 0.2);
  sweep.addColorStop(0, "rgba(255,255,255,0)");
  sweep.addColorStop(0.5, "rgba(214, 232, 255, 0.16)");
  sweep.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sweep;
  ctx.fillRect(0, 0, width, height);
}

function drawVignette(ctx, width, height) {
  const vignette = ctx.createRadialGradient(
    width * 0.5,
    height * 0.45,
    width * 0.15,
    width * 0.5,
    height * 0.5,
    width * 0.72,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.62)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
}

function drawProcedural(ctx, width, height, progress) {
  ctx.clearRect(0, 0, width, height);

  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, "#090b12");
  background.addColorStop(0.55, "#070910");
  background.addColorStop(1, "#04060a");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  const glowX = width * (0.28 + progress * 0.48);
  const glowY = height * (0.34 + Math.sin(progress * Math.PI) * 0.06);
  const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, width * 0.55);
  glow.addColorStop(0, "rgba(122, 219, 224, 0.2)");
  glow.addColorStop(0.45, "rgba(142, 197, 255, 0.06)");
  glow.addColorStop(1, "rgba(122, 219, 224, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  const horizon = height * (0.58 + progress * 0.04);
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, horizon, width, height - horizon);
  ctx.clip();
  ctx.strokeStyle = "rgba(122, 219, 224, 0.28)";
  ctx.lineWidth = 1;
  const vanishX = width * (0.5 + (progress - 0.5) * 0.18);
  for (let i = 0; i <= 12; i += 1) {
    ctx.globalAlpha = 0.18;
    ctx.beginPath();
    ctx.moveTo(vanishX, horizon);
    ctx.lineTo((i / 12) * width, height);
    ctx.stroke();
  }
  for (let i = 0; i < 9; i += 1) {
    const t = i / 9;
    const y = horizon + t ** 1.7 * (height - horizon);
    ctx.globalAlpha = 0.08 + t * 0.28;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();
  ctx.globalAlpha = 1;

  const sway = Math.sin(progress * Math.PI) * Math.min(18, width * 0.03);
  const cardW = Math.min(width * 0.42, 250);
  const cardH = cardW * 1.32;
  const cx = width * 0.5 + sway;
  const cy = height * 0.43;

  ctx.save();
  roundRect(ctx, cx - cardW / 2, cy - cardH / 2, cardW, cardH, 18);
  ctx.clip();
  const portrait = ctx.createLinearGradient(cx, cy - cardH / 2, cx, cy + cardH / 2);
  portrait.addColorStop(0, "#243044");
  portrait.addColorStop(0.42, "#141a24");
  portrait.addColorStop(1, "#0a0d12");
  ctx.fillStyle = portrait;
  ctx.fillRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH);
  const sweepX = cx - cardW / 2 - 40 + progress * (cardW + 80);
  const band = ctx.createLinearGradient(sweepX, cy - cardH, sweepX + 70, cy + cardH);
  band.addColorStop(0, "rgba(255,255,255,0)");
  band.addColorStop(0.5, "rgba(214, 232, 255, 0.28)");
  band.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = band;
  ctx.fillRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH);
  ctx.restore();

  ctx.strokeStyle = "rgba(122, 219, 224, 0.55)";
  ctx.lineWidth = 1.25;
  roundRect(ctx, cx - cardW / 2, cy - cardH / 2, cardW, cardH, 18);
  ctx.stroke();

  for (let i = 0; i < 24; i += 1) {
    const x = fract(Math.sin(i * 12.9898) * 43758.5453) * width;
    const y = fract(Math.cos(i * 78.233) * 12345.6789 + progress * 0.45) * height;
    ctx.fillStyle = "rgba(243, 245, 248, 0.35)";
    ctx.fillRect(x, y, 1.4, 1.4);
  }

  drawVignette(ctx, width, height);
}

function drawFrame(ctx, image, width, height, progress) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#05060a";
  ctx.fillRect(0, 0, width, height);
  drawCover(ctx, image, width, height, progress);
  drawLightSweep(ctx, width, height, progress);
  drawVignette(ctx, width, height);
}

export default function ScrollSequence({ sectionRef }) {
  const canvasRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef?.current;
    if (!canvas || !section) return undefined;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const images = [];
    let mode = "procedural";
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let visible = true;
    let progress = reduce ? 0.42 : 0;
    let sequenceCount = FRAME_COUNT;
    const photo = new Image();
    let photoReady = false;

    photo.onload = () => {
      if (photo.naturalWidth > 0) {
        photoReady = true;
        mode = mode === "frames" ? mode : "photo";
      }
    };
    photo.src = "/images/profile.jpg";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const paint = () => {
      const frameIndex = Math.min(
        sequenceCount,
        Math.max(1, Math.round(progress * (sequenceCount - 1)) + 1),
      );
      if (labelRef.current) {
        labelRef.current.textContent = `Frame ${pad(frameIndex)} / ${pad(sequenceCount)}`;
      }

      if (mode === "frames") {
        const image = images[frameIndex - 1];
        if (image?.complete && image.naturalWidth > 0) {
          drawFrame(ctx, image, width, height, progress);
          return;
        }
      }

      if (mode === "photo" && photoReady) {
        drawFrame(ctx, photo, width, height, progress);
        return;
      }

      drawProcedural(ctx, width, height, progress);
    };

    const tick = () => {
      if (!running) return undefined;
      const rect = section.getBoundingClientRect();
      const span = Math.max(section.offsetHeight - window.innerHeight, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), span);
      const target = reduce ? 0.42 : scrolled / span;
      progress += (target - progress) * (reduce ? 1 : 0.16);
      if (visible) paint();
      raf = requestAnimationFrame(tick);
      return undefined;
    };

    resize();
    paint();
    raf = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(section);
    window.addEventListener("resize", resize, { passive: true });

    fetch("/hero-frames/manifest.json")
      .then((response) => (response.ok ? response.json() : null))
      .then((manifest) => {
        const count = Number(manifest?.count) || 0;
        if (!count) return;
        sequenceCount = count;
        let ready = 0;
        for (let index = 1; index <= count; index += 1) {
          const image = new Image();
          image.onload = () => {
            ready += 1;
            if (ready === 1) mode = "frames";
          };
          image.src = frameSrc(index);
          images[index - 1] = image;
        }
      })
      .catch(() => {});

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [sectionRef]);

  return (
    <div className="relative h-full min-h-[280px] w-full overflow-hidden rounded-[14px] border border-border bg-[#07080c]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-3 rounded-[10px] border border-white/10" />
      <p
        ref={labelRef}
        className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.18em] text-white/70 uppercase"
      >
        Frame 001 / 090
      </p>
    </div>
  );
}
