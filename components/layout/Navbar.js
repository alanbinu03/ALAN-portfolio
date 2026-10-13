"use client";

import { useEffect, useState } from "react";
import Link from "@/components/ui/Link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { navLinks } from "@/data/social";
import { cn, mailtoHref, isPlaceholder } from "@/lib/utils";
import Button from "@/components/ui/Button";
import SocialLink from "@/components/ui/SocialLink";
import Magnet from "@/components/react-bits/Magnet";
import StarBorder from "@/components/react-bits/StarBorder";

export default function Navbar() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const github = isPlaceholder(profile.github) ? null : profile.github;
  const linkedin = isPlaceholder(profile.linkedin) ? null : profile.linkedin;
  const mail = mailtoHref(profile.email);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <nav
        className={cn(
          "mx-auto flex max-w-[1120px] items-center justify-between overflow-x-clip rounded-[14px] border px-3 py-2.5 sm:px-4",
          "border-border bg-bg/75 backdrop-blur-xl",
          scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.28)]" : "",
        )}
        aria-label="Primary"
      >
        <Magnet magnetStrength={5} padding={24}>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium tracking-tight text-text"
            aria-label={`${profile.name} home`}
          >
            {profile.name}
          </Link>
        </Magnet>

        <ul className="hidden items-center gap-4 lg:flex xl:gap-5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-underline text-[13px] text-muted transition-colors duration-200 hover:text-text"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="hidden items-center gap-2 xl:flex">
            {github ? <SocialLink type="github" href={github} label="GitHub" className="size-9" /> : null}
            {linkedin ? <SocialLink type="linkedin" href={linkedin} label="LinkedIn" className="size-9" /> : null}
            {mail ? <SocialLink type="email" href={mail} label="Email" className="size-9" /> : null}
          </div>
          <StarBorder
            as="a"
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            color="#7adbe0"
            radius={10}
            thickness={1}
            className="!px-3 !py-2 text-xs"
          >
            Resume
          </StarBorder>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md border border-border text-text lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="glass fixed inset-x-3 top-[4.6rem] z-50 max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-[14px] border border-border lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col p-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block border-b border-border py-3 text-base text-text"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 px-4 pb-4">
              {github ? <SocialLink type="github" href={github} label="GitHub" /> : null}
              {linkedin ? <SocialLink type="linkedin" href={linkedin} label="LinkedIn" /> : null}
              {mail ? <SocialLink type="email" href={mail} label="Email" /> : null}
              <Button href={profile.resume} variant="secondary" className="ml-auto">
                Resume
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
