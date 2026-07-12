import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PROJECTS } from "@/data/projects";
import { ROLES, SCHOOLS } from "@/data/experience";
import { SITE } from "@/data/site";
import { About } from "./About";
import { ContactCta } from "./ContactCta";
import { Experience } from "./Experience";
import { Footer } from "./Footer";
import { GlassNav } from "./GlassNav";
import { ProjectGrid } from "./ProjectGrid";

describe("About", () => {
  it("renders the bio and every skill", () => {
    render(<About />);
    expect(screen.getByText(SITE.bio)).toBeInTheDocument();
    for (const skill of SITE.skills) {
      expect(screen.getByText(skill)).toBeInTheDocument();
    }
  });

  it("renders education", () => {
    render(<About />);
    for (const school of SCHOOLS) {
      expect(screen.getByText(school.institution)).toBeInTheDocument();
      expect(screen.getByText(school.degree)).toBeInTheDocument();
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

describe("ProjectGrid", () => {
  it("renders a card per project with its links", () => {
    render(<ProjectGrid />);
    for (const project of PROJECTS) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    }
    const liveLinks = screen.getAllByRole("link", { name: /live/i });
    expect(liveLinks.length).toBe(PROJECTS.filter((p) => p.liveUrl).length);
  });

  it("shows the award badge for awarded projects", () => {
    render(<ProjectGrid />);
    for (const project of PROJECTS) {
      if (project.award) {
        expect(screen.getByText(project.award)).toBeInTheDocument();
      }
    }
  });
});

describe("Experience", () => {
  it("renders every role", () => {
    render(<Experience />);
    for (const role of ROLES) {
      expect(screen.getByText(role.period)).toBeInTheDocument();
    }
  });

  it("renders each role's highlights", () => {
    render(<Experience />);
    for (const role of ROLES) {
      for (const highlight of role.highlights) {
        expect(screen.getByText(highlight)).toBeInTheDocument();
      }
    }
  });
});

describe("ContactCta", () => {
  it("renders a mailto CTA and LinkedIn link", () => {
    render(<ContactCta />);
    expect(
      screen.getByRole("link", { name: SITE.links.email }),
    ).toHaveAttribute("href", `mailto:${SITE.links.email}`);
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
