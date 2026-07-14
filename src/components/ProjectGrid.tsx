"use client";

import { useEffect, useState } from "react";
import { PROJECTS } from "@/data/projects";
import { onFocusProject } from "@/lib/projectFocus";
import { TechLogo } from "./TechLogo";

const HIGHLIGHT_MS = 1600;

/**
 * The canonical, scannable list of every project. The globe above is a
 * hover-only visual index into this grid: clicking a tile scrolls here
 * and highlights the matching card instead of opening a second, duplicate
 * detail view.
 */
export function ProjectGrid() {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    return onFocusProject((id) => {
      const node = document.getElementById(`project-${id}`);
      if (!node) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      node.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
      setHighlightedId(id);
      window.setTimeout(() => {
        setHighlightedId((current) => (current === id ? null : current));
      }, HIGHLIGHT_MS);
    });
  }, []);

  return (
    <section id="projects" className="relative z-10 px-6 pt-24 sm:pt-28">
      <h2 className="text-center text-[32px] sm:text-[40px] font-extrabold tracking-tight mb-10">
        Projects
      </h2>
      <div className="grid gap-5 max-w-[1060px] mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            id={`project-${project.id}`}
            className={`project-card glass relative rounded-[26px] p-7 flex flex-col transition-transform duration-200 hover:-translate-y-1 ${
              highlightedId === project.id ? "project-highlight" : ""
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center bg-white/6 border border-white/10">
                <TechLogo slug={project.logo} hue={project.hue} size={26} />
              </span>
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
