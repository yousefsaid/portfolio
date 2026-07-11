"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const MAX_TILT_DEG = 5;
const SPRING = { stiffness: 220, damping: 22 } as const;

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper that tilts its content a few degrees toward the pointer,
 * spring-smoothed. No-op tilt for reduced-motion users.
 */
export function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(
    useTransform(py, [0, 1], [MAX_TILT_DEG, -MAX_TILT_DEG]),
    SPRING,
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-MAX_TILT_DEG, MAX_TILT_DEG]),
    SPRING,
  );

  const onPointerMove = (e: React.PointerEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
