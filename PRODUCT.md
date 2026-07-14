# Product

## Register

brand

## Platform

web

## Users

Recruiters and hiring managers first: people screening candidates who give the page a 30-second scan before deciding whether to look deeper. Engineers and technical peers are the secondary audience — they arrive from GitHub or a referral and evaluate technical depth and taste, clicking into project details and the contribution graph.

## Product Purpose

A personal portfolio (yousefs.dev) whose job is to convert a visit into contact — an email, a LinkedIn message, or an interview invite. Yousef is actively job-hunting after two years as SWE II at Arctic Wolf (Bazel build platform for 500+ engineers, event-driven security infra on AWS) while completing a part-time MS in CS (AI) at Georgia Tech. Success is a recruiter or engineer reaching out.

## Positioning

An infrastructure engineer who now builds AI systems — and the site itself is the proof of craft. Every screen reinforces: this person builds serious infra and AI tooling.

## Conversion & proof

- Primary and secondary CTA: no single winner by design — email, resume download, and LinkedIn are all first-class exits; make each one effortless from anywhere on the page.
- The line a visitor remembers after 10 seconds: "This person owned real platform/infra work and now builds AI systems."
- Belief ladder: (1) this person is technically serious (infra scale, AI focus) → (2) the work is real and current (projects, live GitHub activity) → (3) reaching out is easy and worth it.
- Proof on hand: experience timeline (`src/data/experience.ts`), project globe and detail panels (`src/data/projects.ts`), live GitHub contribution graph, resume at `public/resume.pdf`.

## Brand Personality

Polished, playful, technical. The interactive flourishes (draggable 3D project globe, shader-gradient atmosphere, scramble text) are the personality — but always in service of polish, never at the expense of reaching the content. Voice is direct and confident, not salesy.

## Anti-references

- The AI-generated look: gradient text, glassmorphism-by-default, identical card grids, eyebrow labels on every section.
- The over-designed agency site: so much motion and effect that content is hard to reach.
- Corporate/enterprise safety: gray, resume-as-a-webpage energy.
- (The generic dev-portfolio template — hero, skills grid, card list — is already avoided; keep it that way.)

## Design Principles

1. **The site is the resume's proof.** An infra/AI engineer claiming craft must demonstrate it — performance, precision, and interaction quality are content.
2. **Playful, but never in the way.** Every flourish needs a fast path past it; a recruiter with 30 seconds must reach the story without fighting the design.
3. **Show real signal, not decoration.** Live GitHub activity, real project detail, concrete scale numbers beat adjectives.
4. **Contact is always one gesture away.** Email, resume, LinkedIn reachable from any scroll position.
5. **Degrade gracefully.** WebGL, motion, and 3D all have honest fallbacks (already built: CSS mesh fallback, reduced-motion paths); keep that bar.

## Accessibility & Inclusion

Good defaults, not a formal audit target: WCAG AA contrast on text, `prefers-reduced-motion` honored (shader and globe already have fallbacks), keyboard-reachable interactive elements, visible focus states (already styled). Off-the-shelf accessible React components are fine.
