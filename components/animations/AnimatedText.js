"use client";

export default function AnimatedText({ text, className, as: Tag = "span" }) {
  const lines = String(text).split("\n");

  return (
    <Tag className={className}>
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </Tag>
  );
}
