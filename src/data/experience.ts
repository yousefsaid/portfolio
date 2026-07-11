export interface Role {
  id: string;
  title: string;
  company: string;
  period: string;
  /** Employment kind badge, e.g. "Internship" — omit for full-time roles. */
  kind?: string;
  location?: string;
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
    period: "Jun 2024 — May 2026",
    location: "Remote",
    highlights: [
      "Owned the Bazel build platform for a Python monorepo shared by 500+ engineers: deterministic builds and shared tooling across hundreds of services.",
      "Rolled out a remote disk cache that cut CI build times 43%, saving an estimated 300+ build-hours per week across the org.",
      "Built an event-driven SBOM compliance pipeline on AWS (ECR, EventBridge, Lambda, Inspector, Athena) that automates CVE scanning across containerized services.",
      "Fixed org-wide AWS reliability issues: SQS/DLQ failures in the CodeArtifact replication pipeline, OIDC/IAM misconfigurations, and a Lambda concurrency race that only showed up under heavy event throughput.",
    ],
  },
  {
    id: "aw-swe-pt",
    title: "Software Engineer",
    company: "Arctic Wolf",
    period: "Mar — Jun 2024",
    kind: "Part-time",
    highlights: [
      "Built developer tooling around Bazel, CI, and containers, making local development and testing less painful across services.",
    ],
  },
  {
    id: "aw-intern-2023",
    title: "Software Engineer",
    company: "Arctic Wolf",
    period: "Sep — Dec 2023",
    kind: "Internship",
    highlights: [
      "Designed a dev-container management system on AWS and GitHub Actions to automate large-scale image updates, and integrated Bazel into the CI pipelines.",
    ],
  },
  {
    id: "super-2023",
    title: "Software Engineer",
    company: "Super",
    period: "Jan — Apr 2023",
    kind: "Internship",
    highlights: [
      "Built React and TypeScript features for Super's cash product, plus webhook handlers that keep user balances current in real time.",
    ],
  },
  {
    id: "aw-intern-2022",
    title: "Software Engineer",
    company: "Arctic Wolf",
    period: "May — Aug 2022",
    kind: "Internship",
    highlights: [
      "Built Django REST APIs and a Go/TypeScript security incident tracker, improving client support efficiency.",
    ],
  },
  {
    id: "aw-intern-2021",
    title: "Software Engineer",
    company: "Arctic Wolf",
    period: "Sep — Dec 2021",
    kind: "Internship",
    highlights: [
      "Rebuilt incident dashboards in React/TypeScript and developed Go services for security event processing.",
    ],
  },
  {
    id: "vogro-2020",
    title: "Full Stack Developer",
    company: "VoGro",
    period: "Oct 2020 — Sep 2021",
    kind: "Freelance",
    highlights: [
      "Freelance full-stack development with Python and Flask.",
    ],
  },
  {
    id: "uw-2021",
    title: "Software Developer",
    company: "University of Waterloo",
    period: "Jan — Apr 2021",
    kind: "Internship",
    highlights: [
      "Cut server costs 50% by migrating data to IBM Cloud, built a Python/React chatbot, and shipped a REST API that improved call times 30%.",
    ],
  },
  {
    id: "glu-2020",
    title: "Quality Assurance Engineer",
    company: "Glu Mobile",
    period: "May — Aug 2020",
    kind: "Internship",
    highlights: [],
  },
] as const;

export const SCHOOLS: readonly School[] = [
  {
    id: "gatech",
    institution: "Georgia Institute of Technology",
    degree: "MS Computer Science, AI specialization",
    period: "2026 — Present",
  },
  {
    id: "uwaterloo",
    institution: "University of Waterloo",
    degree: "BASc Computer Engineering",
    period: "2019 — 2024",
  },
] as const;
