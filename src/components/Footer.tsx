import { SITE } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-24 px-6 pb-10 flex justify-center">
      <div className="glass flex flex-wrap items-center justify-center gap-x-8 gap-y-2 rounded-full px-9 py-4.5 text-sm font-semibold text-(--ink-60)">
        <a
          href={`mailto:${SITE.links.email}`}
          className="hover:text-(--ink) transition-colors"
        >
          {SITE.links.email}
        </a>
        <a
          href={SITE.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-(--ink) transition-colors"
        >
          GitHub
        </a>
        <a
          href={SITE.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-(--ink) transition-colors"
        >
          LinkedIn
        </a>
        <span>
          © {year} {SITE.name}
        </span>
      </div>
    </footer>
  );
}
