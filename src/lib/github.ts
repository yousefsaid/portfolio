export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface GithubStats {
  totalContributions: number;
  publicRepos: number;
  followers: number;
  weeks: ContributionDay[][];
}

export const HEATMAP_WEEKS = 17;
const REVALIDATE_SECONDS = 86_400;

/**
 * Chunk a day-ordered contribution list into columns of 7 (heatmap weeks),
 * keeping only the trailing `weeks` columns.
 */
export function toWeeks(
  days: readonly ContributionDay[],
  weeks: number,
): ContributionDay[][] {
  const totalDays = weeks * 7;
  const tail = days.slice(-totalDays);
  const columns: ContributionDay[][] = [];
  for (let i = 0; i < tail.length; i += 7) {
    columns.push(tail.slice(i, i + 7));
  }
  return columns;
}

interface ContributionsResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

interface GithubUserResponse {
  public_repos: number;
  followers: number;
}

/**
 * Fetch public GitHub profile stats and the last year of contributions.
 * Returns null on any failure so the section can silently disappear
 * rather than break the page.
 */
export async function fetchGithubStats(
  username: string,
): Promise<GithubStats | null> {
  try {
    const [userRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        next: { revalidate: REVALIDATE_SECONDS },
      }),
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
        { next: { revalidate: REVALIDATE_SECONDS } },
      ),
    ]);
    if (!userRes.ok || !contribRes.ok) return null;

    const user = (await userRes.json()) as GithubUserResponse;
    const contrib = (await contribRes.json()) as ContributionsResponse;
    if (!Array.isArray(contrib.contributions)) return null;

    return {
      totalContributions: contrib.contributions.reduce(
        (sum, day) => sum + day.count,
        0,
      ),
      publicRepos: user.public_repos,
      followers: user.followers,
      weeks: toWeeks(contrib.contributions, HEATMAP_WEEKS),
    };
  } catch {
    return null;
  }
}
