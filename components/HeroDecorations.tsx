export function DotGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.18]"
      style={{
        backgroundImage: "radial-gradient(circle, #71717a 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}

export function AmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(100,100,100,0.13)_0%,transparent_70%)]" />
  );
}

export function CornerBrackets() {
  return (
    <>
      <div className="absolute left-5 top-20 h-7 w-7 border-l border-t border-zinc-700/50 sm:left-8" />
      <div className="absolute right-5 top-20 h-7 w-7 border-r border-t border-zinc-700/50 sm:right-8" />
      <div className="absolute bottom-8 left-5 h-7 w-7 border-b border-l border-zinc-700/50 sm:left-8" />
      <div className="absolute bottom-8 right-5 h-7 w-7 border-b border-r border-zinc-700/50 sm:right-8" />
    </>
  );
}
