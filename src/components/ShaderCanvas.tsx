"use client";

import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

/**
 * The animated ShaderGradient scene — pastel "waterPlane" tuned to match
 * the static CSS mesh so the WebGL fade-in is seamless.
 * Kept in its own module so it can be lazy-loaded with ssr: false.
 */
export function ShaderCanvas() {
  return (
    <ShaderGradientCanvas
      style={{ position: "absolute", inset: 0 }}
      fov={45}
      pixelDensity={1}
    >
      <ShaderGradient
        control="props"
        type="waterPlane"
        animate="on"
        uTime={0}
        uSpeed={0.15}
        uStrength={4}
        uDensity={1.3}
        uFrequency={5.5}
        uAmplitude={0}
        positionX={-1.4}
        positionY={0}
        positionZ={0}
        rotationX={0}
        rotationY={10}
        rotationZ={50}
        color1="#c4b5fd"
        color2="#a7d6ff"
        color3="#ffd6e2"
        reflection={0.1}
        wireframe={false}
        cAzimuthAngle={180}
        cPolarAngle={115}
        cDistance={2.8}
        cameraZoom={9.1}
        lightType="3d"
        brightness={1.3}
        envPreset="city"
        grain="off"
      />
    </ShaderGradientCanvas>
  );
}
