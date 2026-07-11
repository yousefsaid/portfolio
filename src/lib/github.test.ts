import { afterEach, describe, expect, it, vi } from "vitest";
import {
  HEATMAP_WEEKS,
  fetchGithubStats,
  toWeeks,
  type ContributionDay,
} from "./github";

function makeDays(count: number): ContributionDay[] {
  return Array.from({ length: count }, (_, i) => ({
    date: `2026-d${i}`,
    count: i % 5,
    level: i % 5,
  }));
}

describe("toWeeks", () => {
  it("chunks the trailing days into columns of 7", () => {
    const weeks = toWeeks(makeDays(365), 17);
    expect(weeks).toHaveLength(17);
    for (const week of weeks) expect(week).toHaveLength(7);
    expect(weeks.at(-1)?.at(-1)?.date).toBe("2026-d364");
  });

  it("returns fewer columns when there is not enough data", () => {
    const weeks = toWeeks(makeDays(10), 17);
    expect(weeks.flat()).toHaveLength(10);
  });

  it("does not mutate its input", () => {
    const days = makeDays(21);
    const copy = [...days];
    toWeeks(days, 2);
    expect(days).toEqual(copy);
  });
});

describe("fetchGithubStats", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns null when the network fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    expect(await fetchGithubStats("someone")).toBeNull();
  });

  it("returns null on a non-ok response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false }),
    );
    expect(await fetchGithubStats("someone")).toBeNull();
  });

  it("maps successful responses into stats", async () => {
    const days = makeDays(HEATMAP_WEEKS * 7);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((url: string) =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve(
              url.includes("api.github.com")
                ? { public_repos: 12, followers: 3 }
                : { total: {}, contributions: days },
            ),
        }),
      ),
    );

    const stats = await fetchGithubStats("someone");
    expect(stats).not.toBeNull();
    expect(stats?.publicRepos).toBe(12);
    expect(stats?.followers).toBe(3);
    expect(stats?.weeks).toHaveLength(HEATMAP_WEEKS);
    expect(stats?.totalContributions).toBe(
      days.reduce((sum, d) => sum + d.count, 0),
    );
  });
});
