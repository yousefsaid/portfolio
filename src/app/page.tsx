import { Suspense } from "react";
import { GradientBackground } from "@/components/GradientBackground";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { GlassNav } from "@/components/GlassNav";
import { HeroStage } from "@/components/HeroStage";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { GitHubActivity } from "@/components/GitHubActivity";
import { ContactCta } from "@/components/ContactCta";
import { Footer } from "@/components/Footer";
import { SITE } from "@/data/site";

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: "Software Engineer",
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Waterloo" },
    { "@type": "CollegeOrUniversity", name: "Georgia Institute of Technology" },
  ],
  sameAs: [SITE.links.github, SITE.links.linkedin],
};

export default function Home() {
  return (
    <main id="top" className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
      />
      <div className="bg-mesh" aria-hidden />
      <GradientBackground />
      <CursorSpotlight />
      <GlassNav />
      <HeroStage />
      <ProjectGrid />
      <Experience />
      <About />
      <Suspense fallback={null}>
        <GitHubActivity />
      </Suspense>
      <ContactCta />
      <Footer />
    </main>
  );
}
