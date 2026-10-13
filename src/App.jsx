import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { profile } from "@/data/profile";
import { personJsonLd, professionalJsonLd, websiteJsonLd } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DotGrid from "@/components/react-bits/DotGrid";
import Noise from "@/components/react-bits/Noise";
import SkipLink from "@/components/ui/SkipLink";
import HashScroll from "@/components/layout/HashScroll";
import HomePage from "@/app/page";
import ProjectPage from "@/src/pages/ProjectPage";
import NotFound from "@/src/pages/NotFound";

function DocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/projects/")) return;
    document.title = pathname === "/" ? profile.seo.title : "Page not found";
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <DocumentTitle />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personJsonLd(), websiteJsonLd(), professionalJsonLd()]),
        }}
      />
      <SkipLink />
      <HashScroll />
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <DotGrid
          dotSize={2}
          gap={28}
          baseColor="#1a2428"
          activeColor="#7adbe0"
          proximity={130}
          shockRadius={150}
          shockStrength={2}
          className="!h-full !w-full !p-0"
        />
      </div>
      <Noise opacity={0.055} size={1.1} fixed zIndex={20} />
      <Navbar />
      <main id="main" className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
