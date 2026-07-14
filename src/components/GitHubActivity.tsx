import { fetchGithubStats } from "@/lib/github";
import { SITE } from "@/data/site";
import { ContributionGrid } from "./ContributionGrid";

const GITHUB_USERNAME = SITE.links.github.split("/").pop() ?? "";

/**
 * Live GitHub stats card: contribution heatmap + profile counts.
 * Server component — data is fetched at build/revalidate time and the
 * whole card disappears gracefully if either API is unreachable.
 */
export async function GitHubActivity() {
  const stats = await fetchGithubStats(GITHUB_USERNAME);

  if (!stats) {
    return (
      <div className="glass relative max-w-[640px] mx-auto mt-6 rounded-[28px] px-7 py-8 sm:px-10 text-center">
        <p className="text-[14px] text-(--ink-60)">
          Live activity is briefly unavailable —{" "}
          <a
            href={SITE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--ink) font-semibold hover:underline"
          >
            see the full history on GitHub
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="glass border-beam relative max-w-[640px] mx-auto mt-6 rounded-[28px] px-7 py-8 sm:px-10 text-center">
      <p className="font-mono text-[11px] text-(--ink-45) mb-5">
        github activity
      </p>
      <ContributionGrid weeks={stats.weeks} />
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-1.5 mt-6 text-[14px] font-semibold text-(--ink-60)">
        <span>
          <strong className="text-(--ink)">{stats.totalContributions}</strong>{" "}
          contributions in the last year
        </span>
        <span>
          <strong className="text-(--ink)">{stats.publicRepos}</strong> public
          repos
        </span>
        <span>
          <strong className="text-(--ink)">{stats.followers}</strong> followers
        </span>
      </div>
    </div>
  );
}
