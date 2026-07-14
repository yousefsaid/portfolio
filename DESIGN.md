---
name: yousefs.dev
description: Dark observatory portfolio — glass instruments floating over a living shader atmosphere.
colors:
  aurora-lavender: "#a394f0"
  ion-blue: "#7fb8f0"
  observatory-black: "#0a0913"
  starlight: "#f1effa"
  starlight-60: "#f1effa9e"
  starlight-45: "#f1effa73"
  glass-fill: "#ffffff0f"
  glass-border: "#ffffff24"
  panel-night: "#131020f0"
  solid-white: "#f4f2fc"
  solid-white-ink: "#14131f"
typography:
  display:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "96px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "40px"
    fontWeight: 800
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "14px"
    fontWeight: 600
rounded:
  focus: "6px"
  tile: "20px"
  panel: "24px"
  pill: "999px"
components:
  button-primary:
    backgroundColor: "{colors.solid-white}"
    textColor: "{colors.solid-white-ink}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-glass:
    backgroundColor: "#ffffff14"
    textColor: "{colors.starlight}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  nav-link:
    textColor: "{colors.starlight-60}"
  globe-tile:
    backgroundColor: "#ffffff12"
    rounded: "{rounded.tile}"
    padding: "14px"
  detail-panel:
    backgroundColor: "{colors.panel-night}"
    textColor: "{colors.starlight}"
    rounded: "{rounded.panel}"
    padding: "22px"
---

# Design System: yousefs.dev

## 1. Overview

**Creative North Star: "The Observatory"**

A dark dome full of instruments. The page is not a document — it is a room at night: a living, luminous atmosphere (the WebGL shader gradient, falling back to a static CSS mesh) glows behind everything, and the interface is a set of glass panes floating in front of it at defined heights. You look *through* the UI at real work — a draggable 3D globe of projects, a live GitHub contribution graph, a scroll-driven experience timeline. Polished, playful, technical: every flourish is an instrument, not a decoration, and every instrument has a fast path past it for the recruiter with 30 seconds.

The system explicitly rejects the AI-generated look (glassmorphism-by-default, identical card grids, eyebrow labels), the over-designed agency site where content hides behind motion, and corporate resume-as-a-webpage gray. Glass here is not a default — it is the load-bearing material of the whole room, used consistently and nowhere lazily.

**Key Characteristics:**
- One continuous dark atmosphere; the interface never paints its own background color, it borrows the sky's.
- Achromatic glass surfaces (white-alpha fills and borders) so the shader's color does the coloring.
- Aurora Lavender and Ion Blue as instrument lights: focus rings, timeline glow, spotlight — never wall paint.
- Every animation ships with an honest `prefers-reduced-motion` and no-JS fallback. Content is never gated on motion.
- Tactile and luminous interactions: things lift, brighten, and glow on approach.

## 2. Colors

An achromatic glass system lit by two instrument colors over a near-black sky.

