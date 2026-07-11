export interface SiteLinks {
  github: string;
  linkedin: string;
  email: string;
  resume: string;
}

export interface SiteConfig {
  name: string;
  wordmark: string;
  tagline: string;
  bio: string;
  skills: readonly string[];
  links: SiteLinks;
}

export const SITE: SiteConfig = {
  name: "Yousef Said",
  wordmark: "ys.",
  tagline: "Software engineer building polished full-stack products.",
  bio: "I'm a software engineer who cares about the details. I build products end to end — data models, APIs, and interfaces that feel considered — and lately I've been deep in AI agents and observability.",
  skills: [
    "Python",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "AWS",
  ],
  links: {
    github: "https://github.com/yousefsaid",
    linkedin: "https://linkedin.com/in/yousefsaid",
    email: "ysaid7788@gmail.com",
    resume: "/resume.pdf",
  },
};
