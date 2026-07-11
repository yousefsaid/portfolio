import type { Project } from "@/data/projects";

export interface SpherePosition {
  lat: number;
  lon: number;
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

export const MAX_RADIUS = 290;
export const MIN_RADIUS = 150;

/** Evenly distribute n points on a sphere (Fibonacci lattice) → lat/lon in degrees. */
export function spherePositions(n: number): readonly SpherePosition[] {
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / n;
    return {
      lat: (Math.asin(y) * 180) / Math.PI,
      lon: ((GOLDEN_ANGLE * i * 180) / Math.PI) % 360,
    };
  });
}

/** Repeat the project list so the sphere reads dense even with few projects. */
export function densify(
  projects: readonly Project[],
  min: number,
): readonly Project[] {
  if (projects.length === 0) return [];
  const out: Project[] = [];
  while (out.length < min) {
    out.push(...projects.slice(0, min - out.length));
  }
  return out;
}

/** Sphere radius scaled to the viewport so tiles stay inside their column. */
export function radiusForViewport(viewportWidth: number): number {
  return Math.min(MAX_RADIUS, Math.max(MIN_RADIUS, viewportWidth * 0.32));
}
