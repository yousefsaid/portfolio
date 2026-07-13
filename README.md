# yousefs.dev

Personal portfolio — Next.js 16, Tailwind v4, TypeScript.

The hero is a draggable 3D globe of project cards (CSS 3D); clicking a card opens
a liquid-glass detail panel. The background is an animated
[ShaderGradient](https://github.com/ruucm/shadergradient) (WebGL, lazy-loaded)
with a static CSS mesh fallback for reduced-motion users and devices without WebGL.

## Develop

```bash
npm install
npm run dev
```

## Test

```bash
npm test              # vitest run
npm run test:coverage # with v8 coverage
```

## Content

All copy and links live in `src/data/site.ts`; projects (globe tiles + detail
panels) live in `src/data/projects.ts`. The resume link points at
`public/resume.pdf` — drop the PDF there.
