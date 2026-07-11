import { SITE } from "@/data/site";

/** Conversion close: prominent contact block above the footer. */
export function ContactCta() {
  return (
    <section id="contact" className="relative z-10 px-6 pt-24 sm:pt-28">
      <div className="glass border-beam relative max-w-[720px] mx-auto rounded-[32px] px-8 py-12 sm:px-14 text-center">
        <h2 className="text-[30px] sm:text-[38px] font-extrabold tracking-tight mb-3">
          Let&apos;s build something.
        </h2>
        <p className="text-[16px] text-(--ink-60) leading-relaxed max-w-[460px] mx-auto mb-8">
          I&apos;m looking for my next role, ideally working on developer
          platforms, infrastructure, or AI systems. Email is the fastest way
          to reach me.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${SITE.links.email}`}
            className="glass-btn glass-btn-primary"
          >
            {SITE.links.email}
          </a>
          <a
            href={SITE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
