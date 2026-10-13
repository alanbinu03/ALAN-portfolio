import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SafeImage({
  src,
  alt,
  fallback = "/images/fallback.svg",
  className,
  fill,
  width,
  height,
  priority = false,
}) {
  const [current, setCurrent] = useState(src || fallback);

  return (
    <img
      src={current}
      alt={alt || "Image"}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
      loading={priority ? "eager" : "lazy"}
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
    />
  );
}
