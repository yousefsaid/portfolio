import type { TechLogoSlug } from "@/components/TechLogo";

export interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  /** CSS gradient that tints the project's logo and accents */
  hue: string;
  /** Primary tech logo shown on cards and globe tiles */
  logo: TechLogoSlug;
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
    logo: "opentelemetry",
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
    logo: "docker",
    liveUrl: "https://shadowarch-gold.vercel.app",
    repoUrl: "https://github.com/yousefsaid/shadow-architect",
  },
  {
    id: "gulf-job-agent",
    title: "Gulf Job Agent",
    tag: "Python · Claude · Playwright",
    description:
      "A self-hosted AI job application agent for the Gulf (UAE, Saudi, Qatar, Kuwait). It discovers roles, scores them, and applies using Claude and Playwright, with a human approving every step.",
    hue: "linear-gradient(135deg, #7ed4c0, #5aa6e8)",
    logo: "claude",
    repoUrl: "https://github.com/yousefsaid/gulf-job-agent",
  },
  {
    id: "icom",
    title: "ICOM",
    tag: "Python · Pydantic AI",
    description:
      "An AI incident commander that handles triage, comms, and remediation during live incidents. Built with Pydantic AI. Won Arctic Wolf's internal hackathon.",
    hue: "linear-gradient(135deg, #7ea2e8, #b48be0)",
    logo: "pydantic",
    award: "Hackathon winner",
  },
  {
    id: "glucose-analytics",
    title: "Glucose Analytics",
    tag: "TypeScript · FHIR · Claude",
    description:
      "Blood-glucose dashboard that pulls patient data from a FHIR server, charts readings with summary stats (time in range, estimated HbA1c), and generates diet & lifestyle recommendations with Claude. Built for CS6440 at Georgia Tech.",
    hue: "linear-gradient(135deg, #5aa6e8, #7ed4c0)",
    logo: "typescript",
    repoUrl: "https://github.com/yousefsaid/glucose-analytics",
  },
  {
    id: "formulaforge",
    title: "FormulaForge",
    tag: "Python · FastAPI · MLX · Next.js",
    description:
      "A local-first Excel formula copilot: a fine-tuned Qwen3-0.6B model (MLX + LoRA) proposes formulas, then a deterministic validator checks syntax, references, and execution before anything is shown. Workbooks never leave the machine.",
    hue: "linear-gradient(135deg, #f2c894, #8f7ee0)",
    logo: "qwen",
    liveUrl: "https://formulaforge-demo.vercel.app",
    repoUrl: "https://github.com/yousefsaid/formulaforge",
  },
  {
    id: "flappy-ai",
    title: "FlappyAI",
    tag: "Python",
    description:
      "A Flappy Bird AI in Python. The bird teaches itself to thread the pipes.",
    hue: "linear-gradient(135deg, #f2c894, #7ed4c0)",
    logo: "python",
    repoUrl: "https://github.com/yousefsaid/FlappyAI",
  },
] as const;
