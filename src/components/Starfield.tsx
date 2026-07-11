"use client";

import { useEffect, useRef } from "react";

const STAR_COUNT = 140;
const MAX_DPR = 2;

interface Star {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
}

function makeStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.4 + Math.random() * 1.1,
    phase: Math.random() * Math.PI * 2,
    speed: 0.3 + Math.random() * 0.7,
  }));
}

/**
 * A sparse twinkling starfield layered above the shader background.
 * Static (single frame) when the user prefers reduced motion.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const stars = makeStars(STAR_COUNT);
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#cfd2ff";
      for (const s of stars) {
        const twinkle = reduce.matches
          ? 0.55
          : 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(s.phase + t * 0.001 * s.speed));
        ctx.globalAlpha = twinkle;
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce.matches) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      data-testid="starfield"
      className="absolute inset-0 w-full h-full"
    />
  );
}
