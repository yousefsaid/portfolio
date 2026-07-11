import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SITE } from "@/data/site";
import { About } from "./About";
import { Footer } from "./Footer";
import { GlassNav } from "./GlassNav";

describe("About", () => {
  it("renders the bio and every skill", () => {
    render(<About />);
    expect(screen.getByText(SITE.bio)).toBeInTheDocument();
    for (const skill of SITE.skills) {
      expect(screen.getByText(skill)).toBeInTheDocument();
    }
  });
});

describe("Footer", () => {
  it("links email, GitHub and LinkedIn", () => {
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: SITE.links.email }),
    ).toHaveAttribute("href", `mailto:${SITE.links.email}`);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      SITE.links.github,
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      SITE.links.linkedin,
    );
  });
});

describe("GlassNav", () => {
  it("renders the wordmark and resume link", () => {
    render(<GlassNav />);
    expect(screen.getByText(SITE.wordmark)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute(
      "href",
      SITE.links.resume,
    );
  });

  it("opens external links safely", () => {
    render(<GlassNav />);
    const github = screen.getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(github).toHaveAttribute("target", "_blank");
  });
});
