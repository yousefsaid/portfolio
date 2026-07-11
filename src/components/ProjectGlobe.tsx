"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { TechLogo } from "./TechLogo";
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
const EXPAND_Z_BOOST = 130;

interface ProjectGlobeProps {
  projects: readonly Project[];
}

/**
 * Draggable sphere of project tiles. Hovering (or tapping / focusing)
 * a tile expands it in place to show the project details, so the
 * intro column stays visible throughout.
 */
export function ProjectGlobe({ projects }: ProjectGlobeProps) {
  const [rot, setRot] = useState<Rotation>({ x: -12, y: 0 });
  const [grabbing, setGrabbing] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const movedRef = useRef(false);
  const activeRef = useRef(false);
  const [radius, setRadius] = useState(MAX_RADIUS);

  useEffect(() => {
    activeRef.current = activeKey !== null;
  }, [activeKey]);

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

  // Idle spin, paused while dragging, while a tile is open, or off-screen.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const tick = () => {
      if (
        !dragRef.current &&
        !media.matches &&
        visibleRef.current &&
        !activeRef.current
      ) {
        setRot((r) => ({ ...r, y: (r.y + AUTO_SPIN_DEG_PER_FRAME) % 360 }));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
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
    if (!movedRef.current && Math.abs(dx) + Math.abs(dy) > 4) {
      movedRef.current = true;
      setActiveKey(null);
      // Capture only once a real drag starts, so fast drags keep working
      // outside the globe's bounds. Capturing on pointerdown would retarget
      // the eventual `click` to this element and swallow tile clicks.
      e.currentTarget.setPointerCapture?.(e.pointerId);
    }
    setRot({
      x: Math.max(-40, Math.min(40, drag.startRot.x - dy * 0.25)),
      y: drag.startRot.y + dx * 0.3,
    });
  };

  const endDrag = () => {
    dragRef.current = null;
    setGrabbing(false);
  };

  const openTile = (key: string) => {
    if (!movedRef.current) setActiveKey(key);
  };

  const onTileEnter = (e: React.PointerEvent, key: string, facing: boolean) => {
    // Ignore hovers on tiles rotated away from the viewer: they are
    // invisible (backface hidden) but can still catch the pointer
    // through gaps between front tiles.
    if (e.pointerType !== "mouse" || dragRef.current || !facing) return;
    setActiveKey(key);
  };

  const onTileLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    setActiveKey(null);
  };

  const onTileKeyDown = (e: React.KeyboardEvent, key: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveKey(activeKey === key ? null : key);
    }
    if (e.key === "Escape") setActiveKey(null);
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
      aria-label="Projects globe, drag to rotate"
    >
      <div
        className="globe-sphere"
        style={{ transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}
      >
        {tiles.map((project, i) => {
          const key = `${project.id}-${i}`;
          const expanded = key === activeKey;
          // z-component of the tile's outward normal after both rotations;
          // positive means the tile faces the viewer.
          const toRad = Math.PI / 180;
          const phi = (rot.y + positions[i].lon) * toRad;
          const lat = positions[i].lat * toRad;
          const rx = rot.x * toRad;
          const facing =
            Math.sin(lat) * Math.sin(rx) +
              Math.cos(lat) * Math.cos(phi) * Math.cos(rx) >
            0.05;
          return (
            <div
              key={key}
              role="button"
              tabIndex={0}
              aria-expanded={expanded}
              aria-label={`${project.title}, ${project.tag}`}
              className={`globe-tile ${expanded ? "expanded" : ""}`}
              style={{
                transform: `rotateY(${positions[i].lon}deg) rotateX(${-positions[i].lat}deg) translateZ(${radius + (expanded ? EXPAND_Z_BOOST : 0)}px)`,
              }}
              onPointerEnter={(e) => onTileEnter(e, key, facing)}
              onPointerLeave={onTileLeave}
              onClick={() => openTile(key)}
              onKeyDown={(e) => onTileKeyDown(e, key)}
              onBlur={() => setActiveKey(null)}
            >
              <span className="globe-tile-logo" aria-hidden>
                <TechLogo slug={project.logo} hue={project.hue} size={30} />
              </span>
              <span className="text-[14px] font-extrabold tracking-tight leading-tight">
                {project.title}
              </span>
              <span className="font-mono text-[9.5px] text-(--ink-45) leading-tight">
                {project.tag}
              </span>
              {expanded && (
                <span className="globe-tile-detail">
                  <span className="globe-tile-desc">{project.description}</span>
                  <span className="flex gap-2 mt-2.5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="globe-tile-link globe-tile-link-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live →
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="globe-tile-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub
                      </a>
                    )}
                  </span>
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
