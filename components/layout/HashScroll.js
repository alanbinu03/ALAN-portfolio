import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToId, scrollToTop } from "@/lib/scroll";

export default function HashScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        requestAnimationFrame(() => scrollToId(hash));
      }
    };

    const timer = window.setTimeout(applyHash, 40);
    window.addEventListener("hashchange", applyHash);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", applyHash);
    };
  }, [pathname]);

  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest("a[href]");
      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) {
        return;
      }
      if (link.target === "_blank") return;

      let url;
      try {
        url = new URL(link.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      if (url.pathname === pathname && !url.hash && !url.search) {
        event.preventDefault();
        history.pushState(null, "", pathname);
        scrollToTop();
        return;
      }

      if (!url.hash) return;
      if (url.pathname !== pathname) return;

      event.preventDefault();
      history.pushState(null, "", `${url.pathname}${url.hash}`);
      scrollToId(url.hash.slice(1));
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return null;
}
