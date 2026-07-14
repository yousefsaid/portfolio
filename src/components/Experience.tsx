"use client";

import { useEffect, useRef, useState } from "react";
import { ROLES, SCHOOLS } from "@/data/experience";

/**
 * Work history as a scroll-driven center timeline: a gradient line fills
 * as you scroll, and entries slide in alternately from the left and
 * right of the line. Falls back to a left rail on mobile, and to a
 * fully visible static layout without JS or with reduced motion.
 */
export function Experience() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  // Gradient line height follows how far the section has been scrolled
  // through, measured against the viewport's midpoint. The "tl-ready"
  // class arms the reveal styles only once JS is live, so content is
  // fully visible without JS; reduced-motion is handled in CSS.
  useEffect(() => {
    trackRef.current?.classList.add("tl-ready");
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const node = trackRef.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = window.innerHeight * 0.6;
        setProgress(Math.min(1, Math.max(0, (mid - rect.top) / rect.height)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Reveal entries as they enter the viewport.
  useEffect(() => {
    const node = trackRef.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const items = node.querySelectorAll<HTMLElement>(".tl-item");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="relative z-10 px-6 pt-24 sm:pt-28">
      <h2 className="text-[28px] sm:text-[36px] font-extrabold tracking-tight mb-14 max-w-[980px] mx-auto">
        Where I&apos;ve worked
      </h2>

      <div ref={trackRef} className="tl-track relative max-w-[980px] mx-auto">
        {/* Track + scroll-fill line */}
        <div className="tl-line" aria-hidden>
          <div
            className="tl-line-fill"
            style={{ transform: `scaleY(${progress})` }}
          />
        </div>

        <ol>
          {ROLES.map((role, idx) => (
            <li
              key={role.id}
              className={`tl-item ${idx % 2 === 0 ? "tl-left" : "tl-right"}`}
            >
              <span className="tl-dot" aria-hidden />
              <div className="tl-date">
                <p className="font-mono text-[12px] text-(--ink-45) leading-relaxed">
                  {role.period}
                </p>
                {role.location && (
                  <p className="font-mono text-[11px] text-(--ink-45) opacity-70">
                    {role.location}
                  </p>
                )}
              </div>
              <div className="tl-content">
                <div className="tl-head flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <h3 className="text-[17px] font-bold tracking-tight">
                    {role.title}
                  </h3>
                  <span className="text-[15px] font-medium text-(--ink-60)">
                    {role.company}
                  </span>
                  {role.kind && (
                    <span className="text-[12px] italic text-(--ink-45)">
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
      </div>

      {/* Education, separate from the work timeline */}
      <h3 className="text-center text-[15px] font-bold text-(--ink-60) mt-20 mb-7">
        Education
      </h3>
      <div className="flex flex-col sm:flex-row justify-center text-center gap-x-20 gap-y-6">
        {SCHOOLS.map((school) => (
          <div key={school.id}>
            <h3 className="text-[16.5px] font-bold tracking-tight">
              {school.institution}
            </h3>
            <p className="text-[14px] text-(--ink-60) mt-1">{school.degree}</p>
            <p className="font-mono text-[11.5px] text-(--ink-45) mt-1">
              {school.period}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
