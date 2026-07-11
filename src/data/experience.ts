export interface Role {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  /** Highlight bullets; keep to the strongest, quantified claims. */
  highlights: readonly string[];
}

export interface School {
  id: string;
  institution: string;
  degree: string;
  period: string;
}

export const ROLES: readonly Role[] = [
  {
    id: "aw-swe2",
    title: "Software Engineer II",
    company: "Arctic Wolf",
    period: "Mar 2024 — Present",
    location: "London, ON",
    highlights: [
      "Own the Bazel build platform for a 500+ engineer monorepo — cut CI build times 43%, reclaiming 300+ build-hours per week.",
      "Architected event-driven SBOM compliance infrastructure on AWS (ECR, EventBridge, Lambda, Inspector, Athena) automating CVE scanning across containerized services.",
      "Co-built an LLM-powered CI diagnostics tool that auto-diagnoses ~30% of daily CI failures and cut time-to-triage ~70%.",
    ],
  },
  {
    id: "aw-intern-2023",
    title: "Software Engineering Intern",
    company: "Arctic Wolf",
    period: "Sep — Dec 2023",
    location: "Waterloo, ON",
    highlights: [
      "Built a managed-build-environment image handler on AWS that auto-opens upgrade PRs on new image releases — 99% upgrade success.",
    ],
  },
  {
    id: "super-intern-2023",
    title: "Software Engineering Intern",
    company: "Super",
    period: "Jan — Apr 2023",
    location: "Toronto, ON",
    highlights: [
      "Integrated Qolo's payment API into Super Cash — Python services and webhook handlers surfacing real-time balances to production users.",
    ],
  },
  {
    id: "aw-intern-2022",
    title: "Software Engineering Intern",
    company: "Arctic Wolf",
    period: "Apr — Aug 2022",
    location: "Waterloo, ON",
    highlights: [
      "Built Django REST APIs and a Go/TypeScript security incident tracker, boosting client support efficiency 80%.",
    ],
  },
] as const;

export const SCHOOLS: readonly School[] = [
  {
    id: "gatech",
    institution: "Georgia Institute of Technology",
    degree: "MS Computer Science — AI specialization",
    period: "2026 — Present",
  },
  {
    id: "uwaterloo",
    institution: "University of Waterloo",
    degree: "BASc Computer Engineering",
    period: "2019 — 2024",
  },
] as const;
