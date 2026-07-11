export interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  /** CSS gradient used for the tile/panel swatch */
  hue: string;
  liveUrl?: string;
  repoUrl?: string;
  /** e.g. hackathon win — shown as a badge in the grid/panel */
  award?: string;
}

export const PROJECTS: readonly Project[] = [
  {
    id: "sentinel-trace",
    title: "Sentinel Trace",
    tag: "TypeScript · Next.js · OpenTelemetry · Convex",
    description:
      "Watches multi-agent LLM pipelines in real time. Ingests telemetry using the OpenTelemetry GenAI conventions and stores every trace in Convex, so you can catch drift, track latency, and see what each agent costs per token.",
    hue: "linear-gradient(135deg, #8f7ee0, #5aa6e8)",
    liveUrl: "https://sentineltrace-rouge.vercel.app",
    repoUrl: "https://github.com/yousefsaid/sentinel-trace",
  },
  {
    id: "shadow-architect",
    title: "Shadow Architect",
    tag: "Next.js · React Flow · Convex · Python",
    description:
      "Turns infrastructure configs (AWS, Docker, Bazel) into interactive topology graphs using a team of agents. A drift-detection loop compares state between runs and flags anything that changed without approval.",
    hue: "linear-gradient(135deg, #e08bb0, #f2c894)",
    liveUrl: "https://shadowarch-gold.vercel.app",
    repoUrl: "https://github.com/yousefsaid/shadow-architect",
  },
  {
    id: "icom",
    title: "ICOM",
    tag: "Python · Pydantic AI",
    description:
      "An AI incident commander that handles triage, comms, and remediation during live incidents. Built with Pydantic AI. Won Arctic Wolf's internal hackathon.",
    hue: "linear-gradient(135deg, #7ea2e8, #b48be0)",
    award: "Hackathon winner",
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
      "A Flappy Bird AI in Python. The bird teaches itself to thread the pipes.",
    hue: "linear-gradient(135deg, #f2c894, #7ed4c0)",
    repoUrl: "https://github.com/yousefsaid/FlappyAI",
  },
] as const;
