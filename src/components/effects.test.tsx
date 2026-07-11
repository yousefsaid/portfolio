import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ContributionGrid } from "./ContributionGrid";
import { CursorSpotlight } from "./CursorSpotlight";
import { LiquidWordmark } from "./LiquidWordmark";
import { ScrambleText } from "./ScrambleText";
import { Starfield } from "./Starfield";
import { TiltCard } from "./TiltCard";
import type { ContributionDay } from "@/lib/github";

function mockMatchMedia(matcher: (query: string) => boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: matcher(query),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("CursorSpotlight", () => {
  it("renders nothing for coarse pointers", () => {
    render(<CursorSpotlight />);
    expect(screen.queryByTestId("cursor-spotlight")).not.toBeInTheDocument();
  });

  it("renders the glow layer for fine pointers", () => {
    mockMatchMedia((q) => q.includes("pointer: fine"));
    render(<CursorSpotlight />);
    expect(screen.getByTestId("cursor-spotlight")).toBeInTheDocument();
  });
});

describe("ScrambleText", () => {
  it("renders the label", () => {
    render(<ScrambleText text="Projects" />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("settles back to the label after hovering", () => {
    vi.useFakeTimers();
    render(<ScrambleText text="About" />);
    fireEvent.mouseEnter(screen.getByLabelText("About"));
    vi.advanceTimersByTime(2_000);
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});

describe("TiltCard", () => {
  it("renders its children", () => {
    render(
      <TiltCard>
        <p>card body</p>
      </TiltCard>,
    );
    expect(screen.getByText("card body")).toBeInTheDocument();
  });
});

describe("LiquidWordmark", () => {
  it("renders the wordmark text", () => {
    render(<LiquidWordmark text="ys." />);
    expect(screen.getByText("ys.")).toBeInTheDocument();
  });
});

describe("Starfield", () => {
  it("renders the canvas layer", () => {
    render(<Starfield />);
    expect(screen.getByTestId("starfield")).toBeInTheDocument();
  });
});

describe("ContributionGrid", () => {
  it("renders one cell per day", () => {
    const weeks: ContributionDay[][] = [
      [
        { date: "2026-07-01", count: 2, level: 1 },
        { date: "2026-07-02", count: 0, level: 0 },
      ],
      [{ date: "2026-07-08", count: 9, level: 4 }],
    ];
    render(<ContributionGrid weeks={weeks} />);
    const grid = screen.getByTestId("contribution-grid");
    expect(grid.querySelectorAll("span")).toHaveLength(3);
    expect(grid).toHaveAccessibleName("GitHub contribution heatmap");
  });
});
