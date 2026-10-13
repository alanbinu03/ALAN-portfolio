import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return undefined;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return undefined;

    dot.dataset.on = "true";
    document.documentElement.classList.add("has-cursor");

    let x = -40;
    let y = -40;
    let currentX = x;
    let currentY = y;
    let raf = 0;
    let hover = false;

    const loop = () => {
      currentX += (x - currentX) * 0.28;
      currentY += (y - currentY) * 0.28;
      const scale = hover ? 1.55 : 1;
      dot.style.transform = `translate3d(${currentX - 6}px, ${currentY - 6}px, 0) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };

    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
    };

    const over = (event) => {
      hover = Boolean(
        event.target.closest("a, button, input, textarea, select, [data-cursor]"),
      );
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[80] hidden h-3 w-3 rounded-full border border-accent/80 data-[on=true]:block"
      aria-hidden="true"
    />
  );
}
