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
  role: "Software Engineer II @ Arctic Wolf",
  wordmark: "ys.",
  url: "https://portfolio-rho-mocha-50.vercel.app",
  tagline:
    "Software engineer building developer platforms, cloud infrastructure, and AI tooling.",
  bio: "I'm a software engineer at Arctic Wolf, where I own the Bazel build platform behind a 500+ engineer monorepo and architect event-driven security infrastructure on AWS. Lately I've been deep in AI systems — LLM-powered CI diagnostics at work, agent observability and multi-agent tooling after hours. Currently pursuing an MS in Computer Science (AI) at Georgia Tech; Computer Engineering grad from Waterloo.",
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
