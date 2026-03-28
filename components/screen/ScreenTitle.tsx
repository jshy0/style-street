export function ScreenTitle({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1 className="font-display text-4xl font-black tracking-tight text-zinc-100">
        {children}
      </h1>
    </div>
  );
}
