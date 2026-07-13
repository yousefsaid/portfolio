import { useId } from "react";
import {
  siClaude,
  siDocker,
  siOpentelemetry,
  siPydantic,
  siPython,
  siQwen,
  siTypescript,
} from "simple-icons";

const ICONS = {
  claude: siClaude,
  docker: siDocker,
  opentelemetry: siOpentelemetry,
  pydantic: siPydantic,
  python: siPython,
  qwen: siQwen,
  typescript: siTypescript,
} as const;

export type TechLogoSlug = keyof typeof ICONS;

interface TechLogoProps {
  slug: TechLogoSlug;
  /** CSS linear-gradient(...) string; its two colors tint the logo. */
  hue: string;
  size?: number;
}

function gradientStops(hue: string): [string, string] {
  const colors = hue.match(/#[0-9a-fA-F]{3,8}/g);
  return [colors?.[0] ?? "#c4b5fd", colors?.[1] ?? "#8cc3f5"];
}

/** Real product/tech logo tinted with the project's gradient. */
export function TechLogo({ slug, hue, size = 34 }: TechLogoProps) {
  const icon = ICONS[slug];
  const gradId = useId();
  const [from, to] = gradientStops(hue);

  return (
    <svg
      role="img"
      aria-label={`${icon.title} logo`}
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <path d={icon.path} fill={`url(#${gradId})`} />
    </svg>
  );
}
