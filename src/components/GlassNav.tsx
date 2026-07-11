import { SITE } from "@/data/site";

export function GlassNav() {
  return (
    <header className="flex justify-center pt-6 relative z-20">
      <nav
        className="glass flex items-center gap-4 sm:gap-8 rounded-full py-2.5 sm:py-3 pl-5 sm:pl-6 pr-3 sm:pr-3.5"
        aria-label="Main navigation"
      >
        <a
          href="#top"
          className="iridescent-text font-extrabold text-[19px] tracking-tight"
        >
          {SITE.wordmark}
        </a>
        <a href="#projects" className="nav-link">
          Projects
        </a>
        <a href="#about" className="nav-link">
          About
        </a>
        <a
          href={SITE.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link hidden sm:inline"
        >
          GitHub
        </a>
        <a
          href={SITE.links.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-5 py-2.5 text-[13.5px] font-bold text-white shadow-[0_6px_18px_rgba(110,91,208,0.35)]"
          style={{
            background: "linear-gradient(120deg, #6e5bd0, #4f9fe0)",
          }}
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
