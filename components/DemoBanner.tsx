export function DemoBanner() {
  return (
    <div className="fixed top-16 left-0 right-0 z-40 border-b border-zinc-800/60 bg-zinc-950/95 backdrop-blur-sm">
      <p className="py-2.5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
        Demo site &mdash; no real transactions will be processed
      </p>
    </div>
  );
}
