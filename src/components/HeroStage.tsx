import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import { LiquidWordmark } from "./LiquidWordmark";
import { ProjectGlobe } from "./ProjectGlobe";

/**
 * The hero: intro column on the left, the draggable project globe on
 * the right. Hovering a globe tile expands it in place, so the intro
 * never disappears.
 */
export function HeroStage() {
  return (
    <section className="relative flex flex-col lg:block min-h-[calc(100vh-82px)]">
      {/* Left column — intro */}
      <div className="relative z-10 px-6 pt-10 lg:pt-0 lg:px-0 lg:absolute lg:left-[6vw] lg:top-1/2 lg:-translate-y-1/2 lg:max-w-[420px]">
        <h1 className="text-[72px] sm:text-[96px] font-extrabold tracking-tighter leading-none">
          <LiquidWordmark text={SITE.wordmark} />
        </h1>
        <p className="text-[32px] sm:text-[40px] font-extrabold tracking-tight mt-1.5">
          {SITE.name}
        </p>
        <p className="font-mono text-[12.5px] tracking-wide text-(--ink-45) mt-2">
          {SITE.role}
        </p>
        <p className="text-[17px] font-medium text-(--ink-60) mt-2.5 leading-normal">
          {SITE.tagline}
        </p>
        <div className="flex flex-wrap gap-3 mt-7">
          <a
            href={SITE.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn glass-btn-primary"
          >
            View Resume
          </a>
          <a
            href={SITE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn"
          >
            GitHub
          </a>
          <a
            href={SITE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn"
          >
            LinkedIn
          </a>
        </div>
        <p className="font-mono text-xs tracking-wider text-(--ink-45) mt-8">
          drag the globe · hover a project
        </p>
      </div>

      {/* Globe */}
      <div className="relative flex-1 min-h-[480px] lg:absolute lg:right-[4vw] lg:top-1/2 lg:-translate-y-1/2 lg:w-[min(720px,58vw)] lg:h-[min(720px,88vh)] flex items-center justify-center">
        <ProjectGlobe projects={PROJECTS} />
      </div>

      <p className="hidden lg:block absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11.5px] tracking-[0.14em] uppercase text-[rgba(241,239,250,0.35)]">
        projects · drag to explore
      </p>
    </section>
  );
}
