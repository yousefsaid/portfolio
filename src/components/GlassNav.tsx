import { SITE } from "@/data/site";
import { ScrambleText } from "./ScrambleText";

export function GlassNav() {
  return (
    <header className="flex justify-center pt-6 relative z-20">
      <nav
        className="glass flex items-center gap-4 sm:gap-8 rounded-full py-2.5 sm:py-3 pl-5 sm:pl-6 pr-3 sm:pr-3.5"
        aria-label="Main navigation"
      >
        <a
          href="#top"
          className="text-(--ink) font-extrabold text-[19px] tracking-tight"
        >
          {SITE.wordmark}
        </a>
        <a href="#projects" className="nav-link">
          <ScrambleText text="Projects" />
        </a>
        <a href="#experience" className="nav-link hidden sm:inline">
          <ScrambleText text="Experience" />
        </a>
        <a href="#about" className="nav-link">
          <ScrambleText text="About" />
        </a>
        <a
          href={SITE.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link hidden md:inline"
        >
          <ScrambleText text="GitHub" />
        </a>
        <a
          href={SITE.links.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-btn glass-btn-primary !py-2.5 !px-5 !text-[13.5px]"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
