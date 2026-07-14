import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import { HeroStage } from "./HeroStage";

const FOCUS_EVENT = "portfolio:focus-project";

function getFirstTile() {
  const [tile] = screen.getAllByRole("button", {
    name: new RegExp(PROJECTS[0].title, "i"),
  });
  return tile;
}

describe("HeroStage", () => {
  let onFocusProject: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onFocusProject = vi.fn();
    window.addEventListener(FOCUS_EVENT, onFocusProject);
  });

  afterEach(() => {
    window.removeEventListener(FOCUS_EVENT, onFocusProject);
  });

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

  it("previews a tile on hover and keeps the intro visible", () => {
    render(<HeroStage />);
    const tile = getFirstTile();

    fireEvent.pointerEnter(tile, { pointerType: "mouse" });

    expect(tile).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/click to view/i)).toBeInTheDocument();
    // The whole point: the intro stays on screen.
    expect(screen.getByText(SITE.tagline)).toBeInTheDocument();
  });

  it("collapses the preview on Escape", () => {
    render(<HeroStage />);
    const tile = getFirstTile();

    fireEvent.pointerEnter(tile, { pointerType: "mouse" });
    fireEvent.keyDown(tile, { key: "Escape" });

    expect(tile).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(/click to view/i)).not.toBeInTheDocument();
  });

  it("clicking a tile hands off to the project grid instead of duplicating its detail", () => {
    render(<HeroStage />);
    const tile = getFirstTile();

    fireEvent.click(tile);

    expect(onFocusProject).toHaveBeenCalledTimes(1);
    expect(onFocusProject.mock.calls[0][0].detail).toBe(PROJECTS[0].id);
  });

  it("does not hand off after dragging, and never captures on a plain tap", () => {
    const capture = vi.fn();
    HTMLElement.prototype.setPointerCapture = capture;
    render(<HeroStage />);
    const viewport = screen.getByRole("group", { name: /projects globe/i });
    const tile = getFirstTile();

    // Drag: pointer moves beyond the threshold with the button held →
    // capture requested, and the click that follows must not hand off.
    fireEvent.pointerDown(viewport, { pointerId: 1, clientX: 10, clientY: 10 });
    fireEvent.pointerMove(viewport, {
      pointerId: 1,
      clientX: 60,
      clientY: 10,
      buttons: 1,
    });
    expect(capture).toHaveBeenCalledTimes(1);
    fireEvent.pointerUp(viewport, { pointerId: 1 });
    fireEvent.click(tile);
    expect(onFocusProject).not.toHaveBeenCalled();

    // Plain tap: no movement → capture must NOT be requested (capturing
    // retargets the click and swallows tile interaction in real browsers),
    // and the click hands off normally.
    capture.mockClear();
    fireEvent.pointerDown(viewport, { pointerId: 2, clientX: 10, clientY: 10 });
    fireEvent.pointerUp(viewport, { pointerId: 2 });
    expect(capture).not.toHaveBeenCalled();
    fireEvent.click(tile);
    expect(onFocusProject).toHaveBeenCalledTimes(1);
  });

  it("recovers from a lost pointerup so tiles stay clickable", () => {
    render(<HeroStage />);
    const viewport = screen.getByRole("group", { name: /projects globe/i });
    const tile = getFirstTile();

    // Drag on empty space, but the pointerup never arrives (released
    // off-window, or a native selection drag swallowed it).
    fireEvent.pointerDown(viewport, { pointerId: 1, clientX: 10, clientY: 10 });
    fireEvent.pointerMove(viewport, {
      pointerId: 1,
      clientX: 80,
      clientY: 10,
      buttons: 1,
    });

    // The next move arrives with no button held: the drag must self-heal
    // instead of staying glued to the cursor.
    fireEvent.pointerMove(viewport, {
      pointerId: 1,
      clientX: 120,
      clientY: 10,
      buttons: 0,
    });

    // A fresh tap on a tile now hands off — the stale drag no longer
    // swallows the interaction.
    fireEvent.pointerDown(tile, { pointerId: 2, clientX: 10, clientY: 10 });
    fireEvent.pointerUp(tile, { pointerId: 2 });
    fireEvent.click(tile);
    expect(onFocusProject).toHaveBeenCalledTimes(1);
  });
});