### Primary
- **Aurora Lavender** (#a394f0): the site's signature light. Focus outlines, the timeline's progress glow, the cursor spotlight, the border beam. It marks *live* things — attention, progress, position — and appears on well under 10% of any screen.

### Secondary
- **Ion Blue** (#7fb8f0): Aurora Lavender's cooler partner, used only in gradient company with it (timeline fill, spotlight falloff). Never carries meaning alone.

### Neutral
- **Observatory Black** (#0a0913): the body background beneath the atmosphere layers. Slightly violet, never pure black.
- **Starlight** (#f1effa): all primary text and icons. A cool near-white, full strength for headings and body.
- **Starlight 60** (#f1effa at 62%): secondary text — nav links, supporting copy, metadata.
- **Starlight 45** (#f1effa at 45%): tertiary text — captions, hints ("drag the globe"), role lines.
- **Glass Fill** (rgba(255,255,255,0.06)) + **Glass Border** (rgba(255,255,255,0.14)): the material every pane is made of. Hover raises fill toward 0.12–0.14 and border toward 0.55.
- **Panel Night** (rgba(19,16,32,0.94)): the near-opaque surface for the pinned project detail panel, where readability beats translucency.
- **Solid White** (#f4f2fc) on **Solid White Ink** (#14131f): the single high-commitment CTA treatment (View Resume, primary project link).

### Named Rules
**The Instrument Light Rule.** Aurora Lavender and Ion Blue are indicator lights, not paint. They may glow, trace, and outline; they are forbidden as backgrounds, fills of large areas, or text color for prose.

**The Borrowed Sky Rule.** Surfaces are achromatic white-alpha glass. All color on a surface arrives from the atmosphere behind it. Never tint a glass pane with the accent hues.

## 3. Typography

**Display Font:** Bricolage Grotesque (with sans-serif fallback)
**Body Font:** Bricolage Grotesque (weights 500–800)
**Label/Mono Font:** JetBrains Mono

**Character:** One expressive grotesque doing everything through weight, with a monospace reserved for machine-flavored moments. Bricolage's quirk at extrabold display sizes is the personality; at body weight it disappears into legibility.

### Hierarchy
- **Display** (800, 72px mobile / 96px desktop, line-height 1, letter-spacing -0.05em): the hero wordmark only. Carries the liquid-chrome treatment.
- **Headline** (800, 32–40px, tight tracking): the name line and section headings.
- **Body** (500, 17px, line-height 1.5): taglines, bio, project descriptions. Starlight 60 for supporting prose, full Starlight for lead lines.
- **Label** (600–700, 11.5–14.5px): nav links, buttons, pills, dates. Buttons at 700; JetBrains Mono where the content is technical (dates, tech tags).

### Named Rules
**The One Voice Rule.** No second display face, ever. Contrast comes from weight (500 ↔ 800) and size, not from font pairing.

## 4. Elevation

Depth is **structural**: the interface is organized as glass panes floating at defined heights above the atmosphere, and shadow length encodes distance from it. The stack, back to front: atmosphere (fixed mesh + shader at negative z), cursor spotlight, page content, floating glass (nav, buttons, tiles), and the pinned detail panel highest of all. Every pane pairs a deep soft drop shadow (distance) with a 1px inset top highlight (light from above) and backdrop blur (the material itself).

### Shadow Vocabulary
- **Pane rest** (`0 12px 40px rgba(0,0,0,0.5)` + `inset 0 1px 0 rgba(255,255,255,0.18)`): default glass panels and nav.
- **Pane hover** (`0 16px 50px rgba(0,0,0,0.45–0.55)` + brighter inset): the lift response — paired with `translateY(-2px)`.
- **Panel pinned** (`0 30px 80px rgba(0,0,0,0.7)`): the detail panel, closest to the viewer.
- **Instrument glow** (`0 0 12–14px rgba(163,148,240,0.55)`): Aurora Lavender emission on active timeline dots and the progress line. State, not decoration.

### Named Rules
**The Height-Is-Shadow Rule.** Never mix depths arbitrarily: a surface's shadow must match its layer. If it isn't interactive or pinned, it doesn't float.

## 5. Components

Tactile and luminous: at rest, quiet glass; on approach, panes lift ~2px, fills brighten, borders sharpen. Transitions run 0.15–0.18s ease.

### Buttons
- **Shape:** full pill (999px radius)
- **Primary:** Solid White (#f4f2fc) with dark ink (#14131f), 12px 24px padding, 14px/700 type. One per context.
- **Glass (secondary):** white-alpha fill (0.08), glass border, backdrop blur 18px.
- **Hover / Focus:** lift -2px, fill to 0.14, deeper shadow; focus gets the 2.5px Aurora Lavender outline (offset 2px, 6px radius).

### Navigation
- A floating glass bar; links at 14px/600 in Starlight 60, warming to full Starlight on hover (0.15s color transition). No underlines, no active pills.

### Cards / Containers
- **Corner Style:** 20px (tiles) to 24px (panels)
- **Background:** Glass Fill with Glass Border; Panel Night when content must be fully readable (pinned detail).
- **Shadow Strategy:** per the Elevation vocabulary — rest shadow at rest, lift shadow on hover.
- **Internal Padding:** 14px (compact tiles) to 22px (detail panels).

### [Signature] The Project Globe
- A draggable CSS-3D sphere of 128×160px glass tiles (`perspective: 1400px`, `touch-action: pan-y` so vertical scroll survives). Hover previews a project; click pins the near-opaque detail panel centered over the viewport (scale 0.96 → 1, 0.18s). Tiles use stronger borders (0.2 → 0.55 on hover) because they sit against the busiest part of the atmosphere.

### [Signature] Wordmark & Border Beam
- The hero wordmark ("ys.") wears an animated liquid-chrome gradient clip (8s sheen); the border beam is a conic light streak orbiting a pane's border (7s). Both disable fully under reduced motion.

## 6. Do's and Don'ts

### Do:
- **Do** make every colored moment an instrument light: glows, traces, outlines in Aurora Lavender (#a394f0), ≤10% of the screen.
- **Do** pair every drop shadow with its inset top highlight; glass without the highlight reads as smoke.
- **Do** ship the fallback with the effect: static mesh for the shader, `prefers-reduced-motion` alternatives, content visible without JS (the timeline already models this — copy it).
- **Do** keep contact one gesture away: resume, GitHub, LinkedIn, email must survive every layout change.
- **Do** use weight (500 ↔ 800) for emphasis, in Bricolage Grotesque only.

### Don't:
- **Don't** produce "the AI-generated look" (PRODUCT.md's words): no gradient text outside the two sanctioned wordmark treatments, no identical card grids, no eyebrow labels above sections, no glassmorphism sprinkled as decoration — glass is the structural material or it's nothing.
- **Don't** build "the over-designed agency site": no effect may stand between a visitor and the content; every flourish needs a fast path past it.
- **Don't** drift toward "corporate resume-as-a-webpage" gray: no flat gray panels, no #333-on-white sections, no stock two-column resume layouts.
- **Don't** paint surfaces with the accents — no lavender buttons, no blue-tinted panels (The Borrowed Sky Rule).
- **Don't** use side-stripe borders (border-left > 1px as accent) or arbitrary z-indexes; respect the existing layer stack.
- **Don't** introduce a second typeface. If Bricolage plus JetBrains Mono can't say it, rewrite the design, not the font stack.
