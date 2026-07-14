import { SITE } from "@/data/site";

interface SkillGroup {
  label: string;
  skills: readonly string[];
}

// Split SITE.skills by role rather than listing them as one flat, unordered
// row — makes the infra-vs-language split scannable at a glance.
const SKILL_GROUPS: readonly SkillGroup[] = [
  { label: "Languages", skills: ["Python", "Go", "TypeScript"] },
  {
    label: "Infra & Cloud",
    skills: ["Bazel", "AWS", "Docker", "Kubernetes", "Terraform", "PostgreSQL"],
  },
];

export function About() {
  return (
    <section id="about" className="relative z-10 px-6 pt-24 pb-4 sm:pt-28">
      <h2 className="text-center text-[32px] sm:text-[40px] font-extrabold tracking-tight mb-10">
        A little about me
      </h2>
      <div className="glass border-beam relative max-w-[880px] mx-auto rounded-[32px] px-8 py-10 sm:px-14 sm:py-12 text-center">
        <p className="text-[19px] sm:text-[22px] font-medium leading-relaxed text-[rgba(241,239,250,0.82)] mb-7">
          {SITE.bio}
        </p>
        <div className="flex flex-col gap-4">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="font-mono text-[11px] text-(--ink-45) mb-2">
                {group.label}
              </p>
              <ul
                className="flex flex-wrap justify-center gap-2.5"
                aria-label={group.label}
              >
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="px-4.5 py-2.25 rounded-full text-[13.5px] font-semibold bg-white/8 border border-white/15 text-(--ink-60) shadow-[0_4px_14px_rgba(0,0,0,0.3)]"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
