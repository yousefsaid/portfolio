"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import {
  MAX_RADIUS,
  densify,
  radiusForViewport,
  spherePositions,
} from "@/lib/globe";

interface Rotation {
  x: number;
  y: number;
}

interface DragState {
  pointerX: number;
  pointerY: number;
  startRot: Rotation;
}

const MIN_TILES = 20;
const AUTO_SPIN_DEG_PER_FRAME = 0.12;

interface ProjectGlobeProps {
  projects: readonly Project[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ProjectGlobe({ projects, selectedId, onSelect }: ProjectGlobeProps) {
  const [rot, setRot] = useState<Rotation>({ x: -12, y: 0 });
  const [grabbing, setGrabbing] = useState(false);
  const dragRef = useRef<DragState | null>(null);
  const movedRef = useRef(false);
  const [radius, setRadius] = useState(MAX_RADIUS);

  const tiles = useMemo(() => densify(projects, MIN_TILES), [projects]);
  const positions = useMemo(() => spherePositions(tiles.length), [tiles.length]);

  useEffect(() => {
    const update = () => setRadius(radiusForViewport(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const visibleRef = useRef(true);

  // Pause the idle spin while the globe is scrolled out of view.
  useEffect(() => {
    const node = viewportRef.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const tick = () => {
      if (!dragRef.current && !media.matches && visibleRef.current) {
        setRot((r) => ({ ...r, y: (r.y + AUTO_SPIN_DEG_PER_FRAME) % 360 }));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    // Capture so fast drags keep working outside the globe's bounds.
    e.currentTarget.setPointerCapture?.(e.pointerId);
    dragRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      startRot: { ...rot },
    };
    movedRef.current = false;
    setGrabbing(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.pointerX;
    const dy = e.clientY - drag.pointerY;
    if (Math.abs(dx) + Math.abs(dy) > 4) movedRef.current = true;
    setRot({
      x: Math.max(-40, Math.min(40, drag.startRot.x - dy * 0.25)),
      y: drag.startRot.y + dx * 0.3,
    });
  };

  const endDrag = () => {
    dragRef.current = null;
    setGrabbing(false);
  };

  const handleTileClick = (id: string) => {
    if (!movedRef.current) onSelect(id);
  };

  return (
    <div
      ref={viewportRef}
      className={`globe-viewport flex items-center justify-center ${grabbing ? "grabbing" : ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      role="group"
      aria-label="Projects globe — drag to rotate"
    >
      <div
        className="globe-sphere"
        style={{ transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}
      >
        {tiles.map((project, i) => (
          <button
            key={`${project.id}-${i}`}
            type="button"
            aria-pressed={project.id === selectedId}
            className={`globe-tile ${project.id === selectedId ? "selected" : ""}`}
            style={{
              transform: `rotateY(${positions[i].lon}deg) rotateX(${-positions[i].lat}deg) translateZ(${radius}px)`,
            }}
            onClick={() => handleTileClick(project.id)}
          >
            <span
              className="globe-tile-swatch"
              style={{ background: project.hue }}
            />
            <span className="text-[14px] font-extrabold tracking-tight leading-tight">
              {project.title}
            </span>
            <span className="font-mono text-[9.5px] text-(--ink-45) leading-tight">
              {project.tag}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
