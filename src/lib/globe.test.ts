import { describe, expect, it } from "vitest";
import { PROJECTS } from "@/data/projects";
import {
  MAX_RADIUS,
  MIN_RADIUS,
  densify,
  radiusForViewport,
  spherePositions,
} from "./globe";

describe("spherePositions", () => {
  it("returns n positions", () => {
    expect(spherePositions(20)).toHaveLength(20);
  });

  it("keeps latitude within [-90, 90] and longitude within [0, 360)", () => {
    for (const { lat, lon } of spherePositions(50)) {
      expect(lat).toBeGreaterThanOrEqual(-90);
      expect(lat).toBeLessThanOrEqual(90);
      expect(lon).toBeGreaterThanOrEqual(0);
      expect(lon).toBeLessThan(360);
    }
  });

  it("covers both hemispheres", () => {
    const positions = spherePositions(20);
    expect(positions.some((p) => p.lat > 30)).toBe(true);
    expect(positions.some((p) => p.lat < -30)).toBe(true);
  });

  it("returns an empty list for n = 0", () => {
    expect(spherePositions(0)).toHaveLength(0);
  });
});

describe("densify", () => {
  it("repeats projects up to the minimum count", () => {
    const tiles = densify(PROJECTS, 20);
    expect(tiles).toHaveLength(20);
    expect(tiles.filter((t) => t.id === PROJECTS[0].id).length).toBeGreaterThan(1);
  });

  it("does not mutate the input", () => {
    const before = PROJECTS.length;
    densify(PROJECTS, 20);
    expect(PROJECTS).toHaveLength(before);
  });

  it("returns the empty list for no projects", () => {
    expect(densify([], 20)).toHaveLength(0);
  });

  it("keeps a list already longer than the minimum", () => {
    const tiles = densify(PROJECTS, 2);
    expect(tiles).toHaveLength(2);
  });
});

describe("radiusForViewport", () => {
  it("caps at MAX_RADIUS on wide screens", () => {
    expect(radiusForViewport(1920)).toBe(MAX_RADIUS);
  });

  it("floors at MIN_RADIUS on tiny screens", () => {
    expect(radiusForViewport(320)).toBe(MIN_RADIUS);
  });

  it("scales in between", () => {
    const r = radiusForViewport(700);
    expect(r).toBeGreaterThan(MIN_RADIUS);
    expect(r).toBeLessThan(MAX_RADIUS);
  });
});
