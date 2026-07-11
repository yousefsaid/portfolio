"use client";

import type { Project } from "@/data/projects";
import { TiltCard } from "./TiltCard";

interface ProjectPanelProps {
  project: Project;
  onClose: () => void;
}

export function ProjectPanel({ project, onClose }: ProjectPanelProps) {
  return (
    <TiltCard className="glass border-beam relative rounded-[30px] p-9 sm:p-10 w-full max-w-[420px]">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close project details"
        className="absolute top-4.5 right-4.5 w-8 h-8 rounded-full border border-white/15 bg-white/10 text-sm font-bold text-(--ink-60) flex items-center justify-center hover:bg-white/25 hover:text-(--ink) transition-colors"
      >
        ✕
      </button>
      <span
        className="block w-13 h-13 rounded-2xl mb-5 shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
        style={{ background: project.hue }}
      />
      <h2 className="text-[28px] font-extrabold tracking-tight mb-1.5">
        {project.title}
      </h2>
      <p className="font-mono text-xs text-(--ink-45) mb-4.5">{project.tag}</p>
      <p className="text-[15.5px] leading-relaxed text-[rgba(241,239,250,0.75)] mb-6.5">
        {project.description}
      </p>
      <div className="flex gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-5.5 py-2.75 text-[13.5px] font-bold bg-white text-[#14131f] border border-white hover:opacity-90 transition-opacity"
          >
            Visit app →
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-5.5 py-2.75 text-[13.5px] font-bold bg-white/10 text-(--ink) border border-white/20 hover:bg-white/20 transition-colors"
          >
            GitHub
          </a>
        )}
      </div>
    </TiltCard>
  );
}
