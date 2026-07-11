import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import { HeroStage } from "./HeroStage";

describe("HeroStage", () => {
  it("shows the intro by default", () => {
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

  it("opens the project panel when a tile is clicked", async () => {
    const user = userEvent.setup();
    render(<HeroStage />);
    const [firstTile] = screen.getAllByRole("button", {
      name: new RegExp(PROJECTS[0].title, "i"),
    });

    await user.click(firstTile);

    expect(
      await screen.findByText(PROJECTS[0].description),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: /visit app/i }),
    ).toHaveAttribute("href", PROJECTS[0].liveUrl);
  });

  it("returns to the intro when the panel is closed", async () => {
    const user = userEvent.setup();
    render(<HeroStage />);
    const [firstTile] = screen.getAllByRole("button", {
      name: new RegExp(PROJECTS[0].title, "i"),
    });

    await user.click(firstTile);
    await user.click(
      await screen.findByRole("button", { name: /close project details/i }),
    );

    expect(await screen.findByText(SITE.tagline)).toBeInTheDocument();
  });
});
