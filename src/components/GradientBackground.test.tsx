import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { GradientBackground } from "./GradientBackground";

describe("GradientBackground", () => {
  it("renders nothing when WebGL is unavailable (jsdom)", () => {
    // jsdom's canvas.getContext returns null, so the WebGL probe fails
    // and the component must fall back to the static CSS mesh.
    render(<GradientBackground />);
    expect(screen.queryByTestId("gradient-background")).not.toBeInTheDocument();
  });

  it("renders nothing when the user prefers reduced motion", () => {
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }) as unknown as MediaQueryList);

    render(<GradientBackground />);
    expect(screen.queryByTestId("gradient-background")).not.toBeInTheDocument();
  });
});
