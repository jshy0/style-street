interface ScreenTemplateProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function ScreenTemplate({
  children,
  className = "",
  title,
}: ScreenTemplateProps) {
  return (
    <div className={`min-h-screen bg-[#111012] px-4 pt-8 ${className} w-full`}>
      {children}
    </div>
  );
}
