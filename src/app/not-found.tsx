import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-dvh flex items-center justify-center px-6">
      <div className="bg-mesh" aria-hidden />
      <div className="glass relative rounded-[32px] px-10 py-14 text-center max-w-[440px]">
        <p className="iridescent-text text-[64px] font-extrabold tracking-tighter leading-none mb-4">
          404
        </p>
        <h1 className="text-[22px] font-extrabold tracking-tight mb-2">
          Nothing orbiting here
        </h1>
        <p className="text-[15px] text-(--ink-60) leading-relaxed mb-8">
          This page doesn&apos;t exist — it may have drifted off the globe.
        </p>
        <Link href="/" className="glass-btn glass-btn-primary">
          Back home
        </Link>
      </div>
    </main>
  );
}
