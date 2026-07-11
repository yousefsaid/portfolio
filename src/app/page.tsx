import { GradientBackground } from "@/components/GradientBackground";
import { GlassNav } from "@/components/GlassNav";
import { HeroStage } from "@/components/HeroStage";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main id="top" className="overflow-x-clip">
      <div className="bg-mesh" aria-hidden />
      <GradientBackground />
      <GlassNav />
      <HeroStage />
      <About />
      <Footer />
    </main>
  );
}
