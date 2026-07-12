interface LiquidWordmarkProps {
  text: string;
  className?: string;
}

/**
 * The wordmark rendered as chrome: a metallic sheen gradient
 * (background-clip: text) that drifts slowly across the letters.
 */
export function LiquidWordmark({ text, className = "" }: LiquidWordmarkProps) {
  return (
    <span className={className}>
      <span className="chrome-text inline-block pb-[0.12em] -mb-[0.12em]">
        {text}
      </span>
    </span>
  );
}
