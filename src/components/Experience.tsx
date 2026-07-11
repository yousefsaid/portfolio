import { ROLES, SCHOOLS } from "@/data/experience";

/** Resume-driven experience timeline plus education, in glass cards. */
export function Experience() {
  return (
    <section id="experience" className="relative z-10 px-6 pt-24 sm:pt-28">
      <p className="text-center text-[12.5px] font-bold tracking-[0.22em] uppercase text-(--ink-45) mb-4">
        Experience
      </p>
      <h2 className="text-center text-[32px] sm:text-[40px] font-extrabold tracking-tight mb-10">
        Where I&apos;ve worked
      </h2>

      <div className="max-w-[820px] mx-auto flex flex-col gap-4">
        {ROLES.map((role) => (
          <article key={role.id} className="glass rounded-[26px] px-7 py-6 sm:px-9">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
              <h3 className="text-[18px] font-extrabold tracking-tight">
                {role.title}
              </h3>
              <span className="text-[15px] font-semibold text-(--ink-60)">
                {role.company}
              </span>
              <span className="ml-auto font-mono text-[11.5px] text-(--ink-45)">
                {role.period}
              </span>
            </div>
            <p className="font-mono text-[11px] text-(--ink-45) mb-3">
              {role.location}
            </p>
            <ul className="flex flex-col gap-1.5">
              {role.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="text-[14px] leading-relaxed text-(--ink-60) pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-(--ink-45)"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </article>
        ))}

        <div className="grid sm:grid-cols-2 gap-4">
          {SCHOOLS.map((school) => (
            <article key={school.id} className="glass rounded-[26px] px-7 py-6">
              <h3 className="text-[15.5px] font-extrabold tracking-tight mb-0.5">
                {school.institution}
              </h3>
              <p className="text-[13.5px] text-(--ink-60)">{school.degree}</p>
              <p className="font-mono text-[11px] text-(--ink-45) mt-1.5">
                {school.period}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
