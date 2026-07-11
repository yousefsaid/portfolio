import { describe, expect, it } from "vitest";
import { PROJECTS } from "./projects";

describe("PROJECTS data", () => {
  it("has at least one project", () => {
    expect(PROJECTS.length).toBeGreaterThan(0);
  });

  it("has unique ids", () => {
    const ids = PROJECTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has required fields on every project", () => {
    for (const project of PROJECTS) {
      expect(project.title).toBeTruthy();
      expect(project.tag).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.hue).toContain("gradient");
    }
  });

  it("uses https URLs for all links", () => {
    for (const project of PROJECTS) {
      expect(project.repoUrl).toMatch(/^https:\/\//);
      if (project.liveUrl) {
        expect(project.liveUrl).toMatch(/^https:\/\//);
      }
    }
  });
});
