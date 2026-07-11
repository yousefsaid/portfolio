"use client";

import type { Project } from "@/data/projects";

interface ProjectPanelProps {
  project: Project;
  onClose: () => void;
}

export function ProjectPanel({ project, onClose }: ProjectPanelProps) {
  return (
    <div className="glass relative rounded-[30px] p-9 sm:p-10 w-full max-w-[420px]">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close project details"
        className="absolute top-4.5 right-4.5 w-8 h-8 rounded-full border border-[rgba(29,28,43,0.12)] bg-white/60 text-sm font-bold text-(--ink-60) flex items-center justify-center hover:bg-white transition-colors"
      >
        ✕
      </button>
      <span
        className="block w-13 h-13 rounded-2xl mb-5 shadow-[0_8px_20px_rgba(110,91,208,0.28)]"
        style={{ background: project.hue }}
      />
      <h2 className="text-[28px] font-extrabold tracking-tight mb-1.5">
        {project.title}
      </h2>
      <p className="font-mono text-xs text-(--ink-45) mb-4.5">{project.tag}</p>
      <p className="text-[15.5px] leading-relaxed text-[rgba(29,28,43,0.72)] mb-6.5">
        {project.description}
      </p>
      <div className="flex gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-5.5 py-2.75 text-[13.5px] font-bold bg-(--ink) text-white border border-(--ink) hover:opacity-90 transition-opacity"
          >
            Visit app →
          </a>
        )}
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-5.5 py-2.75 text-[13.5px] font-bold bg-white/60 text-(--ink) border border-[rgba(29,28,43,0.15)] hover:bg-white transition-colors"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
