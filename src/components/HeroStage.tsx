"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import { ProjectGlobe } from "./ProjectGlobe";
import { ProjectPanel } from "./ProjectPanel";

const PANEL_TRANSITION = { duration: 0.35, ease: "easeOut" } as const;

/**
 * The hero: intro column (or project detail panel) on the left,
 * the draggable project globe on the right.
 */
export function HeroStage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = PROJECTS.find((p) => p.id === selectedId) ?? null;

  return (
    <section
      id="projects"
      className="relative flex flex-col lg:block min-h-[calc(100vh-82px)]"
    >
      {/* Left column — intro or project panel */}
      <div className="relative z-10 px-6 pt-10 lg:pt-0 lg:px-0 lg:absolute lg:left-[6vw] lg:top-1/2 lg:-translate-y-1/2 lg:max-w-[420px]">
        <AnimatePresence mode="wait" initial={false}>
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={PANEL_TRANSITION}
            >
              <ProjectPanel
                project={selected}
                onClose={() => setSelectedId(null)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="intro"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={PANEL_TRANSITION}
            >
              <h1 className="iridescent-text text-[72px] sm:text-[96px] font-extrabold tracking-tighter leading-none pb-[0.14em] -mb-[0.1em]">
                {SITE.wordmark}
              </h1>
              <p className="text-[32px] sm:text-[40px] font-extrabold tracking-tight mt-1.5">
                {SITE.name}
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
                drag the globe · click a project
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Globe */}
      <div className="relative flex-1 min-h-[480px] lg:absolute lg:right-[4vw] lg:top-1/2 lg:-translate-y-1/2 lg:w-[min(720px,58vw)] lg:h-[min(720px,88vh)] flex items-center justify-center">
        <ProjectGlobe
          projects={PROJECTS}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      <p className="hidden lg:block absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11.5px] tracking-[0.14em] uppercase text-[rgba(29,28,43,0.35)]">
        projects — drag to explore
      </p>
    </section>
  );
}
