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

interface ProjectGlobeProps {
  projects: readonly Project[];
}

/**
 * Draggable sphere of project tiles. Hovering a tile previews its
 * details in a flat card centered over the globe (never skewed by the
 * sphere's rotation); clicking pins the card so its links are usable.
 */
export function ProjectGlobe({ projects }: ProjectGlobeProps) {
  const [rot, setRot] = useState<Rotation>({ x: -12, y: 0 });
  const [grabbing, setGrabbing] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [pinned, setPinned] = useState(false);
  const dragRef = useRef<DragState | null>(null);
  const movedRef = useRef(false);
  const activeRef = useRef(false);
  const [radius, setRadius] = useState(MAX_RADIUS);

  useEffect(() => {
    activeRef.current = activeIdx !== null;
  }, [activeIdx]);

  const tiles = useMemo(() => densify(projects, MIN_TILES), [projects]);
  const positions = useMemo(() => spherePositions(tiles.length), [tiles.length]);
  const active = activeIdx !== null ? tiles[activeIdx] : null;

  useEffect(() => {
    const update = () => setRadius(radiusForViewport(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIdx(null);
        setPinned(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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

  // Idle spin, paused while dragging, while a card is open, or off-screen.
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
      setActiveIdx(null);
      setPinned(false);
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

  const onTileClick = (idx: number) => {
    if (movedRef.current) return;
    if (pinned && activeIdx === idx) {
      setActiveIdx(null);
      setPinned(false);
      return;
    }
    setActiveIdx(idx);
    setPinned(true);
  };

  const onTileEnter = (e: React.PointerEvent, idx: number, facing: boolean) => {
    // Ignore hovers on tiles rotated away from the viewer: they are
    // invisible (backface hidden) but can still catch the pointer
    // through gaps between front tiles.
    if (e.pointerType !== "mouse" || dragRef.current || !facing || pinned)
      return;
    setActiveIdx(idx);
  };

  const onTileLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || pinned) return;
    setActiveIdx(null);
  };

  const onTileKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onTileClick(idx);
    }
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
          const isActive = i === activeIdx;
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
              key={`${project.id}-${i}`}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              aria-label={`${project.title}, ${project.tag}`}
              className={`globe-tile ${isActive ? "active" : ""}`}
              style={{
                transform: `rotateY(${positions[i].lon}deg) rotateX(${-positions[i].lat}deg) translateZ(${radius}px)`,
              }}
              onPointerEnter={(e) => onTileEnter(e, i, facing)}
              onPointerLeave={onTileLeave}
              onClick={() => onTileClick(i)}
              onKeyDown={(e) => onTileKeyDown(e, i)}
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
            </div>
          );
        })}
      </div>

      {/* Flat detail card, centered over the globe — never skewed by the
          sphere. Hover previews it; clicking a tile pins it so the links
          are clickable. */}
      <div
        className={`globe-detail ${active ? "open" : ""} ${pinned ? "pinned" : ""}`}
        aria-hidden={!active}
      >
        {active && (
          <>
            {pinned && (
              <button
                type="button"
                aria-label="Close project details"
                className="globe-detail-close"
                onClick={() => {
                  setActiveIdx(null);
                  setPinned(false);
                }}
              >
                ✕
              </button>
            )}
            <span className="flex items-center gap-3 mb-3">
              <TechLogo slug={active.logo} hue={active.hue} size={30} />
              {active.award && (
                <span className="ml-auto rounded-full px-3 py-1 text-[11px] font-bold tracking-wide bg-[rgba(242,200,148,0.15)] border border-[rgba(242,200,148,0.35)] text-[#f2c894]">
                  {active.award}
                </span>
              )}
            </span>
            <span className="block text-[19px] font-extrabold tracking-tight">
              {active.title}
            </span>
            <span className="block font-mono text-[11px] text-(--ink-45) mt-0.5 mb-2.5">
              {active.tag}
            </span>
            <span className="block text-[13px] leading-relaxed text-[rgba(241,239,250,0.72)]">
              {active.description}
            </span>
            <span className="flex gap-2 mt-4">
              {active.liveUrl && (
                <a
                  href={active.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="globe-tile-link globe-tile-link-primary"
                >
                  Live →
                </a>
              )}
              {active.repoUrl && (
                <a
                  href={active.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="globe-tile-link"
                >
                  GitHub
                </a>
              )}
            </span>
            {!pinned && (
              <span className="block font-mono text-[10px] text-(--ink-45) mt-3">
                click to pin
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
