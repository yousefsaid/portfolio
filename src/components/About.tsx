import { SITE } from "@/data/site";

export function About() {
  return (
    <section id="about" className="relative z-10 px-6 pt-24 pb-4 sm:pt-28">
      <p className="text-center text-[12.5px] font-bold tracking-[0.22em] uppercase text-(--ink-45) mb-4">
        About
      </p>
      <h2 className="text-center text-[32px] sm:text-[40px] font-extrabold tracking-tight mb-10">
        A little about me
      </h2>
      <div className="glass max-w-[880px] mx-auto rounded-[32px] px-8 py-10 sm:px-14 sm:py-12 text-center">
        <p className="text-[19px] sm:text-[22px] font-medium leading-relaxed text-[rgba(29,28,43,0.8)] mb-7">
          {SITE.bio}
        </p>
        <ul className="flex flex-wrap justify-center gap-2.5" aria-label="Skills">
          {SITE.skills.map((skill) => (
            <li
              key={skill}
              className="px-4.5 py-2.25 rounded-full text-[13.5px] font-semibold bg-white/60 border border-white/90 text-(--ink-60) shadow-[0_4px_14px_rgba(80,70,140,0.08)]"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
