import { PROJECTS } from "@/data/projects";

/**
 * Scannable glass-card grid of all projects — the fast path for
 * recruiters, complementing the interactive globe above.
 */
export function ProjectGrid() {
  return (
    <section id="projects" className="relative z-10 px-6 pt-24 sm:pt-28">
      <p className="text-center text-[12.5px] font-bold tracking-[0.22em] uppercase text-(--ink-45) mb-4">
        Work
      </p>
      <h2 className="text-center text-[32px] sm:text-[40px] font-extrabold tracking-tight mb-10">
        Projects
      </h2>
      <div className="grid gap-5 max-w-[1060px] mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className="glass relative rounded-[26px] p-7 flex flex-col transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="w-10 h-10 rounded-xl shrink-0 shadow-[0_6px_16px_rgba(0,0,0,0.4)]"
                style={{ background: project.hue }}
              />
              {project.award && (
                <span className="ml-auto rounded-full px-3 py-1 text-[11px] font-bold tracking-wide bg-[rgba(242,200,148,0.15)] border border-[rgba(242,200,148,0.35)] text-[#f2c894]">
                  {project.award}
                </span>
              )}
            </div>
            <h3 className="text-[19px] font-extrabold tracking-tight mb-1">
              {project.title}
            </h3>
            <p className="font-mono text-[11px] text-(--ink-45) mb-3">
              {project.tag}
            </p>
            <p className="text-[14px] leading-relaxed text-(--ink-60) mb-5">
              {project.description}
            </p>
            <div className="flex gap-2.5 mt-auto">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-4 py-2 text-[12.5px] font-bold bg-white text-[#14131f] hover:opacity-90 transition-opacity"
                >
                  Live →
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-4 py-2 text-[12.5px] font-bold bg-white/10 text-(--ink) border border-white/20 hover:bg-white/20 transition-colors"
                >
                  GitHub
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
