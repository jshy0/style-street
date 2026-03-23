export function ScreenTitle({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-100">
        {children}
      </h1>
    </div>
  );
}
