import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

export default function Portrait() {
  const [size, setSize] = useState(null);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      const dpr = window.devicePixelRatio || 1;
      setSize({
        width: Math.round(image.naturalWidth / dpr),
        height: Math.round(image.naturalHeight / dpr),
      });
    };
    image.onerror = () => setSize(null);
    image.src = profile.image;
  }, []);

  if (!size) {
    return (
      <div className="flex h-40 w-28 shrink-0 items-end bg-white/[0.06] p-3">
        <span className="text-3xl font-bold tracking-tight text-white/80">{profile.initials}</span>
      </div>
    );
  }

  return (
    <img
      src={profile.image}
      alt={profile.imageAlt}
      width={size.width}
      height={size.height}
      decoding="sync"
      draggable="false"
      className="shrink-0"
      style={{ width: size.width, height: size.height, maxWidth: "100%" }}
    />
  );
}
