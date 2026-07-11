interface LiquidWordmarkProps {
  text: string;
  className?: string;
}

/**
 * The wordmark rendered as liquid chrome: a metallic sheen gradient
 * (background-clip: text) warped by an animated SVG turbulence
 * displacement filter. Reduced motion drops the distortion via CSS.
 */
export function LiquidWordmark({ text, className = "" }: LiquidWordmarkProps) {
  return (
    <span className={className}>
      <svg width="0" height="0" aria-hidden focusable="false">
        <filter id="liquid-distort" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.04"
            numOctaves="2"
            seed="7"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="16s"
              values="0.008 0.04;0.014 0.055;0.008 0.04"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
      </svg>
      <span
        className="chrome-text liquid-distorted inline-block"
        style={{ filter: "url(#liquid-distort)" }}
      >
        {text}
      </span>
    </span>
  );
}
