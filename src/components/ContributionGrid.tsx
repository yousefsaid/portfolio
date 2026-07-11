import type { ContributionDay } from "@/lib/github";

const LEVEL_COLORS = [
  "rgba(255, 255, 255, 0.07)",
  "rgba(163, 148, 240, 0.3)",
  "rgba(163, 148, 240, 0.5)",
  "rgba(163, 148, 240, 0.75)",
  "rgba(196, 181, 253, 1)",
] as const;

interface ContributionGridProps {
  weeks: readonly ContributionDay[][];
}

/** GitHub-style contribution heatmap, one column per week. */
export function ContributionGrid({ weeks }: ContributionGridProps) {
  return (
    <div
      className="flex gap-[3px] justify-center"
      role="img"
      aria-label="GitHub contribution heatmap"
      data-testid="contribution-grid"
    >
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map((day) => (
            <span
              key={day.date}
              title={`${day.date}: ${day.count} contributions`}
              className="w-[10px] h-[10px] rounded-[3px]"
              style={{
                background: LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0],
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
