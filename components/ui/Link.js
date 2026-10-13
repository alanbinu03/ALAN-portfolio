import { Link as RouterLink } from "react-router-dom";

export function isSpaPath(href) {
  if (!href || !href.startsWith("/")) return false;
  return !/\.[a-z0-9]+($|\?)/i.test(href);
}

export default function Link({ href, children, ...props }) {
  if (!isSpaPath(href)) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={href} {...props}>
      {children}
    </RouterLink>
  );
}
