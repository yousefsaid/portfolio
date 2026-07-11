export interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  /** CSS gradient used for the tile/panel swatch */
  hue: string;
  liveUrl?: string;
  repoUrl: string;
}

export const PROJECTS: readonly Project[] = [
  {
    id: "sentinel-trace",
    title: "Sentinel Trace",
    tag: "TypeScript · Next.js · OpenTelemetry",
    description:
      "Agentic observability dashboard — real-time chain-of-thought visibility for multi-agent AI systems, built on the OpenTelemetry GenAI semantic conventions.",
    hue: "linear-gradient(135deg, #8f7ee0, #5aa6e8)",
    liveUrl: "https://sentineltrace-rouge.vercel.app",
    repoUrl: "https://github.com/yousefsaid/sentinel-trace",
  },
  {
    id: "shadow-architect",
    title: "Shadow Architect",
    tag: "TypeScript · Next.js",
    description:
      "AI-native infrastructure visualization with drift detection and compliance auditing — see what your infra actually looks like, not what the diagrams claim.",
    hue: "linear-gradient(135deg, #e08bb0, #f2c894)",
    liveUrl: "https://shadowarch-gold.vercel.app",
    repoUrl: "https://github.com/yousefsaid/shadow-architect",
  },
  {
    id: "glucose-analytics",
    title: "Glucose Analytics",
    tag: "TypeScript · FHIR · Claude",
    description:
      "Blood-glucose dashboard that pulls patient data from a FHIR server, charts readings with summary stats (time in range, estimated HbA1c), and generates diet & lifestyle recommendations with Claude. Built for CS6440 at Georgia Tech.",
    hue: "linear-gradient(135deg, #5aa6e8, #7ed4c0)",
    repoUrl: "https://github.com/yousefsaid/glucose-analytics",
  },
  {
    id: "flappy-ai",
    title: "FlappyAI",
    tag: "Python",
    description:
      "A Flappy Bird-playing AI in Python — the bird learns to thread the pipes on its own.",
    hue: "linear-gradient(135deg, #f2c894, #7ed4c0)",
    repoUrl: "https://github.com/yousefsaid/FlappyAI",
  },
] as const;
