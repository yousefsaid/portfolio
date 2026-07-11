import { ROLES, SCHOOLS } from "@/data/experience";

/**
 * Work history as an editorial timeline: mono date column, hairline
 * dividers, no card chrome. Education follows in the same list style.
 */
export function Experience() {
  return (
    <section id="experience" className="relative z-10 px-6 pt-24 sm:pt-28">
      <p className="text-center text-[12.5px] font-bold tracking-[0.22em] uppercase text-(--ink-45) mb-4">
        Experience
      </p>
      <h2 className="text-center text-[32px] sm:text-[40px] font-extrabold tracking-tight mb-12">
        Where I&apos;ve worked
      </h2>

      <div className="max-w-[780px] mx-auto">
        <ol>
          {ROLES.map((role) => (
            <li
              key={role.id}
              className="grid sm:grid-cols-[170px_1fr] gap-x-8 gap-y-1 py-6 border-t border-white/10"
            >
              <div>
                <p className="font-mono text-[12px] text-(--ink-45) leading-relaxed pt-0.5">
                  {role.period}
                </p>
                {role.location && (
                  <p className="font-mono text-[11px] text-(--ink-45) opacity-70">
                    {role.location}
                  </p>
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <h3 className="text-[17px] font-bold tracking-tight">
                    {role.title}
                  </h3>
                  <span className="text-[15px] font-medium text-(--ink-60)">
                    {role.company}
                  </span>
                  {role.kind && (
                    <span className="font-mono text-[10.5px] tracking-wide text-(--ink-45)">
                      {role.kind.toLowerCase()}
                    </span>
                  )}
                </div>
                {role.highlights.length > 0 && (
                  <ul className="flex flex-col gap-1.5 mt-2.5">
                    {role.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-[14px] leading-relaxed text-(--ink-60)"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

        <p className="font-mono text-[11.5px] tracking-[0.18em] uppercase text-(--ink-45) mt-12 mb-1">
          Education
        </p>
        <ol>
          {SCHOOLS.map((school) => (
            <li
              key={school.id}
              className="grid sm:grid-cols-[170px_1fr] gap-x-8 gap-y-1 py-5 border-t border-white/10"
            >
              <p className="font-mono text-[12px] text-(--ink-45) pt-0.5">
                {school.period}
              </p>
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                <h3 className="text-[16px] font-bold tracking-tight">
                  {school.institution}
                </h3>
                <span className="text-[14px] text-(--ink-60)">
                  {school.degree}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
