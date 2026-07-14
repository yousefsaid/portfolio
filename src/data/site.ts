export interface SiteLinks {
  github: string;
  linkedin: string;
  email: string;
  resume: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  wordmark: string;
  url: string;
  tagline: string;
  bio: string;
  skills: readonly string[];
  links: SiteLinks;
}

export const SITE: SiteConfig = {
  name: "Yousef Said",
  role: "Previously SWE II @ Arctic Wolf · open to new opportunities",
  wordmark: "ys.",
  url: "https://portfolio-rho-mocha-50.vercel.app",
  tagline:
    "Software engineer building developer platforms, cloud infrastructure, and AI tooling.",
  bio: "I spent the last two years at Arctic Wolf, where I owned the Bazel build platform for a monorepo shared by 500+ engineers and built event-driven security infrastructure on AWS. These days most of my time goes into AI systems: agent observability, multi-agent tools, and LLM-powered developer workflows. I'm doing my master's in CS (AI) at Georgia Tech part-time, and I'm looking for my next role.",
  skills: [
    "Python",
    "Go",
    "TypeScript",
    "Bazel",
    "AWS",
    "Docker",
    "Kubernetes",
    "Terraform",
    "PostgreSQL",
  ],
  links: {
    github: "https://github.com/yousefsaid",
    linkedin: "https://linkedin.com/in/yousefsaid",
    email: "ysaid7788@gmail.com",
    resume: "/resume.pdf",
  },
};
