import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import { HeroStage } from "./HeroStage";

function getFirstTile() {
  const [tile] = screen.getAllByRole("button", {
    name: new RegExp(PROJECTS[0].title, "i"),
  });
  return tile;
}

describe("HeroStage", () => {
  it("shows the intro", () => {
    render(<HeroStage />);
    expect(screen.getByText(SITE.name)).toBeInTheDocument();
    expect(screen.getByText(SITE.tagline)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view resume/i })).toHaveAttribute(
      "href",
      SITE.links.resume,
    );
  });

  it("renders a globe tile for every project", () => {
    render(<HeroStage />);
    for (const project of PROJECTS) {
      expect(
        screen.getAllByRole("button", { name: new RegExp(project.title, "i") })
          .length,
      ).toBeGreaterThan(0);
    }
  });

  it("expands a tile in place and keeps the intro visible", async () => {
    const user = userEvent.setup();
    render(<HeroStage />);
    const tile = getFirstTile();

    await user.click(tile);

    expect(tile).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(PROJECTS[0].description)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /live/i }),
    ).toHaveAttribute("href", PROJECTS[0].liveUrl);
    // The whole point: the intro stays on screen.
    expect(screen.getByText(SITE.tagline)).toBeInTheDocument();
  });

  it("collapses the tile on Escape", async () => {
    const user = userEvent.setup();
    render(<HeroStage />);
    const tile = getFirstTile();

    await user.click(tile);
    fireEvent.keyDown(tile, { key: "Escape" });

    expect(tile).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByText(PROJECTS[0].description),
    ).not.toBeInTheDocument();
  });

  it("does not expand after dragging, and never captures on a plain tap", async () => {
    const capture = vi.fn();
    HTMLElement.prototype.setPointerCapture = capture;
    render(<HeroStage />);
    const viewport = screen.getByRole("group", { name: /projects globe/i });
    const tile = getFirstTile();

    // Drag: pointer moves beyond the threshold → capture requested,
    // and the click that follows must not expand a tile.
    fireEvent.pointerDown(viewport, { pointerId: 1, clientX: 10, clientY: 10 });
    fireEvent.pointerMove(viewport, { pointerId: 1, clientX: 60, clientY: 10 });
    expect(capture).toHaveBeenCalledTimes(1);
    fireEvent.pointerUp(viewport, { pointerId: 1 });
    fireEvent.click(tile);
    expect(tile).toHaveAttribute("aria-expanded", "false");

    // Plain tap: no movement → capture must NOT be requested (capturing
    // retargets the click and swallows tile interaction in real browsers).
    capture.mockClear();
    fireEvent.pointerDown(viewport, { pointerId: 2, clientX: 10, clientY: 10 });
    fireEvent.pointerUp(viewport, { pointerId: 2 });
    expect(capture).not.toHaveBeenCalled();
    fireEvent.click(tile);
    expect(tile).toHaveAttribute("aria-expanded", "true");
  });
});
