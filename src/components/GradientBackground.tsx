"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Starfield } from "./Starfield";

const ShaderCanvas = dynamic(
  () => import("./ShaderCanvas").then((m) => m.ShaderCanvas),
  { ssr: false },
);

/** True when the browser can actually create a WebGL context. */
function supportsWebGl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return canvas.getContext("webgl2") !== null || canvas.getContext("webgl") !== null;
  } catch {
    return false;
  }
}

/**
 * Full-viewport animated pastel gradient behind everything.
 * Falls back to the static CSS mesh (painted by `body`) when the user
 * prefers reduced motion, WebGL is unavailable, or while the bundle loads.
 */
export function GradientBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!media.matches && supportsWebGl());
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      data-testid="gradient-background"
    >
      <ShaderCanvas />
      {/* Deterministic darkening scrim — the shader's env lighting renders
          brighter and warmer than its colors suggest, so the dark look is
          enforced here in CSS instead of fought inside the shader. */}
      <div className="absolute inset-0 bg-[rgba(14,10,26,0.55)]" />
      <Starfield />
    </div>
  );
}
