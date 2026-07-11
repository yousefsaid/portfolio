"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "abcdefghijklmnopqrstuvwxyz<>/{}_";
const FRAME_MS = 28;
const SETTLE_PER_FRAME = 0.5;

interface ScrambleTextProps {
  text: string;
}

/**
 * Text that "decodes" with random glyphs on hover/focus,
 * settling left-to-right into the real label.
 */
export function ScrambleText({ text }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const scramble = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (timer.current) clearInterval(timer.current);
    let frame = 0;
    timer.current = setInterval(() => {
      frame += 1;
      const settled = Math.floor(frame * SETTLE_PER_FRAME);
      if (settled >= text.length) {
        if (timer.current) clearInterval(timer.current);
        setDisplay(text);
        return;
      }
      const next = text
        .split("")
        .map((ch, i) =>
          i < settled || ch === " "
            ? ch
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        )
        .join("");
      setDisplay(next);
    }, FRAME_MS);
  }, [text]);

  return (
    <span onMouseEnter={scramble} onFocus={scramble} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
