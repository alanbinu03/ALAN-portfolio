export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-[10px] focus:bg-text focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
    >
      Skip to content
    </a>
  );
}
